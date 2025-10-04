---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Parametric Graph for Unimodal Ranking Bandit
subtitle: Accepted at ICML 2021.
toc: true
hero_compact: true
---

## 📘Full Article
<div markdown="0">
  <a href="https://proceedings.mlr.press/v139/gauthier21a">
    <div class="preview-container" style="width: 170px;">
      <img src="{{ site.baseurl }}/assets/thumbnails/MAB_thumbnail.png" alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>

## 💡Abstract

We tackle the online ranking problem of assigning L items to K positions on a web page in order to maximize the number of user clicks. We propose an original algorithm, easy to implement and with strong theoretical guarantees to tackle this problem in the Position-Based Model (PBM) setting, well suited for applications where items are displayed on a grid. Besides learning to rank, our
algorithm, GRAB (for parametric Graph for unimodal RAnking Bandit), also learns the parameter of a compact graph over permutations of K items
among L. The logarithmic regret bound of this algorithm is a direct consequence of the unimodality property of the bandit setting with respect to
the learned graph. Experiments against state-of-the-art learning algorithms which also tackle the PBM setting, show that our method is more efficient while giving regret performance on par with the best known algorithms on simulated and real life datasets

## 📊 Results  

The theoretical performance of our algorithm compared to existing state-of-the-art methods is shown in the table below:  

<div markdown="0" style="text-align:center;">
  <a href="#img-sample">
    <div class="preview-container" style="display:inline-block;">
      <img src="{{ site.baseurl }}/assets/MAB/results-1.png"
           alt="Preview of the document"
           style="display:block; margin:0 auto; float:none; max-width:100%; height:auto;">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-sample" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/MAB/results-1.png" alt="Full-size preview">
</div>

Our approach stands out with lighter assumptions and the lowest upper bound on theoretical regret across all compared methods.  

These findings are further supported by experiments. The only exception is **PB-MHB**, which achieved the best empirical performance but comes with two major drawbacks: it is over ten times slower than GRAB when producing recommendations and lacks theoretical guarantees.  

<div markdown="0" style="text-align:center;">
  <a href="#img-juries">
    <div class="preview-container" style="width: 570px;">
      <img src="{{ site.baseurl }}/assets/MAB/results-2.png"
           alt="Preview of the document">
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
</div>
<!-- Lightbox -->
<div id="img-juries" class="lightbox" markdown="0">
  <a href="#!" class="lightbox-close"></a>
  <img src="{{ site.baseurl }}/assets/MAB/results-2.png" alt="Full-size preview">
</div>

## 🐙 Github Repository
All the codes and data are provided in our **[Github Repository](https://github.com/gaudel/ranking_bandits)**


## 📚 Citation

If you use this code in your research, please cite:

**BibTeX:**
```bibtex
@InProceedings{pmlr-v139-gauthier21a,
  title = 	 {Parametric Graph for Unimodal Ranking Bandit},
  author =       {Gauthier, Camille-Sovanneary and Gaudel, Romaric and Fromont, Elisa and Lompo, Boammani Aser},
  booktitle = 	 {Proceedings of the 38th International Conference on Machine Learning},
  pages = 	 {3630--3639},
  year = 	 {2021},
  editor = 	 {Meila, Marina and Zhang, Tong},
  volume = 	 {139},
  series = 	 {Proceedings of Machine Learning Research},
  month = 	 {18--24 Jul},
  publisher =    {PMLR},
  pdf = 	 {http://proceedings.mlr.press/v139/gauthier21a/gauthier21a.pdf},
  url = 	 {https://proceedings.mlr.press/v139/gauthier21a.html},
}

```
