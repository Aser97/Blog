---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: MODALITY-SWAP DISTILLATION, Rendering Textual Reasoning into Visual Supervision
subtitle: Under review as a conference paper at ICLR 2026
toc: true
---

## 💡Abstract

Inspired by previous works (He et al., 2025), we introduce **modality swap**, a training strategy in which language models use their textual reasoning and coding capabilities to generate **synthetic LaTeX tables** that are rendered into images and then used for visual reasoning training. This setup allows smaller VLMs to contribute to their own improvement by transferring competence from text (structured generation and code) to vision (reasoning over rendered tables).

We instantiate this idea with **Visual-TableQA**, built through a **modular, scalable, and fully autonomous** pipeline. Multiple LLMs coordinate across roles—generation, validation, and inspiration (cross-model prompting)—to produce **2.5k** richly structured LaTeX-rendered tables and **9k** reasoning-intensive QA pairs at a cost under **\$100**. The pipeline includes LLM-jury filtering and cross-model inspiration, where stronger models propose structural seeds and topics that other models elaborate.

In experiments, models fine-tuned on **Visual-TableQA** show robust generalization to external benchmarks; in some settings, results are competitive with or exceed proprietary baselines. An ablation also indicates higher scores when queries are presented in textual rather than visual form, consistent with the intended cross-modal transfer from text to vision.

## 📘 Full Article
<div markdown="0">
  <a href="{{ site.baseurl }}/assets/documents/Visual_TableQA_ICLR_2026.pdf">
    <div class="preview-container">
      <img src="{{ site.baseurl }}/assets/thumbnails/Modality-Swap_thumbnail.png" alt="Preview of the document"/>
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>

## 🐙 Github Repository
All the codes and analysis of the dataset are provided in our **[Github Repository](https://github.com/AI-4-Everyone/Visual-TableQA-v2)**


## 📚 Citation

Will be released upon acceptance.
