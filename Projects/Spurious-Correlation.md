---
layout: page
title: Implicit Bias of Gradient Descent under Feature-Mediated Spurious Correlations
subtitle: Currently under submission
menubar_toc: true
hero_compact: true
sidebar_docs_label: "📘 Resources"
sidebar_docs:
  - label: "GITHUB"
    url: https://github.com/Aser97/Class-Imbalance-And-Gradient-Descent-Dynamics
    thumb: /assets/thumbnails/github_thumb.svg
  - label: "FULL ARTICLE"
    url: /assets/documents/Implicit_Bias_of_GD_under_Spurious_Correlation.pdf
    thumb: /assets/Spurious-Correlation/phase_transition_summary.png
---

*Boammani Aser Lompo (École de Technologie Supérieure) · Patrik Kenfack (ÉTS, MILA)*
**Preprint — currently under submission.**

## 💡 Abstract

We study how **feature-mediated** spurious correlations affect the learning dynamics of gradient descent on linearly separable data.

Unlike the widely studied **label-mediated** setting — where the spurious feature depends only on the class label and is conditionally independent of the causal features — feature-mediated correlations entangle spurious and causal signals *at the instance level* through group-specific operators. This makes them both harder to detect in practice and considerably more complex to analyse theoretically.

We first generalise the implicit-bias result of Soudry et al. (2018) to continuous distributions, then derive closed-form group-wise classification error rates. In the general setting, each group's error decays at a rate governed by its hard margin $$\gamma_g$$. In the **isotropic regime**, a single exponent $$\alpha$$ captures the competition between the minority's geometric margin advantage and the coupling induced by the spurious alignment operators — and a phase transition occurs at $$\alpha = 1$$.

These results formalise in closed form the widely observed phenomenon that group imbalance implicitly biases optimisation toward the majority, while revealing that the effect of imbalance can be **entirely superseded** by geometric margin advantages.

---

## 🧩 Two ways a spurious correlation can arise

The distinction that motivates this work is *how* the spurious feature comes to correlate with the label.

<div class="columns is-vcentered" markdown="0">
  <div class="column">
    <p style="text-align:center; font-weight:600;">Label-mediated</p>
    <img src="{{ site.baseurl }}/assets/Spurious-Correlation/label-mediated-img.png" alt="Label-mediated spurious correlation">
  </div>
  <div class="column">
    <p style="text-align:center; font-weight:600;">Feature-mediated</p>
    <img src="{{ site.baseurl }}/assets/Spurious-Correlation/features-mediated-img.png" alt="Feature-mediated spurious correlation">
  </div>
</div>

In **label-mediated** correlations, the spurious feature $$\mathbf{s}$$ depends on the class label $$y$$ but is conditionally independent of the causal features $$\mathbf{r}$$ given the label and the group. Waterbirds is the canonical example: the background scene correlates with the bird species *through the labelling process*. Because $$\mathbf{s} \perp \mathbf{r} \mid (y, g)$$ lets you manipulate the two signals independently, this case is comparatively tractable — and it is where essentially all existing benchmarks and theory sit.

In **feature-mediated** correlations, $$\mathbf{s}$$ depends on the *specific value* of $$\mathbf{r}$$, not merely on $$y$$. The causal and spurious signals are entangled per-instance. This is the realistic case in tabular pipelines, where practitioners concatenate raw verified measurements with derived risk scores produced by external vendors — the score is a function of the measurements themselves.

To our knowledge, **no prior work has given a theoretical analysis of learning dynamics under feature-mediated spurious correlations.**

---

## 📐 Main results

The analysis operates at the **population level**: gradient descent on the expected risk under a learned representation distribution, rather than on an empirical average over a finite sample. This yields dynamics free of finite-sample fluctuation while remaining predictive of observed behaviour.

