import {exampleStep} from '../step-patterns.js?v=binary-width-16';
export const step = exampleStep({
  "id": "rule-model",
  "title": "Say binary or decimal",
  "short": "Binary or decimal",
  "explanation": "The digits 1000 can mean two different numbers. Decimal 1000 is one thousand. Binary 1000 is 8.",
  "source": "In binary 1000, the 1 is at position 3. Its power is 2^3 = 8.",
  "action": "Multiply each digit by its power of 2. Add the results.",
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
      ],
      [
        "Result",
        "8",
        "0",
        "0",
        "0"
      ]
    ]
  },
  "takeaway": "8 + 0 + 0 + 0 = 8. Say \"binary 1000\" so the reader knows which rules to use."
});
