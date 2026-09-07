---
layout: page
title: Making Learned Programs Explicit
subtitle: Ongoing research — mechanistic interpretability of arithmetic circuits in LLMs
menubar_toc: true
hero_compact: true
sidebar_docs_label: "📘 Resources"
sidebar_docs:
  - label: "GITHUB"
    url: https://github.com/galaxy532/N2P-Experiments
    thumb: /assets/thumbnails/github_thumb.svg
---

*Boammani Aser Lompo (École de Technologie Supérieure)*
**Work in progress — research plan and preliminary experiments. Results below are descriptive and pre-causal.**

## 💡 Motivation

A trained language model computes arithmetic somewhere inside its weights, but we cannot point to *where*, cannot check that the computation is correct, and cannot replace it without side effects. This project asks whether a learned sub-computation can be **localised, characterised, and swapped for an exact external module at inference time** — turning an opaque learned program into an explicit one.

The safety motivation is the substitution step. Editing a model is only safe if you know what else you break. Current circuit-level interpretability localises behaviour to **nodes** (heads, MLPs), but nodes are heavily shared across tasks — roughly 78% cross-task head overlap has been reported for related tasks. If the unit of intervention is that entangled, any edit is collateral damage waiting to happen.

## 🧩 The hypothesis

The claim under test is that the right unit is not the node but the **direction**: that number-value features live in a low-dimensional subspace which is far more task-**exclusive** than the components carrying it, and that this exclusivity is measurable. If it holds, direction-level exclusivity becomes a *safety criterion for model editing* — a way to certify in advance that replacing a computation will not disturb tasks that share the same weights.

## 🔬 Method

Three stages, each gated on the previous one:

1. **Identification** — circuit discovery via Edge Pruning, validated against **Tracr** programs where the ground-truth circuit is known by construction, before being trusted on a real language model.
2. **Feature tracking** — dual-site sparse autoencoders (MLP and attention outputs) at the layers where the arithmetic prior art places the build region, recovering the number subspace by clustering rather than hunting a single direction.
3. **Substitution** — intercept at the read site, compute the answer with an exact external module, inject back into the subspace at the write site. The native weights stay in place; the swap happens at inference.

Models: **GPT-J** and **Llama-3-8B**, frozen, few-shot. Operations span a clean core (addition, subtraction, comparison) and a deliberate stress set (multiplication, integer division, modular arithmetic) chosen because a clean operand subspace may *not* exist there.

## 📊 Where it stands

Week-1 work established feature-level ground truth: reproducing the reported **helical and Fourier structure** of number representations on both models, across six operations and three prompt framings each, at the operand and answer sites.

What that established, stated carefully:

- Helix-versus-baseline reconstruction is **one-sided evidence**. A helix that strictly beats a capacity-matched polynomial indicates periodic structure is present; a helix that ties tells you nothing either way. Earlier framings of this result overclaimed and were rewritten.
- Three independent lenses — helix fit quality, residual-stream Fourier spectra, and logit-attribution spectra — agree operation-for-operation on which tasks carry clean periodic structure. Convergent, and still weak: all three are phase-blind or non-causal.
- Periodicity is carried by **MLP outputs**; attention outputs look like transport rather than computation.
- A dissociation worth chasing: on at least one model, modular arithmetic shows clear periodic structure while accuracy sits at the floor. Representation present, competence absent.

None of this is yet a causal claim. The next gate is denoising-based causal validation — inject the clean subspace into a corrupted run and measure restoration — which is what decides whether any of the above describes the mechanism or only the geometry.

## 🔗 Code

Experiment code, run protocol and per-run log: [**N2P-Experiments**](https://github.com/galaxy532/N2P-Experiments). Every run writes an immutable results directory and appends one line to the run log; the repository README documents the pipeline and conventions.
