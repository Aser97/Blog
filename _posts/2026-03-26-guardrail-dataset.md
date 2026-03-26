---
layout: post
title: "🛡️ Building a Custom Dataset for a Youth Mental Health Safety Guardrail"
subtitle: Synthetic Data Engineering for Sensitive AI — From Signal Taxonomy to Trained Classifier
date: 2026-03-26
author: Boammani Aser Lompo
categories: jekyll update
permalink: /guardrail-dataset/
image: /assets/guardrail_files/architecture.png
menubar_toc: true
hero_compact: true
sidebar_docs_label: "📘 Resources"
sidebar_docs:
  - label: "GITHUB"
    url: https://github.com/Aser97/Guardrail-For-Agents
    thumb: /assets/thumbnails/github_thumb.svg
  - label: "DATASET"
    url: https://huggingface.co/datasets/AserLompo/khp-youth-mental-health-guardrail
    thumb: /assets/thumbnails/huggingface_thumb.svg
---

When an AI assistant talks to young people in distress, the stakes are high. A response that misses a cry for help — or that over-triggers on benign conversation — can cause real harm. This post walks through the end-to-end engineering effort behind a custom input guardrail designed to protect vulnerable youth interacting with a virtual assistant: from defining what to detect, to building the dataset, to training and evaluating the classifier.

---

## The Task: Guarding the Input Channel

The guardrail sits at the front of the assistant pipeline, intercepting every user message before it reaches the virtual assistant.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-pipeline">
    <div class="preview-container" style="display:inline-block; max-width:720px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/pipeline_diagram.png"
           alt="Guardrail pipeline diagram"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-pipeline" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/pipeline_diagram.png" alt="Full-size pipeline diagram">
</div>

A message flows from the **User** → **Input GuardRail** → **Virtual Assistant** → **Response Evaluation**. If the guardrail flags a conversation as high-risk, the system can route it to a safer response path or escalate to a human support worker. Everything downstream — tone, safety, helpfulness — depends on this first gate getting it right.

### Requirements — and Why This Is Hard

Building this guardrail is not as simple as training a toxicity classifier. Several properties make it genuinely difficult:

- **Subtlety over explicitness.** Young people rarely express distress in clinical language. Signals are embedded in casual conversation, slang, and indirect phrasing ("i just feel like... idk").
- **Multilingual coverage.** The assistant serves both English- and French-speaking users; the guardrail must generalise across languages without losing sensitivity.
- **Diversity of background.** Gender, socioeconomic status, mental health history, and cultural register all shape how distress is expressed. A model trained on a narrow demographic will miss signals from others.
- **Low false-negative tolerance.** Missing a genuine distress signal is the more dangerous failure mode. The system must be calibrated to lean toward recall.
- **No public dataset fits.** Existing mental-health NLP datasets are either adult-focused, clinical-language-heavy, or too narrow in signal coverage. A purpose-built synthetic dataset is necessary.

---

## Defining the Signal Taxonomy

Before generating a single training example, we need a precise answer to: *what exactly are we detecting?*

The guardrail targets nine distinct distress signals, each corresponding to a different type of risk a young person might be experiencing:

| # | Signal | Description | Example phrases |
|---|--------|-------------|-----------------|
| 1 | **Suicidal ideation** | Direct or indirect thoughts of ending one's life | "i don't want to be here anymore", "what's the point of anything" |
| 2 | **Self-harm** | Non-suicidal self-injury or urges toward it | "i've been cutting", "i want to hurt myself" |
| 3 | **Eating disorder** | Disordered eating behaviours or cognitions | "i feel disgusting after eating", "i haven't eaten in days" |
| 4 | **Substance use** | Drug or alcohol use as a coping mechanism | "weed helps me sleep", "i've been drinking a lot lately" |
| 5 | **Abuse** | Physical, emotional, or sexual abuse (current or past) | "he hits me when he's angry", "i'm scared to go home" |
| 6 | **Neglect** | Unmet basic needs, parental absence, food insecurity | "my parents don't care where i am", "there's never food at home" |
| 7 | **Bullying** | Peer victimisation online or at school | "they keep making fun of me", "i got doxxed" |
| 8 | **Testing** | Probing the assistant's limits without genuine distress | "what would you do if i said i wanted to die", "just hypothetically..." |
| 9 | **Third-party concern** | Expressing worry about someone else's safety | "i'm worried about my friend, she hasn't eaten in weeks" |

