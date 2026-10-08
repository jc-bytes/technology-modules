import {exampleStep} from '../step-patterns.js?v=section-counts-14';
export const step=exampleStep({
  "id": "model-six-digit-2-v1",
  "title": "5. Multiply the next digit to the left",
  "short": "5. Multiply the next digit to the left",
  "explanation": "Look at the highlighted column. We are using this bit of 0110.",
  "source": "Position 2 uses 2^2. That power equals 4.",
  "action": "Multiply the binary digit 1 by 4.",
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
    "highlightColumn": 2
  },
  "takeaway": "1 × 2^2 = 1 × 4 = 4. Keep the result 4.",
  "tableFirst": true
});
