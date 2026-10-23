export const inputRun = {
  "id": "inputRun",
  "title": "Test the distance input",
  "short": "Test the distance input",
  "kind": "form",
  "stage": "guided",
  "intro": "<p>Click the green flag. With <strong>deliver (20)</strong> inside <strong>repeat 2</strong>, expect x = \u221280 and deliveries = 2.</p><details><summary>Need help?</summary><p>If the move is still 30, replace the fixed number in change x by with the oval distance.</p><p>Check that the call says deliver 20 and both reset values are unchanged.</p></details>",
  "fields": [
    {
      "name": "input_result",
      "label": "What actual x and deliveries did Scratch show with the distance input?",
      "type": "textarea",
      "help": "Actual x = \u2026; deliveries = \u2026."
    }
  ],
  "pdf": {
    "prompt": "Click the green flag. With deliver (20) inside repeat 2 , expect x = \u221280 and deliveries = 2. Need help? If the move is still 30, replace the fixed number in change x by with the oval distance. Check that the call says deliver 20 and both reset values are unchanged. What actual x and deliveries did Scratch show with the distance input?",
    "items": [
      {
        "type": "response",
        "label": "What actual x and deliveries did Scratch show with the distance input?",
        "source": {
          "kind": "field",
          "name": "input_result"
        }
      }
    ]
  }
};
