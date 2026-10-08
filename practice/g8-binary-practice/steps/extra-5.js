import {conversion} from './conversion-pattern.js?v=binary-width-16';
export const step = conversion({
  "id": "extra-5",
  "given": "5",
  "binary": true,
  "sum": "0 + 4 + 0 + 1",
  "options": [
    "0 + 4 + 0 + 1",
    "0 + 4 + 2 + 0",
    "8 + 0 + 0 + 1"
  ],
  "hint": "Line up 8, 4, 2, 1. Use only the places marked 1. Write 0 if no places are used.",
  "extra": true
});
