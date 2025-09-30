---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Visual-TableQA, an Open-Domain Benchmark for Reasoning over Table Images
subtitle: Accepted at NeurIPS 2025 Workshop on Foundations of Reasoning in Language Models
toc: true
---

## 💡Abstract

Visual reasoning over structured data such as tables is a critical capability for modern vision-language models (VLMs), yet current benchmarks remain limited in scale, diversity, or reasoning depth, especially when it comes to rendered table images.

Addressing this gap, we introduce **Visual-TableQA**, a large-scale, open-domain multimodal dataset specifically designed to evaluate and enhance visual reasoning over complex tabular data. Our generation pipeline is **modular, scalable, and fully autonomous**, involving multiple reasoning LLMs collaborating across distinct roles: generation, validation, and inspiration.  

**Visual-TableQA** comprises 2.5k richly structured LaTeX-rendered tables and 6k reasoning-intensive QA pairs, all produced at a cost of under \$100. To promote diversity and creativity, our pipeline performs **multi-model collaborative data generation** via **cross-model prompting (‘inspiration’)** and LLM-jury filtering. Stronger models seed layouts and topics that weaker models elaborate, collectively distilling diverse reasoning patterns and visual structures into the dataset.  

Empirical results show that models fine-tuned on **Visual-TableQA** generalize robustly to external benchmarks, outperforming several proprietary models despite the dataset’s synthetic nature.  

The full pipeline and resources are publicly available in our [GitHub repository](https://github.com/AI-4-Everyone/Visual-TableQA).

## 📘 Full Article
<div markdown="0">
  <a href="https://arxiv.org/pdf/2509.07966">
    <div class="preview-container">
      <img src="{{ site.baseurl }}/assets/thumbnails/Visual-TableQA_thumbnail.png" alt="Preview of the document"/>
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>

## 🐙 Github Repository
All the codes and analysis of the dataset are provided in our **[Github Repository](https://github.com/AI-4-Everyone/Visual-TableQA-v2)**


## 📚 Citation

If you use this code or dataset in your research, please cite:

**BibTeX:**
```bibtex
@inproceedings{
lompo2025visualtableqa,
title={Visual-Table{QA}: Open-Domain Benchmark for Reasoning over Table Images},
author={Boammani Aser Lompo and Marc Haraoui},
booktitle={NeurIPS 2025 Workshop on Foundations of Reasoning in Language Models},
year={2025},
url={https://openreview.net/forum?id=fvJRsGwhPf}
}
```
