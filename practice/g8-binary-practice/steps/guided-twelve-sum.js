import {guidedSelect} from '../step-patterns.js?v=binary-width-16';
export const step = guidedSelect({
  "id": "guided-twelve-sum",
  "title": "Check binary 1100",
  "short": "Check 12",
  "instruction": "Change binary 1100 back to decimal. Multiply each digit by its power of 2. Add the results.",
  "table": {
    "caption": "Binary 1100",
    "columns": [
      "Binary digit",
      "1",
      "1",
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
        "1 × 2^2",
        "0 × 2^1",
        "0 × 2^0"
      ]
    ]
  },
  "question": "Which sum makes 12?",
  "options": [
    "8 + 4 + 0 + 0",
    "8 + 0 + 2 + 0",
    "0 + 4 + 2 + 1"
  ],
  "answer": "8 + 4 + 0 + 0",
  "hint": "Work out each multiplication in the table. Zeros add nothing."
});
