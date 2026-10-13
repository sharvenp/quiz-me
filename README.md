# Quiz Me

![Quiz Me logo](public/quiz-me-logo.svg)

A small, phone-first flashcard quiz app. Quiz data lives in `data/quizzes.json` and follows the requested question schema inside each quiz's `questions` object.

## Run locally

```bash
npm install
npm run dev
```

## Publish to GitHub Pages

The repository is configured for `sharvenp/quiz-me`. After authenticating with GitHub, run:

```bash
npm run deploy
```

This builds the app and publishes `dist` to the `gh-pages` branch.

## Disclaimer

This project was generated with GitHub Copilot as a lightweight browser-based flashcard quiz utility. It is provided for educational and creative use only.

The tool is intended to help users practice recall with randomized multiple-choice questions. It does not guarantee accurate, complete, or professionally validated learning content. Results may vary depending on the quiz data provided by the user.

Users are responsible for reviewing the quiz content before using it for academic, professional, commercial, or publication workflows. This project is distributed as-is, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement.