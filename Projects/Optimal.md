---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: Optimal Transport
subtitle: Optimal transport with mass imbalance
layout: page
menubar: docs_menu
toc: true
---

This is a mini project I've made and supervised by Gabriel PEYRE during my MVA Master year. Optimal Transport basically tackles the problem of transferring a mass distribution from one measured space $$(X, \alpha)$$ to another measured $$(Y, \beta)$$.

## Abstract
The aim of this presentation is to study the optimal transport problem in a context where the initial and target distributions do not have the same mass.

The Kantorovich formulation of the Optimal Transport problem is as follows: Suppose we have two probability measures, $$\alpha$$ and $$\beta$$, defined on two sets $$X$$ and $$Y$$, and a cost function $$c(x, y)$$ defined on $$X \times Y$$. The goal is to find a probability measure $$\gamma$$ on $$X \times Y$$ that minimizes the transport cost $$\int_{X\times Y}c(x,y) \textrm{d}P(x,y)$$ subject to the constraints $$P_{\#}^X \gamma = \alpha$$ and $$P_{\#}^Y \gamma = \beta$$.

However, this formulation cannot be solved when α and β are not probability measures of the same mass. This study focuses on addressing this issue. We will introduce a more general formulation of the Optimal Transport problem that can handle this case and propose a generalization of the Sinkhorn algorithm to solve it. Additionally, we will demonstrate how this algorithm applies to the Wasserstein barycenter problem and present several illustrations showcasing its performance on different problems.
