import {exampleStep} from '../step-patterns.js?v=power-practice-15';
export const step=exampleStep({
  "id": "model-six",
  "title": "1. Number the positions",
  "short": "1. Number the positions",
  "explanation": "Change binary 0110 into a decimal number. First, number the positions.",
  "source": "Start at the right with position 0. Move left: 1, 2, 3.",
  "action": "Look at the position under each digit.",
  "table": {
    "caption": "Binary 0110",
    "columns": [
      "Binary digit",
      "0",
      "1",
      "1",
      "0"
    ],
    "rows": [
      [
        "Position",
        "3",
        "2",
        "1",
        "0"
      ]
    ]
  },
  "takeaway": "The digit on the far right is at position 0."
});
