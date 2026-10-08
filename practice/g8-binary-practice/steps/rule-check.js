import {guidedSelect} from '../step-patterns.js?v=section-counts-14';
export const step = guidedSelect({
  "id": "rule-check",
  "title": "Check the reading rule",
  "short": "Check the reading rule",
  "instruction": "Use the powers of 2 in the table.",
  "table": {
    "caption": "Binary 1000",
    "columns": [
      "Binary digit",
      "1",
      "0",
      "0",
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
        "2^3 = 8",
        "2^2 = 4",
        "2^1 = 2",
        "2^0 = 1"
      ],
      [
        "Multiply",
        "1 × 2^3",
        "0 × 2^2",
        "0 × 2^1",
        "0 × 2^0"
      ]
    ]
  },
  "question": "What is the first 1 in binary 1000 worth?",
  "options": [
    "1",
    "8",
    "1000"
  ],
  "answer": "8",
  "hint": "Read the value above the leftmost bit."
});