A key design decision: **high-risk does not mean any signal fired**. A conversation can mention a signal lightly — as background context, as curiosity, or hypothetically — without warranting immediate escalation. The label `high_risk = 1` represents a holistic judgment about whether the user needs urgent support, explicitly decoupled from the nine signal flags. This prevents the classifier from learning a simple OR-gate, which would produce far too many false positives:

$$
\text{high_risk} \neq \mathbf{1}\!\left[s_1 = 1 \;\lor\; s_2 = 1 \;\lor\; \cdots \;\lor\; s_9 = 1\right]
$$

---

## Data Generation Strategy

With no existing dataset that matches our requirements, every training example is synthetically generated. The pipeline uses four complementary techniques, each targeting a different region of the data distribution.

### From-Scratch Single-Model Generation

The first technique uses a single LLM to generate a full multi-turn conversation from a structured prompt, followed by Claude Sonnet acting as a jury that scores all nine signal labels.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-scratch">
    <div class="preview-container" style="display:inline-block; max-width:680px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/scratch_generation.png"
           alt="From-scratch single-model generation flow"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-scratch" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/scratch_generation.png" alt="From-scratch generation flow">
</div>

The prompt template is the core of this technique. It specifies the **target signal**, the **persona**, the **stressor**, and the desired **register** — each drawn from purpose-built banks:

- **Persona bank**: 40+ combinations of age (13–17), gender, first language (EN/FR), socioeconomic status, and mental health history.
- **Register / slang bank**: teenage informal writing patterns, including code-switching, abbreviations, and social-media-influenced syntax.
- **Stressor bank**: domain-specific triggers — academic pressure, relationship conflict, family dysfunction, social exclusion, and more.

Two models rotate for generation: `mistral-large-latest` for French conversations and half the English set, `Llama-3.3-70B-Instruct-Turbo` for the other half — ensuring stylistic diversity in the corpus.

### CAMEL: Dual-Agent Role-Play

