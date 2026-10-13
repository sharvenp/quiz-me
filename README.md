# Quiz Me

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