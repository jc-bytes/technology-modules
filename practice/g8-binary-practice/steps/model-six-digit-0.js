import {exampleStep} from '../step-patterns.js?v=binary-copy-17';
export const step=exampleStep({
  "id": "model-six-digit-0-v1",
  "title": "3. Multiply the rightmost digit",
  "short": "3. Multiply the rightmost digit",
  "explanation": "Look at the highlighted column. We are using this bit of 0110.",
  "source": "Position 0 uses 2^0. That power equals 1.",
  "action": "Multiply the binary digit 0 by 1.",
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
    "highlightColumn": 4
  },
  "takeaway": "0 × 2^0 = 0 × 1 = 0. Keep the result 0.",
  "tableFirst": true
});
