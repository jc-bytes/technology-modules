import {guidedSelect} from '../step-patterns.js?v=binary-copy-17';
export const step = guidedSelect({
  "id": "zeros-check",
  "title": "Check starting zeros",
  "short": "Check starting zeros",
  "instruction": "Multiplying by 0 gives 0.",
  "table": {
    "caption": "Binary 0011",
    "columns": [
      "Binary digit",
      "0",
      "0",
      "1",
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
        "0 × 2^2",
        "1 × 2^1",
        "1 × 2^0"
      ]
    ]
  },
  "question": "How much do the starting zeros in 0011 add?",
  "options": [
    "0",
    "4",
    "8"
  ],
  "answer": "0",
  "hint": "A 0 adds zero, even in the 8 or 4 place."
});
