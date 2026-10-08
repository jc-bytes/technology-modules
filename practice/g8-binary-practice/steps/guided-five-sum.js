import {guidedSelect} from '../step-patterns.js?v=section-counts-14';
export const step = guidedSelect({
  "id": "guided-five-sum",
  "title": "Multiply the digits in 0101",
  "short": "Multiply the digits in 0101",
  "instruction": "Change binary 0101 into decimal. Work out each multiplication in the table. Zeros add nothing.",
  "table": {
    "caption": "Binary 0101",
    "columns": [
      "Binary digit",
      "0",
      "1",
      "0",
      "1"
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
        "2^3 = 8",
        "2^2 = 4",
        "2^1 = 2",
        "2^0 = 1"
      ],
      [
        "Multiply",
        "0 × 2^3",
        "1 × 2^2",
        "0 × 2^1",
        "1 × 2^0"
      ]
    ]
  },
  "question": "Which sum does 0101 show?",
  "options": [
    "8 + 0 + 2 + 0",
    "0 + 4 + 0 + 1",
    "0 + 4 + 2 + 0"
  ],
  "answer": "0 + 4 + 0 + 1",
  "hint": "Use the Power row to work out each multiplication. Then choose the addition."
});
