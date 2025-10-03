---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Visual-TableQA, an Open-Domain Benchmark for Reasoning over Table Images
subtitle: Accepted at NeurIPS 2025 Workshop on Foundations of Reasoning in Language Models
toc: true
hero_height: is-small
---

## 📘 Full Article
<div markdown="0">
  <a href="https://arxiv.org/pdf/2509.07966">
    <div class="preview-container" style="width: 150px;">
      <img src="{{ site.baseurl }}/assets/thumbnails/Visual-TableQA_thumbnail.png" alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>

## 💡Abstract

Visual reasoning over structured data such as tables is a critical capability for modern vision-language models (VLMs), yet current benchmarks remain limited in scale, diversity, or reasoning depth, especially when it comes to rendered table images.

Addressing this gap, we introduce **Visual-TableQA**, a large-scale, open-domain multimodal dataset specifically designed to evaluate and enhance visual reasoning over complex tabular data. Our generation pipeline is **modular, scalable, and fully autonomous**, involving multiple reasoning LLMs collaborating across distinct roles: generation, validation, and inspiration.  

**Visual-TableQA** comprises 2.5k richly structured LaTeX-rendered tables and 6k reasoning-intensive QA pairs, all produced at a cost of under \$100. To promote diversity and creativity, our pipeline performs **multi-model collaborative data generation** via **cross-model prompting (‘inspiration’)** and LLM-jury filtering. Stronger models seed layouts and topics that weaker models elaborate, collectively distilling diverse reasoning patterns and visual structures into the dataset.  

Empirical results show that models fine-tuned on **Visual-TableQA** generalize robustly to external benchmarks, outperforming several proprietary models despite the dataset’s synthetic nature.  

The full pipeline and resources are publicly available in our [GitHub repository](https://github.com/AI-4-Everyone/Visual-TableQA-v2).

## 📊 Results  
Below is a sample of tables and QA pairs generated through our pipeline:  

<div markdown="0" style="text-align:center;">
  <a href="#img-sample">
    <div class="preview-container" style="display:inline-block;">
      <img src="{{ site.baseurl }}/assets/Visual-TableQA/sample.png"
           alt="Preview of the document"
           style="display:block; margin:0 auto; float:none; max-width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-sample" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/Visual-TableQA/sample.png" alt="Full-size preview">
</div>

The full dataset is available on [Hugging Face](https://huggingface.co/datasets/AI-4-Everyone/Visual-TableQA).  
We also report the **LLM jury agreement** over dataset quality in the figure below:  

<div markdown="0" style="text-align:center;">
  <a href="#img-juries">
    <div class="preview-container" style="width: 670px;">
      <img src="{{ site.baseurl }}/assets/Visual-TableQA/juries.png"
           alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-juries" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/Visual-TableQA/juries.png" alt="Full-size preview">
</div>

The analysis shows varying levels of consistency across juries. **GPT-4.1** stands out as the most reliable, likely due to its ability to handle edge cases effectively. Proprietary models such as **Gemini-2.5-pro** and **GPT-4.1** align most closely with the majority vote, while **Deepseek-v3.1** demonstrates the weakest agreement. Interestingly, the pairwise jury agreement patterns seem correlated with the models’ reasoning strength. Despite differences in alignment, all juries maintain a meaningful level of concordance with the majority, underscoring the robustness of our evaluation protocol.  

---

## 🚀 Application  
A natural next step for this dataset is to **fine-tune VLMs** to strengthen their reasoning abilities.  
This direction is explored in a follow-up project, which you can find [here]({{"Projects/Modality-Swap"| relative_url}}).

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
