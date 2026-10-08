import {explanationStep} from '../step-patterns.js?v=power-practice-15';
export const step = explanationStep({
  "id": "explain-zeros",
  "title": "Explain starting zeros",
  "short": "Explain starting zeros",
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
  "question": "Why does 0011 have the same binary value as 11? Use place values.",
  "fieldId": "explain-zeros-v1",
  "help": "Use this frame: The starting zeros add __. Both numbers use __ and __, so both equal __."
});
