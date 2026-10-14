import { choiceStep } from '../step-patterns.js?v=1.0.0';
export const guided = choiceStep({
  "id": "autoplay-choice",
  "title": "A video starts by itself",
  "short": "Autoplay",
  "activityTitle": "Autoplay",
  "table": {
    "caption": "Fictional app example",
    "columns": [
      "App example"
    ],
    "rows": [
      [
        "ClipNest starts another video without asking. Mia wanted to watch one video."
      ]
    ]
  },
  "question": "Which change gives Mia control over the next video?",
  "options": [
    "Turn autoplay off",
    "Turn the volume up",
    "Make the picture brighter"
  ],
  "answer": 0,
  "hint": "Choose the setting that stops the next video from starting by itself.",
  "stage": "guided"
});
