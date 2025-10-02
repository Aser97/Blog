---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Multi-objective Representation for Numbers in Clinical Narratives
subtitle: Submitted at CoRR 2024.
toc: true
hero_height: is-small
---

## 💡 Abstract

The processing of numerical values is a rapidly developing area in the field of Language Models (LLMs). Despite numerous advancements achieved by previous research, significant challenges persist, particularly within the healthcare domain. This paper investigates the limitations of Transformer models in understanding numerical values.  

**Objective:** this research aims to categorize numerical values extracted from medical documents into eight specific physiological categories using CamemBERT-bio.  

**Methods:** In a context where scalable methods and Large Language Models (LLMs) are emphasized, we explore lifting the limitations of transformer-based models. We examine two strategies: fine-tuning CamemBERT-bio on a small medical dataset, integrating Label Embedding for Self-Attention (LESA), and combining LESA with additional enhancement techniques such as Xval. Given that CamemBERT-bio is already pre-trained on a large medical dataset, the first approach aims to update its encoder with the newly added label embeddings technique. In contrast, the second approach seeks to develop multiple representations of numbers (contextual and magnitude-based) to achieve more robust number embeddings.  

**Results:** As anticipated, fine-tuning the standard CamemBERT-bio on our small medical dataset did not improve F1 scores. However, significant improvements were observed with CamemBERT-bio + LESA, resulting in an over 13% increase. Similar enhancements were noted when combining LESA with Xval, outperforming conventional methods and giving comparable results to GPT-4.  

**Conclusions and Novelty:** This study introduces two innovative techniques for handling numerical data, which are also applicable to other modalities. We illustrate how these techniques can improve the performance of Transformer-based models, achieving more reliable classification results even with small datasets.


## 📘 Full Article
<div markdown="0">
  <a href="https://arxiv.org/abs/2405.18448">
    <div class="preview-container">
      <img src="{{ site.baseurl }}/assets/thumbnails/Lesa_Xval_thumbnail.png" alt="Preview of the document"/>
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>

## 🐙 Github Repository
All the codes and analysis of the dataset are provided in our **[Github Repository](https://github.com/sadc-lab/multiobjective_token_representation)**


## 📚 Citation

If you use this code in your research, please cite:

**BibTeX:**
```bibtex
@article{DBLP:journals/corr/abs-2405-18448,
  publtype={informal},
  author={Boammani Aser Lompo and Thanh-Dung Le},
  title={Multi-objective Representation for Numbers in Clinical Narratives Using CamemBERT-bio},
  year={2024},
  cdate={1704067200000},
  journal={CoRR},
  volume={abs/2405.18448},
  url={https://doi.org/10.48550/arXiv.2405.18448}
}
```
