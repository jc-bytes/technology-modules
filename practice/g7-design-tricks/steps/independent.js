import { choiceStep } from '../step-patterns.js?v=1.0.0';
export const independent = choiceStep({
  "id": "notification-choice",
  "title": "An alert interrupts work",
  "short": "Notifications",
  "activityTitle": "Notifications",
  "table": {
    "caption": "Fictional app example",
    "columns": [
      "App example"
    ],
    "rows": [
      [
        "During homework, PuzzlePop sends an alert about a new reward. Ana wants to finish her work first."
      ]
    ]
  },
  "question": "Which choice helps Ana focus on her work?",
  "options": [
    "Open every reward alert immediately",
    "Turn off nonessential game alerts",
    "Increase the alert volume"
  ],
  "answer": 1,
  "hint": "The reward can wait. Choose what reduces the interruption.",
  "stage": "independent"
});