**1. A continuous-distribution implicit bias theorem.**
We generalise Theorem 9 of Soudry et al. (2018) to continuous, compactly supported distributions. The iterates still converge in direction to the max-margin classifier $$\hat w$$, but the residual grows as $$-\hat w \log\log t + O(1)$$ — in contrast to the $$O(1)$$ residual of the finite-sample case.

**2. Explicit per-group error decay rates.**
In the general (anisotropic) case, each group's error decays as

$$\Theta\!\left(z_t^{-\gamma_g}(\ln z_t)^{\gamma_g + \delta_g + \tilde\delta_g - 1}\right)$$

governed by its hard margin $$\gamma_g$$. In the isotropic regime we obtain sharp asymptotics controlled by the single exponent $$\alpha$$ encoding the competition between geometric margins and the spurious alignment operators.

**3. A phase transition at $$\alpha = 1$$.** — see below.

**4. Generalisation failure under correlation shift.**
Under a shift in the spurious correlation at test time, the classifier may reach a **non-vanishing error floor** whenever the test margin $$\gamma_{\text{test}} < 0$$. Convergence of the training dynamics buys you nothing here: the error does not decay to zero no matter how long you train.

---

## 📊 The phase transition

The sharpest result is a genuine change of regime at $$\alpha = 1$$:

- **Below the threshold** ($$\alpha < 1$$), every group's error decays as $$\kappa_g / (\varepsilon_g z_t)$$. The group proportion $$\varepsilon_g$$ *directly scales learning speed* — this is the familiar story in which the minority is learned more slowly simply because it is smaller.
- **Above the threshold** ($$\alpha > 1$$), the group with the larger $$\mathbf{r}$$-margin **escapes the $$\varepsilon$$-dependence entirely** and converges at the faster polynomial rate $$z_t^{-\alpha}$$. Group imbalance stops governing the dynamics.

<div markdown="0" style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/Spurious-Correlation/alpha_sweep_overlay.png" alt="Alpha sweep: error decay across the phase transition" style="max-width:760px; width:100%;">
</div>

<div markdown="0" style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/Spurious-Correlation/phase_transition_summary.png" alt="Phase transition summary at alpha = 1" style="max-width:460px; width:100%;">
</div>

The practical reading: **a minority group with a sufficient geometric margin advantage is not doomed by its size.** Imbalance and margin are competing quantities, and above $$\alpha = 1$$ margin wins outright. Interventions aimed purely at rebalancing group proportions are addressing only one side of that competition.

---

## 🧪 Experiments

Predictions are validated on a synthetic tabular pipeline instantiating the isotropic regime, plus a **Colored-MNIST** construction built specifically to be feature-mediated.

In the tabular setup, raw verified measurements are encoded as $$\mathbf{r} \in \mathbb{R}^{d_r}$$ and vendor-derived risk scores as $$\mathbf{s} \in \mathbb{R}^{d_s}$$, with two vendors applying different linear operators, $$\mathbf{s} = A\mathbf{r} + \xi$$ and $$\mathbf{s} = B\mathbf{r} + \xi$$. Because both vendors estimate the same underlying phenomenon, the isotropic regime holds by construction. All runs use full-batch gradient descent with logistic loss, $$h = 0.01$$, $$d_r = d_s = 8$$, $$N = 10^6$$ samples and $$T = 2 \times 10^6$$ steps.

In the Colored-MNIST construction, background intensity increases with digit class in the majority group and *decreases* with digit class in the minority group, with label $$y = \mathbf{1}_{\text{digit} \ge 5}$$. The spurious feature therefore depends on the causal feature through a nonlinear function of it — feature-mediated by construction, not by labelling.

The empirical decay rates match the predicted exponents, and the transition at $$\alpha = 1$$ is sharp.

---

## 📚 Citation

**BibTeX:**
```bibtex
@misc{lompo2026implicitbias,
  title  = {Implicit Bias of Gradient Descent under Feature-Mediated Spurious Correlations},
  author = {Boammani Aser Lompo and Patrik Kenfack},
  year   = {2026},
  note   = {Preprint, under submission}
}
```
