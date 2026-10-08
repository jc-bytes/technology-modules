import {guidedSelect} from '../step-patterns.js?v=binary-width-16';
export const step = guidedSelect({
  "id": "guided-five-answer",
  "title": "Add the results for 0101",
  "short": "Add the results for 0101",
  "instruction": "Add the results of the four multiplications.",
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
  "question": "What decimal number is 0101?",
  "options": [
    "4",
    "5",
    "9"
  ],
  "answer": "5",
  "hint": "Work out each multiplication, then add the results."
});
