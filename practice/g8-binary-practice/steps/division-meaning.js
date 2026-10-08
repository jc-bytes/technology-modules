import {exampleStep} from '../step-patterns.js?v=power-practice-15';
export const step=exampleStep({
  "id": "division-meaning",
  "title": "Convert decimal 13 to binary",
  "short": "Full division process",
  "explanation": "Change decimal 13 into binary. Divide by 2. Use the whole-number answer in the next division. Repeat until that answer is 0.",
  "source": "13 ÷ 2 = 6 remainder 1 means six groups of 2, with 1 left over. The whole-number answer, 6, is the quotient. The leftover 1 is the remainder.",
  "action": "Follow every row. Save each remainder.",
  "table": {
    "caption": "Every division needed to convert decimal 13",
    "columns": [
      "Division",
      "What happens next?"
    ],
    "rows": [
      [
        "13 ÷ 2 = 6 remainder 1",
        "Save 1. Divide 6 by 2 next."
      ],
      [
        "6 ÷ 2 = 3 remainder 0",
        "Save 0. Divide 3 by 2 next."
      ],
      [
        "3 ÷ 2 = 1 remainder 1",
        "Save 1. Divide 1 by 2 next."
      ],
      [
        "1 ÷ 2 = 0 remainder 1",
        "Save 1. Stop because the answer is 0."
      ]
    ]
  },
  "takeaway": "Read the remainder column from bottom to top: 1, 1, 0, 1. Put those digits together. Decimal 13 = binary 1101."
});
