---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Training Language Models for Reasoning
subtitle: This brief survey explores various approaches to reasoning, with a focus on medical applications.
toc: true
---

## Abstract

Large Language Models (LLMs) have demonstrated substantial promise in the medical field, where reasoning over vast and varied datasets is critical. However, effectively deploying these models in healthcare requires addressing significant challenges, including the need for domain-specific data, finetuning for clinical accuracy, and ensuring models are compact enough for broad accessibility. This article surveys key advancements in reasoning methods, such as Chain-of-Thought, Chain-of-Hindsight, and Self-Consistency, which enable LLMs to perform complex reasoning and improve interpretability through step-by-step problem-solving. Notably, self-improving techniques also facilitate the generation of quality training data, helping to mitigate the scarcity of labeled medical datasets and highlighting the value of large model scales to enhance reasoning capacity. Efforts to condense these models into Small Language Mod- els (SLMs), though promising, show that substantial reasoning abilities remain predominantly within the domain of larger LLMs, underscoring their necessity for high-level medical applications. By examining recent studies, we explore methods to organize and encode medical knowledge—such as the creation of the MultiMedQA dataset—and advances in multilingual reasoning that address data scarcity across languages. This work ultimately emphasizes that while LLMs hold potential for achieving clinician-level reasoning in healthcare, model optimization and interpretability remain essential for ensuring safe, equitable, and accessible AI deployment in clinical settings.

## Full Article
<div markdown="0">
  <a href="{{ site.baseurl }}/assets/documents/survey.pdf">
    <div class="preview-container">
      <img src="{{ site.baseurl }}/assets/thumbnails/survey_thumbnail.PNG" alt="Preview of the document"/>
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
