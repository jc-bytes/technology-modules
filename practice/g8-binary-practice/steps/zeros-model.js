import {exampleStep} from '../step-patterns.js?v=binary-copy-17';
export const step = exampleStep({
  "id": "zeros-model",
  "title": "Zeros at the start",
  "short": "Zeros at the start",
  "explanation": "Adding zeros at the start does not change a binary number. Binary 11 and binary 0011 both mean 3.",
  "source": "Each starting zero adds 0 because 0 × any number = 0.",
  "action": "Multiply each digit by its power of 2. Add the results.",
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
      ],
      [
        "Result",
        "0",
        "0",
        "2",
        "1"
      ]
    ]
  },
  "takeaway": "0 + 0 + 2 + 1 = 3. The starting zeros add nothing."
});
