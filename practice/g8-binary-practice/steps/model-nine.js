import {exampleStep} from '../step-patterns.js?v=power-practice-15';
export const step=exampleStep({
  "id": "model-nine",
  "title": "Convert decimal 9 to binary",
  "short": "Divide by 2",
  "explanation": "Try another number. Change decimal 9 into binary.",
  "source": "After each division, use the whole-number answer in the next row.",
  "action": "Divide until the whole-number answer is 0.",
  "table": {
    "caption": "The complete process for decimal 9",
    "columns": [
      "Complete division",
      "Save this remainder"
    ],
    "rows": [
      [
        "9 ÷ 2 = 4 remainder 1",
        "1"
      ],
      [
        "4 ÷ 2 = 2 remainder 0",
        "0"
      ],
      [
        "2 ÷ 2 = 1 remainder 0",
        "0"
      ],
      [
        "1 ÷ 2 = 0 remainder 1",
        "1"
      ]
    ]
  },
  "takeaway": "Read the remainders from bottom to top: 1, 0, 0, 1. Decimal 9 = binary 1001."
});
