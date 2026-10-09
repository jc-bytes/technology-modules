export const correct = {
  "id": "correct",
  "title": "Correct and retest",
  "short": "Correct and retest",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Fix one error and repeat its test.</p><p>If all tests agree with your predictions, run repeat 3 again to check.</p><details><summary>Need help?</summary><p>Check the reset values, the deliver call inside repeat, and both instructions inside define deliver.</p></details>",
  "fields": [
    {
      "name": "retest",
      "label": "Which test did you repeat, what did you check or fix, and what result did you get?",
      "type": "textarea",
      "help": "Name the repeat count, your check or correction, and the final x and deliveries."
    }
  ],
  "pdf": {
    "prompt": "Fix one error and repeat its test. If all tests agree with your predictions, run repeat 3 again to check. Need help? Check the reset values, the deliver call inside repeat, and both instructions inside define deliver. Which test did you repeat, what did you check or fix, and what result did you get?",
    "items": [
      {
        "type": "response",
        "label": "Which test did you repeat, what did you check or fix, and what result did you get?",
        "source": {
          "kind": "field",
          "name": "retest"
        }
      }
    ]
  }
};
