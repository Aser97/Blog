---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Parametric Graph for Unimodal Ranking Bandit
subtitle: Accepted at ICML 2021.
toc: true
hero_height: is-small
---

## 💡Abstract

We tackle the online ranking problem of assigning L items to K positions on a web page in order to maximize the number of user clicks. We propose an original algorithm, easy to implement and with strong theoretical guarantees to tackle this problem in the Position-Based Model (PBM) setting, well suited for applications where items are displayed on a grid. Besides learning to rank, our
algorithm, GRAB (for parametric Graph for unimodal RAnking Bandit), also learns the parameter of a compact graph over permutations of K items
among L. The logarithmic regret bound of this algorithm is a direct consequence of the unimodality property of the bandit setting with respect to
the learned graph. Experiments against state-of-the-art learning algorithms which also tackle the PBM setting, show that our method is more efficient while giving regret performance on par with the best known algorithms on simulated and real life datasets

## 📘Full Article
<div markdown="0">
  <a href="https://proceedings.mlr.press/v139/gauthier21a">
    <div class="preview-container">
      <img src="{{ site.baseurl }}/assets/thumbnails/MAB_thumbnail.png" alt="Preview of the document"/>
      <div class="hover-effect">Click to view</div>
    </div>
  </a>
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
