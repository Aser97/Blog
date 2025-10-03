---
layout: post
title:  🚀 Customizing a Vision Language Model (VLM)
subtitle: Reasoning with Visual-TableQA Dataset
date:   2025-07-04
author: Boammani Aser Lompo
categories: jekyll update
permalink: /vlm-custom/
---

In this short tutorial, we’ll walk through how to fine-tune a Vision–Language Model (VLM) on a custom dataset.  
Our case study will use **Qwen2.5-VL-7B-Instruct**, a relatively compact VLM, which we’ll fine-tune on the **Visual-TableQA** dataset.  
Visual-TableQA is a recently introduced benchmark designed for reasoning over visual tables, and although modest in size—with about 7k training samples—it provides a rich and challenging setting for experimentation.

## Setup
First, let’s install the required libraries and import them into our environment:

```python
!pip install torch==2.6.0 torchvision torchaudio
!pip install https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.3.12/flash_attn-2.8.0+cu124torch2.6-cp310-cp310-linux_x86_64.whl
!pip install -U trl>=0.9.6 transformers>=4.42 peft>=0.12.0 accelerate>=0.33.0 bitsandbytes>=0.43.3 datasets>=2.18 qwen-vl-utils pillow


import os, torch
from datasets import load_dataset
import torch.nn.functional as F
from transformers import (AutoProcessor, AutoTokenizer, BitsAndBytesConfig, Qwen2_5_VLForConditionalGeneration, Qwen2_5_VLProcessor, EarlyStoppingCallback)
from qwen_vl_utils import process_vision_info
from peft import LoraConfig, get_peft_model, PeftModel
from trl import SFTConfig, SFTTrainer
from PIL import Image, ImageOps
import re

use_bf16 = torch.cuda.is_bf16_supported()
```

Next, let’s download the dataset directly from Hugging Face:

```python
DATASET_REPO = "AI-4-Everyone/Visual-TableQA"
ds = load_dataset(DATASET_REPO)
train = ds.get("train")
evald = ds.get("validation")

```

----
## Preprocessing
Now we can move on to data preprocessing.  
This step focuses on formatting the dataset properly before feeding it into the model.

```python
system_message = """You are a Vision Language Model specialized in interpreting visual data from charts and diagrams images.
Answer the questions strictly from the image, with clear, rigorous step-by-step justification. Stay concise, but include all reasoning that’s relevant."""
```


```python
def to_pil(img):
    return img if isinstance(img, Image.Image) else Image.fromarray(img)
```


```python
def format_data(sample):
    return [
        {"role": "system",
         "content": [{"type": "text", "text": system_message}],
        },
        {"role": "user",
         "content": [
                {"type": "image",
                 "image": to_pil(sample["image"]),},
                {"type": "text",
                 "text": sample["question"],
                },
            ],
        },
        {"role": "assistant",
         "content": [{"type": "text", "text": sample["answer"]}],
        },
    ]
```


```python
def collate_fn(examples):

    msgs = [format_data(sample) for sample in examples]

    texts = [processor.apply_chat_template(m, tokenize=False, add_generation_prompt=True) for m in msgs]

    image_inputs, _ = process_vision_info(msgs)
    batch = processor(text=texts, images=image_inputs, return_tensors="pt", padding=True, truncation=False, max_length=None,)

    labels = batch["input_ids"].detach().clone()
    labels[labels == processor.tokenizer.pad_token_id] = -100

    # collect image/video token ids in a model-agnostic way
    img_ids = set()
    for attr in ("image_token_id", "video_token_id"):
        v = getattr(model.config, attr, None)
        if v is not None:
            img_ids.add(v)
    # fallback to common special tokens if present
    for tok in ("<image>", "<img>", "<video>", '<|vision_start|>', '<|vision_end|>'):
        tid = processor.tokenizer.convert_tokens_to_ids(tok)
        if tid not in (None, -1, processor.tokenizer.unk_token_id):
            img_ids.add(tid)

    if img_ids:
        mask = torch.isin(labels, torch.tensor(sorted(img_ids), dtype=labels.dtype, device=labels.device))
        labels[mask] = -100

    batch["labels"] = labels
    return batch
```
----
## A Tier

Next, we begin the first phase of fine-tuning by splitting the model parameters into two groups: **Tier A** and **Tier B**.  

- **Tier A** includes all parameters except those in the Vision Tower.  
- **Tier B** corresponds to the Vision Tower parameters. Since these layers are highly sensitive—especially when working with a relatively small dataset like **Visual-TableQA**—we avoid modifying them directly. Instead, we only update the attention projections in the last four vision blocks, leaving the rest of the Vision Tower untouched.  

