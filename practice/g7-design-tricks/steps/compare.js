import { choiceStep } from '../step-patterns.js?v=1.0.0';
export const compare = choiceStep({
  "id": "scroll-choice",
  "title": "More posts keep appearing",
  "short": "Endless scrolling",
  "activityTitle": "Endless scrolling",
  "table": {
    "caption": "Fictional app example",
    "columns": [
      "App example"
    ],
    "rows": [
      [
        "On PostRiver, new posts appear whenever Leo reaches the bottom. He wants a clear stopping point."
      ]
    ]
  },
  "question": "Which plan gives Leo a stopping point?",
  "options": [
    "Keep scrolling until there are no posts",
    "Choose five posts, then close the app",
    "Refresh the page for more posts"
  ],
  "answer": 1,
  "hint": "Endless scrolling may not have a bottom. Choose a limit Leo can control.",
  "stage": "practice"
});
