---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
title: Reinforcement Learning for Chess
subtitle: Personal Coding Project, 2021
gallery: chess-gallery
menubar_toc: true
hero_compact: true
sidebar_docs_label: "📘 Resources"
sidebar_docs:
  - label: "GITHUB"
    url: https://github.com/Aser97/Chess.git
    thumb: /assets/thumbnails/github_thumb.svg
  - label: "SARSA"
    url: https://arxiv.org/pdf/1902.02234
    thumb: /assets/thumbnails/SARSA_thumbnail.PNG
  - label: "RL VIA MONTE CARLO"
    url: https://arxiv.org/pdf/2206.12674
    thumb: /assets/thumbnails/MC_thumbnail.PNG
---


This project implements SARSA and Monte Carlo reinforcement learning algorithms to approximate an optimal policy for playing chess against an opponent.

## 🐙 Project Details
This project comes with a ready-to-run executable, primarily developed for **macOs** in C++, but it should be compatible with any **Unix**-based system.
The full code is on my [Github Repository](https://github.com/Aser97/Chess.git)

#### Available Gameplay Modes
Upon running the executable, you can choose from the following options:

- **Play as White**: Face the AI while controlling the white pieces
- **Play as Black**: Face the AI while controlling the black pieces
- **Play Stockfish as White**: Play against Stockfish while controlling the white pieces
- **Play Stockfish as Black**: Play against Stockfish while controlling the black pieces

#### 🧩Handling New Positions
The AI utilizes Zobrist hashing to encode board positions efficiently. When encountering an unfamiliar position, it simulates multiple games against Stockfish to analyze the position and determine the best move. This process may cause a slight delay before making a move, particularly in novel board states

## 📊 Results
The AI model that I trained reached an Elo rating of 1350 in one hour.