For fine-tuning, we use the [Low-Rank Adapter (LoRA)](https://arxiv.org/abs/2106.09685) method. LoRA keeps the original model weights frozen while introducing lightweight low-rank adapters that guide the model towards better task performance.

```python
MODEL_ID    = "Qwen/Qwen2.5-VL-7B-Instruct"
OUTPUT_DIR_TIER_A   = "qwen-vl-sft-lora-tableqa-tierA"


model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    MODEL_ID, device_map="auto", torch_dtype=torch.bfloat16 if use_bf16 else torch.float16,
    attn_implementation="flash_attention_2", low_cpu_mem_usage=True,)
model.config.use_cache = False                      
model.gradient_checkpointing_enable()
model.config.pretraining_tp = 1  

min_pixels = 256*28*28
max_pixels = 2560*28*28
processor = AutoProcessor.from_pretrained(MODEL_ID, min_pixels=min_pixels, max_pixels=max_pixels)
```


```python
TARGETS = [
  "q_proj", "v_proj", "k_proj","o_proj", "gate_proj", "up_proj", "down_proj", "multi_modal_projector"]

r, lora_alpha = 16, 8

peft_cfg = LoraConfig(r=r, lora_alpha=lora_alpha, lora_dropout=0.05, bias="none", target_modules=TARGETS, task_type="CAUSAL_LM")
peft_model = get_peft_model(model, peft_cfg)

```
Print trainable parameters


```python
peft_model.print_trainable_parameters()
```

    trainable params: 47,589,376 || all params: 8,339,756,032 || trainable%: 0.5706



Now we can launch the training phase.  
For this, we’ll rely on the **TRL** library’s training manager, which streamlines the entire process.  
All we need to do is specify the training arguments—TRL will take care of the rest.

```python
args = SFTConfig(
    output_dir=OUTPUT_DIR_TIER_A, num_train_epochs=2,       
    # ---- batch / memory ----
    per_device_train_batch_size=3, per_device_eval_batch_size=4,
    gradient_accumulation_steps=8, dataloader_pin_memory=True, # global batch ~= 24
    # ---- stability & speed ----
    gradient_checkpointing=True, gradient_checkpointing_kwargs={"use_reentrant": False},
    bf16=use_bf16, fp16=not use_bf16, tf32=True,
    # ---- optimization (LoRA-friendly) ----
    learning_rate=1e-4, lr_scheduler_type="cosine", warmup_ratio=0.07, max_grad_norm=1.0, weight_decay=0.01, optim="adamw_torch_fused",
    adam_beta1=0.9, adam_beta2=0.999, adam_epsilon=1e-8,
    # ---- logging / eval / save ----
    logging_steps=20, eval_strategy="steps", eval_steps=100,                  
    save_strategy="steps", save_steps=100, load_best_model_at_end=True,
    metric_for_best_model="eval_loss", greater_is_better=False, save_total_limit=3,
    remove_unused_columns=False, dataset_kwargs={"skip_prepare_dataset": True},
    dataset_text_field="",  # keep TRL from looking for "text")

callbacks = [EarlyStoppingCallback(early_stopping_patience=2, early_stopping_threshold=0.0)]

```

```python
trainer = SFTTrainer(
    model=peft_model, args=args, train_dataset=train, eval_dataset=evald, data_collator=collate_fn, callbacks=callbacks,
)
trainer.train()
trainer.save_model(OUTPUT_DIR_TIER_A)      # saves the adapters
processor.save_pretrained(OUTPUT_DIR_TIER_A)
```

Before wrapping up this phase, we need to merge the newly trained adapter back into the model architecture.

```python
MERGED_DIR = "qwen-vl-merged-tierA-tableqa"

model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    MODEL_ID, device_map="auto",
    torch_dtype=torch.bfloat16 if use_bf16 else torch.float16, attn_implementation="flash_attention_2",
    low_cpu_mem_usage=True)
```

```python
peft_model = PeftModel.from_pretrained(model, OUTPUT_DIR_TIER_A, is_trainable=False)
merged = peft_model.merge_and_unload()
merged.save_pretrained(MERGED_DIR)
```

## B Tiers
Now we move on to the second phase of training.  
We reload the merged model, gather the Tier B parameters, and define a new set of arguments to pass to the trainer.

```python
OUTPUT_DIR_TIER_B= "qwen-vl-sft-lora-tableqa-tierB"

model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    MERGED_DIR, device_map="auto", torch_dtype="auto",
    attn_implementation="flash_attention_2", low_cpu_mem_usage=True)
model.config.use_cache = False
model.gradient_checkpointing_enable()
model.config.pretraining_tp = 1
```

```python
tierB_cfg = LoraConfig(
    r=8, lora_alpha=32, lora_dropout=0.10, bias="none", task_type="CAUSAL_LM",
    target_modules=["attn.qkv", "attn.proj"],
)

peft_model = get_peft_model(model, tierB_cfg)
```

```python
for _, p in peft_model.named_parameters():
    p.requires_grad_(False)

# capture indices from your paths: model.visual.blocks.<idx>.
layer_re = re.compile(r"model\.visual\.blocks\.(\d+)\.")

# discover how many blocks the vision tower has
vision_layers = sorted({int(m.group(1)) for n, _ in peft_model.named_modules()
                        if (m := layer_re.search(n))})
N = 4                                 # tune last 4; adjust 2–6 if needed
lastN = set(vision_layers[-N:])

def is_lastN_vision_attn_lora(name: str) -> bool:
    if "lora_" not in name:
        return False
    m = layer_re.search(name)
    if not m:
        return False
    idx = int(m.group(1))
    if idx not in lastN:
        return False
    # only attention projections
    return ("attn.qkv" in name) or ("attn.proj" in name)

for n, p in peft_model.named_parameters():
    if is_lastN_vision_attn_lora(n):
        p.requires_grad_(True)

#(Optional) keep the multimodal projector from Tier A trainable a bit more
for n, p in peft_model.named_parameters():
    if "multi_modal_projector" in n and ("lora_" in n) and ("default" in n):
        p.requires_grad_(True)

peft_model.print_trainable_parameters()
```

    trainable params: 245,760 || all params: 8,294,132,736 || trainable%: 0.0030



```python
args_tierB = SFTConfig(
    output_dir=OUTPUT_DIR_TIER_B, num_train_epochs=1,
    per_device_train_batch_size=3, per_device_eval_batch_size=4, gradient_accumulation_steps=8, gradient_checkpointing=True,
    gradient_checkpointing_kwargs={"use_reentrant": False}, bf16=use_bf16, fp16=not use_bf16, tf32=True,
    learning_rate=2e-5,            # we reduce it for safety measure
    lr_scheduler_type="cosine", warmup_ratio=0.07, max_grad_norm=1.0, weight_decay=0.01,
    optim="adamw_torch_fused", logging_steps=20, eval_strategy="steps", eval_steps=100,
    save_strategy="steps", save_steps=100, load_best_model_at_end=True,
    metric_for_best_model="eval_loss", greater_is_better=False, save_total_limit=3,
    remove_unused_columns=False, dataset_kwargs={"skip_prepare_dataset": True}, dataset_text_field="",
)
callbacks = [EarlyStoppingCallback(early_stopping_patience=2)]
```


```python
trainer = SFTTrainer(
    model=peft_model, args=args_tierB, train_dataset=train, eval_dataset=evald,
    data_collator=collate_fn, processing_class=processor, callbacks=callbacks)
```


```python
trainer.train()
trainer.save_model(OUTPUT_DIR_TIER_B)      # saves the adapters
processor.save_pretrained(OUTPUT_DIR_TIER_B)
```
---
## Final Model Loading and Inferance


```python
base = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    MERGED_DIR, device_map="auto", torch_dtype="auto",
    attn_implementation="flash_attention_2", low_cpu_mem_usage=True
)

model = PeftModel.from_pretrained(base, OUTPUT_DIR_TIER_B)

del base                       
torch.cuda.empty_cache()    
model.eval()
```

```python
def generate_text_from_sample(model, sample, max_new_tokens=5000, device="cuda"):
    # Prepare the text input by applying the chat template
    text_input = processor.apply_chat_template(format_data(sample)[:2], tokenize=False, add_generation_prompt=True)
    # Process the visual input from the sample
    image_inputs, _ = process_vision_info(format_data(sample)[:2])

    # Prepare the inputs for the model
    model_inputs = processor(text=[text_input], images=image_inputs, return_tensors="pt").to(device)  # Move inputs to the specified device

    # Generate text with the model
    generated_ids = model.generate(**model_inputs, max_new_tokens=max_new_tokens, do_sample=False)

    # Trim the generated ids to remove the input ids
    trimmed_generated_ids = [out_ids[len(in_ids) :] for in_ids, out_ids in zip(model_inputs.input_ids, generated_ids)]

    # Decode the output text
    output_text = processor.batch_decode(
        trimmed_generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False
    )
    return output_text[0]  # Return the first decoded output text
```


```python
output = generate_text_from_sample(model, train[0])
output
```
