---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: MODALITY-SWAP DISTILLATION, Rendering Textual Reasoning into Visual Supervision
subtitle: Under review as a conference paper at ICLR 2026
toc: true
hero_height: is-small
---

## 📘 Full Article
<div markdown="0">
  <a href="{{ site.baseurl }}/assets/documents/Visual_TableQA_ICLR_2026.pdf">
    <div class="preview-container" style="width: 170px;">
      <img src="{{ site.baseurl }}/assets/thumbnails/Modality-Swap_thumbnail.png" alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>


## 💡Abstract

Inspired by previous works (He et al., 2025), we introduce **modality swap**, a training strategy in which language models use their textual reasoning and coding capabilities to generate **synthetic LaTeX tables** that are rendered into images and then used for visual reasoning training. This setup allows smaller VLMs to contribute to their own improvement by transferring competence from text (structured generation and code) to vision (reasoning over rendered tables).

We instantiate this idea with **Visual-TableQA**, built through a **modular, scalable, and fully autonomous** pipeline. Multiple LLMs coordinate across roles—generation, validation, and inspiration (cross-model prompting)—to produce **2.5k** richly structured LaTeX-rendered tables and **9k** reasoning-intensive QA pairs at a cost under **\$100**. The pipeline includes LLM-jury filtering and cross-model inspiration, where stronger models propose structural seeds and topics that other models elaborate.

In experiments, models fine-tuned on **Visual-TableQA** show robust generalization to external benchmarks; in some settings, results are competitive with or exceed proprietary baselines. An ablation also indicates higher scores when queries are presented in textual rather than visual form, consistent with the intended cross-modal transfer from text to vision.


## 📊 Results

The complete dataset can be accessed on [Hugging Face](https://huggingface.co/datasets/AI-4-Everyone/Visual-TableQA).  

The figures below report the outcomes of supervised finetuning on Visual-TableQA:

<div markdown="0" style="text-align:center;">
  <a href="#img-sample">
    <div class="preview-container" style="display:inline-block;">
      <img src="{{ site.baseurl }}/assets/Modality-Swap/results-1.png"
           alt="Preview of the document"
           style="display:block; margin:0 auto; float:none; max-width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-sample" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/Modality-Swap/results-1.png" alt="Full-size preview">
</div>


<div markdown="0" style="text-align:center;">
  <a href="#img-juries">
    <div class="preview-container" style="width: 670px;">
      <img src="{{ site.baseurl }}/assets/Modality-Swap/results-2.png"
           alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-juries" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/Modality-Swap/results-2.png" alt="Full-size preview">
</div>

The results highlight that supervision from **Visual-TableQA** enables models to generalize well beyond the dataset’s native domain, while also challenging models finetuned on other benchmarks. This demonstrates both the value of reasoning-rich data and the higher level of complexity offered by our dataset compared to alternatives.

We also report the **LLM jury agreement** over dataset quality in the figure below:  

<div markdown="0" style="text-align:center;">
  <a href="#img-juries">
    <div class="preview-container" style="width: 670px;">
      <img src="{{ site.baseurl }}/assets/Modality-Swap/juries.png"
           alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-juries" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/Modality-Swap/juries.png" alt="Full-size preview">
</div>

This Table shows consistently strong jury agreement across all models for benchmark evaluations, with no notable divergence between proprietary and open-source LLMs. This can be attributed to the relatively simpler nature of the task (semantic comparison between model predictions
and ground truth).

## 🐙 Github Repository
All the codes and analysis of the dataset are provided in our **[Github Repository](https://github.com/AI-4-Everyone/Visual-TableQA-v2)**


## 📚 Citation

Will be released upon acceptance.
