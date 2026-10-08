import {exampleStep} from '../step-patterns.js?v=binary-width-16';
export const step=exampleStep({
  "id": "model-six-add-v1",
  "title": "7. Add the results",
  "short": "7. Add the results",
  "explanation": "We have multiplied all four digits in binary 0110. Now add their results.",
  "source": "The results are 0, 4, 2 and 0, written in the same order as the original digits.",
  "action": "Add: 0 + 4 + 2 + 0.",
  "table": {
    "caption": "All four bits of binary 0110",
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
      ],
      [
        "Multiply",
        "0 × 2^3",
        "1 × 2^2",
        "1 × 2^1",
        "0 × 2^0"
      ],
      [
        "Result",
        "0",
        "4",
        "2",
        "0"
      ]
    ]
  },
  "takeaway": "0 + 4 + 2 + 0 = 6. Binary 0110 = decimal 6.",
  "tableFirst": true
});
