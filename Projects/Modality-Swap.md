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
---
<!-- Modality-Swap visualization (inline SVG) -->
<div style="text-align:center;">
<div class="modswap-vis" markdown="0">
  <style>
    .modswap-vis { max-width: 900px; margin: 1.5rem auto; }
    .modswap-vis svg { width: 100%; height: auto; display: block; }

    /* Colors (light/dark) */
    .ms-bg { fill: #ffffff; }
    .ms-card { fill: #f6f8fb; stroke: #cfd8e3; }
    .ms-mirror { fill: url(#mirrorGrad); stroke: #9aa4b2; }
    .ms-accent { stroke: #3b82f6; fill: #3b82f6; }
    .ms-text { fill: #111827; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji"; }
    .ms-ok { fill: #10b981; }
    .ms-hard { fill: #ef4444; }
    .ms-vlm { fill: #111827; }
    .ms-emoji { font-size: 18px; }

    @media (prefers-color-scheme: dark) {
      .ms-bg { fill: #2c344c; }
      .ms-card { fill: #121a2e; stroke: #26324a; }
      .ms-mirror { stroke: #44506a; }
      .ms-text { fill: #e5e7eb; }
      .ms-vlm { fill: #e5e7eb; }
    }

    /* Animation */
    .ms-sparkle { opacity: 0; animation: twinkle 2.6s infinite 1.2s ease-in-out; }
    .ms-pulse { transform-origin: center; animation: pulse 2.6s infinite 1.6s ease-in-out; }

    @keyframes flow { 0%{opacity:0} 25%{opacity:1} 50%{opacity:.2} 100%{opacity:0} }
    @keyframes twinkle { 0%{opacity:0} 40%{opacity:1} 70%{opacity:0} 100%{opacity:0} }
    @keyframes pulse { 0%{transform:scale(1)} 45%{transform:scale(1.1)} 90%{transform:scale(1)} 100%{transform:scale(1)} }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ms-sparkle, .ms-pulse { animation: none !important; opacity: 1; }
    }
  </style>

  <svg viewBox="0 0 900 360" role="img" aria-labelledby="modswap-title modswap-desc">
    <title id="modswap-title">Modality-Swap: Turning textual tasks into challenging visual tasks</title>
    <desc id="modswap-desc">
      A VLM easily solves a textual task, then a mirror converts the task into a visual format that the same model finds harder.
    </desc>

    <!-- Background -->
    <rect class="ms-bg" x="0" y="0" width="900" height="360" rx="16"/>

    <!-- Left: Text task card -->
    <g transform="translate(40,70)">
      <rect class="ms-card" x="0" y="0" width="260" height="180" rx="12"/>
      <text class="ms-text" x="16" y="36" font-weight="700">Textual Task</text>
      <text class="ms-text" x="16" y="70">“Sum revenues for</text>
      <text class="ms-text" x="16" y="92">Q2 across regions.”</text>

      <!-- Easy badge -->
      <g transform="translate(16,130)">
        <text x="170" y="-30" font-size="20" text-anchor="middle" alignment-baseline="middle">✅</text>
        <text class="ms-text" x="160" y="-10">Too easy</text>
      </g>

      <!-- VLM badge -->
      <g transform="translate(180,-18)" class="ms-pulse">
      <image href="{{ site.baseurl }}/assets/Modality-Swap/qwen-logo.png"
       x="100" y="-30"
       width="80" height="80" />

       <!-- Sunglasses overlay (tweak x/y to fit your logo’s eyes) -->
        <g transform="translate(100,-30)">
          <!-- The logo box here is 80×80 starting at (0,0).
               These lenses are roughly centered horizontally around x≈20..60 and y≈34. -->
          <!-- Left lens -->
          <rect x="18" y="32" width="24" height="12" rx="3" ry="3" fill="black"/>
          <!-- Right lens -->
          <rect x="46" y="32" width="24" height="12" rx="3" ry="3" fill="black"/>
          <!-- Bridge -->
          <rect x="42" y="37" width="6" height="2" fill="black"/>
          <!-- (Optional) tiny arms for style -->
          <rect x="10" y="36" width="8" height="2" fill="black"/>
          <rect x="70" y="36" width="8" height="2" fill="black"/>
        </g>
      </g>
    </g>

    <!-- Center: Mirror -->
    <defs>
      <linearGradient id="mirrorGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e5ecff" />
        <stop offset="100%" stop-color="#bfd4ff" />
      </linearGradient>
    </defs>

    <g transform="translate(350,40)">
      <!-- Mirror frame -->
      <rect class="ms-mirror" x="0" y="0" width="200" height="280" rx="16"/>
      <!-- Mirror diagonal shine -->
      <path d="M15,30 L185,250" stroke="#ffffff55" stroke-width="6" />
      <!-- “Swap” label -->
      <text class="ms-text" x="100" y="305" text-anchor="middle" font-weight="700">Modality Swap</text>

      <!-- Sparkle -->
      <polygon class="ms-sparkle" points="98,40 104,58 122,64 104,70 98,88 92,70 74,64 92,58"
               fill="#ffffffaa"/>
    </g>

    <!-- Right: Visual task card -->
    <g transform="translate(600,70)">
      <rect class="ms-card" x="0" y="0" width="260" height="180" rx="12"/>
      <text class="ms-text" x="16" y="36" font-weight="700">Visual Task</text>
      <text class="ms-text" x="16" y="70">Same question, now</text>
      <text class="ms-text" x="16" y="92">but given as an image.</text>

      <!-- Little table icon -->
      <g transform="translate(16,110)">
        <rect x="0" y="0" width="110" height="50" rx="6" fill="#dbeafe" stroke="#93c5fd"/>
        <line x1="36" y1="0" x2="36" y2="50" stroke="#93c5fd"/>
        <line x1="72" y1="0" x2="72" y2="50" stroke="#93c5fd"/>
        <line x1="0" y1="25" x2="110" y2="25" stroke="#93c5fd"/>
      </g>

      <!-- Hard badge -->
      <g transform="translate(170,130)">
        <text x="30" y="-30" font-size="32" text-anchor="middle" alignment-baseline="middle">❌</text>
        <text class="ms-text" x="10" y="-5">Challenging</text>
      </g>

      <!-- Same VLM (now sweating) -->
      <g transform="translate(180,-18)" class="ms-pulse">
        <image href="{{ site.baseurl }}/assets/Modality-Swap/qwen-logo.png"
          x="100" y="-30"
          width="80" height="80" />
        <text class="ms-emoji" x="160" y="-10">💦</text>
      </g>
    </g>

    <!-- Arrows -->
    <g stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrow)">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8"/>
        </marker>
      </defs>
      <path d="M300,160 C330,160 330,160 350,160"/>
      <path d="M550,160 C570,160 570,160 600,160"/>
    </g>
  </svg>
</div>
<p style="font-style:italic; margin-top:0.5rem; color:#555;">
  A VLM easily solves a textual task, then a mirror converts the task into a visual format that the same model finds harder.
</p>
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