The CAMEL technique <sup>[[1]](#ref-camel)</sup> assigns two LLMs to distinct roles — one playing the user, one playing the assistant — and lets them conduct a full conversation guided by an agent prompt injected into the assistant side.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-camel">
    <div class="preview-container" style="display:inline-block; max-width:720px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/camel_diagram.png"
           alt="CAMEL dual-agent generation flow"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-camel" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/camel_diagram.png" alt="CAMEL dual-agent generation">
</div>

The agent prompt instructs LLM₂ to play a supportive assistant while naturally steering the scenario toward the target signal — without making the signal explicit. The dual-generation setup produces more naturalistic, conversational exchanges than single-model generation, particularly for signals that surface gradually over an interaction (e.g. `testing`, `third_party_concern`).

### PAIR: Adversarial Red-Teaming

PAIR (Prompt Automatic Iterative Refinement) <sup>[[2]](#ref-pair)</sup> uses an adversarial feedback loop between a generator LLM and a jury. The generator is tasked with producing a realistic, subtle conversation expressing a target signal. The jury scores each attempt on three axes: **realism** (does this read like a real teenager?), **subtlety** (is the signal implied rather than stated?), and **signal presence** (is the target signal genuinely expressed?). Conversations scoring below threshold are sent back to the generator with structured feedback.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-pair">
    <div class="preview-container" style="display:inline-block; max-width:720px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/pair_diagram.png"
           alt="PAIR adversarial red-teaming loop"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-pair" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/pair_diagram.png" alt="PAIR adversarial red-teaming loop">
</div>

A CAMEL variant of PAIR runs the same loop with two feedbacks injected simultaneously — one into each agent — targeting signals that are especially hard to elicit through single-model generation.

This technique is the most compute-intensive but produces the most challenging examples: conversations where the signal is genuinely present but subtle enough that a careless classifier would miss it.

### Seed Augmentation

The augmentation phase takes high-quality seed conversations (sourced from a validation split and from the public [ESConv](https://huggingface.co/datasets/thu-coai/esconv) dataset <sup>[[3]](#ref-esconv)</sup>) and applies four transformation operators to expand coverage:

| Operator | What it does |
|----------|-------------|
| **Language rewrite** | Translates EN ↔ FR while preserving signal expression |
| **Persona swap** | Rewrites the conversation for a different age, gender, or background |
| **Signal injection** | Adds a secondary signal to a low-signal conversation |
| **Signal softening** | Reduces signal intensity, creating borderline high-risk examples |

Each augmented row is verified by a Claude Sonnet jury to confirm that the signal survived the transformation. The softening operator is particularly important: it creates the near-threshold examples that are critical for calibrating the classifier boundary without producing over-sensitive false positives. This phase also generates the **low-risk** portion of the dataset, either by applying low-risk prompts directly to the generation models, or by softening high-risk seeds below the escalation threshold.

---

## Dataset Quality Gates

Raw generation output is never used directly. A dedicated quality-control pass runs after generation to remove problematic rows.

### Cleaning Generation Artifacts

LLMs frequently introduce wrapper artifacts — preamble phrases ("Sure, here is a conversation...") and suffix markers ("[END]", "---"). A regex-based cleaning pass strips these from all generated text. Rows that required cleaning are flagged for re-annotation, since the signal scoring was performed on the uncleaned version.

### High/Low Risk Label Consistency

Because the high-risk label is explicitly decoupled from the nine signal flags, inconsistencies can appear: a row might be labeled `high_risk = 0` while carrying a `s_suicidal_ideation = 1` flag, or vice versa. A **priority algorithm** resolves these systematically, using a signal-severity ordering to determine the correct ground-truth label whenever annotations conflict.

### Dataset Statistics

The final dataset spans all four generation techniques, two languages, and all nine signals. The figure below summarises per-signal coverage in high-risk rows, source composition by generation technique, and language distribution across the corpus:

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-dataset-stats">
    <div class="preview-container" style="display:inline-block; max-width:720px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/dataset_stats.png"
           alt="Dataset statistics: signal coverage, source composition, language distribution"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-dataset-stats" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/dataset_stats.png" alt="Dataset statistics">
</div>

---

## Training the Guardrail

### Choosing the Base Model

The guardrail needs to: process long multi-turn conversations, understand both English and French, output nine independent classification scores, and run efficiently at inference time. After evaluating available options, **Qwen2.5-7B-Instruct** <sup>[[4]](#ref-qwen)</sup> checks every box: it is bilingual, has a 32k-token context window, has been benchmarked extensively on reasoning and instruction-following, and is efficient enough for production deployment.

Fine-tuning uses **LoRA** <sup>[[5]](#ref-lora)</sup> (r = 16, α = 32) on a nine-head multi-label classification layer, with one output logit per distress signal. The model is trained on a stratified split of the synthetic dataset.

### Why `max(p₁, …, p₉)` Does Not Work

A natural first approach to producing a binary high-risk prediction would be:

$$
\hat{y} = \mathbf{1}\!\left[\max(p_1, \ldots, p_9) \geq \tau\right]
$$

This fails for two reasons. First, signal probabilities are not calibrated to the same scale — a score of 0.6 on `testing` does not carry the same semantic weight as 0.6 on `suicidal_ideation`. Second, certain signal combinations are systematically more dangerous than their individual components (e.g. `self_harm` co-occurring with `substance_use`). A simple max ignores all such interactions.

### Logistic Regression Head Over Signal Probabilities

Instead, a **logistic regression head** is trained on top of the nine signal probabilities, using the high-risk binary label as the target. The LR head learns a weighted combination of the nine scores, effectively implementing a learned, interpretable priority function:

$$
\hat{y} = \sigma\!\left(\mathbf{w}^\top [p_1, \ldots, p_9] + b\right)
$$

Crucially, this head is trained on the **validation split** of the synthetic data — data the base Qwen model never saw during LoRA fine-tuning — which ensures the calibration signal reflects genuine generalisation rather than memorisation.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-architecture">
    <div class="preview-container" style="display:inline-block; max-width:680px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/architecture.png"
           alt="Global architecture of the Guardrail"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-architecture" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/architecture.png" alt="Global guardrail architecture">
</div>

### Threshold Calibration

The final decision threshold on the LR output is calibrated by scanning the precision-recall curve on the validation set. Given the asymmetric cost structure of a safety system — false negatives are more harmful than false positives — the threshold is chosen to prioritise recall.

---

## Evaluation

The trained guardrail was evaluated on an external dataset of real-world youth mental health conversations: a 94-sample annotated corpus held out from all training and calibration steps.

<div markdown="0" style="text-align:center; margin: 2rem 0;">
  <a href="#img-eval">
    <div class="preview-container" style="display:inline-block; max-width:720px;">
      <img src="{{ site.baseurl }}/assets/guardrail_files/evaluation_results.png"
           alt="Guardrail evaluation results"
           style="display:block; margin:0 auto; width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-eval" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/guardrail_files/evaluation_results.png" alt="Evaluation results">
</div>

| Metric | Score |
|--------|-------|
| Precision | **0.8222** |
| Recall | **0.8810** |
| F1 | **0.8506** |

The confusion matrix on the 94 evaluation samples:

|  | Predicted Positive | Predicted Negative |
|--|:-----------------:|:-----------------:|
| **Actual Positive** | TP = 37 | FN = 5 |
| **Actual Negative** | FP = 8 | TN = 44 |

A recall of 0.881 means the guardrail catches 37 of 42 genuine high-risk conversations. Critically, the 5 false negatives are all qualitatively borderline: every one of them was reviewed and found to fall into a region where reasonable annotators disagree. They were labeled positive in the evaluation set due to a broad annotation convention, but a careful reader would consider them negative or low-risk. Two representative examples:

> *"hey... idk if this is even the right place to talk about this but i'm kinda falling apart over my boyfriend [...] i just feel like... like im not good enough for him or something"*

> *"hi, i'm really stressed about starting my new school next week. like i don't even know if i should go"*

Both reflect real adolescent distress, but neither contains an acute safety signal — the guardrail's decision to classify them as negative is defensible. This suggests the true recall on genuinely high-risk conversations may be higher than 0.881, and that performance can be improved further with additional data covering the borderline signal-softening range.

---

## What's Next

The guardrail is intentionally modular. The nine signal heads and the LR aggregation layer can be independently retrained as new data arrives, without touching the base model. Immediate next steps include:

- Expanding the synthetic dataset with more borderline examples in the signal-softened range to sharpen the decision boundary
- Adding a real-data fine-tuning phase using carefully anonymised, consent-obtained examples
- Exploring a small MLP in place of the LR head to capture non-linear interactions between co-occurring signals

The full dataset and training code are available in the resource panel above.

---

## References

<ol>
  <li id="ref-camel">Li, G., Hammoud, H., Itani, H., Khizbullin, D., & Ghanem, B. (2023). <em>CAMEL: Communicative Agents for "Mind" Exploration of Large Language Model Society.</em> NeurIPS 2023. <a href="https://arxiv.org/abs/2303.17760" target="_blank">arXiv:2303.17760</a></li>
  <li id="ref-pair">Chao, P., Robey, A., Dobriban, E., Hassani, H., Pappas, G. J., & Wong, E. (2023). <em>Jailbreaking Black Box Large Language Models in Twenty Queries.</em> <a href="https://arxiv.org/abs/2310.08419" target="_blank">arXiv:2310.08419</a></li>
  <li id="ref-esconv">Liu, S., Chen, C., Hou, L., Shi, S., Zhou, S., Lai, S., … & Huang, M. (2021). <em>Towards Emotional Support Dialog Systems.</em> ACL 2021. <a href="https://arxiv.org/abs/2106.01144" target="_blank">arXiv:2106.01144</a></li>
  <li id="ref-qwen">Qwen Team, Alibaba Cloud. (2024). <em>Qwen2.5 Technical Report.</em> <a href="https://arxiv.org/abs/2412.15115" target="_blank">arXiv:2412.15115</a></li>
  <li id="ref-lora">Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., … & Chen, W. (2021). <em>LoRA: Low-Rank Adaptation of Large Language Models.</em> ICLR 2022. <a href="https://arxiv.org/abs/2106.09685" target="_blank">arXiv:2106.09685</a></li>
</ol>
