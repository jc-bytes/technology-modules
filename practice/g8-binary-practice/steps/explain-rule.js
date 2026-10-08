import {explanationStep} from '../step-patterns.js?v=binary-width-16';
export const step = explanationStep({
  "id": "explain-rule",
  "title": "Explain the rule",
  "short": "Explain the rule",
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
      ]
    ]
  },
  "question": "Why must we agree on the place values before reading 1000?",
  "fieldId": "explain-rule-v1",
  "help": "Use this frame: In binary, 1000 means __ because __. In decimal, it means __."
});
