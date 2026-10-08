import {exampleStep} from '../step-patterns.js?v=power-practice-15';
export const step=exampleStep({
  "id": "model-six-digit-1-v1",
  "title": "4. Multiply the next digit to the left",
  "short": "4. Multiply the next digit to the left",
  "explanation": "Look at the highlighted column. We are using this bit of 0110.",
  "source": "Position 1 uses 2^1. That power equals 2.",
  "action": "Multiply the binary digit 1 by 2.",
  "table": {
    "caption": "Binary 0110 — use the highlighted column",
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
      ],
      [
        "Power",
        "2^3",
        "2^2",
        "2^1",
        "2^0"
      ]
    ],
    "highlightColumn": 3
  },
  "takeaway": "1 × 2^1 = 1 × 2 = 2. Keep the result 2.",
  "tableFirst": true
});
