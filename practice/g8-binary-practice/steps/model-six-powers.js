import {exampleStep} from '../step-patterns.js?v=section-counts-14';
export const step=exampleStep({
  "id": "model-six-powers-v1",
  "title": "2. Work out the powers",
  "short": "2. Work out the powers",
  "explanation": "The small raised number is called an exponent. In 2^3, the 3 means multiply three 2s: 2 × 2 × 2.",
  "source": "Start with 2^0 = 1. Each time you move one position left, double the value: 1, 2, 4, 8.",
  "action": "Match each position to its power of 2.",
  "table": {
    "caption": "Turn position numbers into values",
    "columns": [
      "Position",
      "Power of 2",
      "Value"
    ],
    "rows": [
      [
        "0, far right",
        "2^0 = 1",
        "1"
      ],
      [
        "1",
        "2^1 = 2",
        "2"
      ],
      [
        "2",
        "2^2 = 2 × 2",
        "4"
      ],
      [
        "3, far left",
        "2^3 = 2 × 2 × 2",
        "8"
      ]
    ]
  },
  "takeaway": "Next, multiply each binary digit by the value of its power."
});
