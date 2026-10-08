import {conversion} from './conversion-pattern.js?v=power-practice-15';
export const step = conversion({
  "id": "practice-seven",
  "given": "0111",
  "binary": false,
  "sum": "0 + 4 + 2 + 1",
  "options": [
    "8 + 4 + 2 + 0",
    "0 + 4 + 2 + 1",
    "0 + 0 + 2 + 1"
  ],
  "hint": "Use the position as the exponent. Work out each power, multiply by its digit, then add."
});
