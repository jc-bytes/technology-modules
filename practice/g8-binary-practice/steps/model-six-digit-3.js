import {exampleStep} from '../step-patterns.js?v=power-practice-15';
export const step=exampleStep({
  "id": "model-six-digit-3-v1",
  "title": "6. Multiply the leftmost digit",
  "short": "6. Multiply the leftmost digit",
  "explanation": "Look at the highlighted column. We are using this bit of 0110.",
  "source": "Position 3 uses 2^3. That power equals 8.",
  "action": "Multiply the binary digit 0 by 8.",
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
    "highlightColumn": 1
  },
  "takeaway": "0 × 2^3 = 0 × 8 = 0. Keep the result 0.",
  "tableFirst": true
});
