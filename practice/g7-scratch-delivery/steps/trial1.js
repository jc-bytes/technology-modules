export const trial1 = {
  "id": "trial1",
  "title": "Test repeat 1",
  "short": "Test repeat 1",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Set <strong>repeat 1</strong>. Keep movement at <strong>30</strong>.</p><ol><li>Predict x and deliveries, starting from x = \u2212120.</li><li>Click the green flag.</li><li>Read x and deliveries. Record your results below.</li></ol>",
  "fields": [
    {
      "name": "result",
      "label": "Record your repeat 1 prediction and actual results.",
      "type": "textarea",
      "help": "Predicted x = \u2026; actual x = \u2026; predicted deliveries = \u2026; actual deliveries = \u2026."
    }
  ],
  "pdf": {
    "prompt": "Set repeat 1 . Keep movement at 30 . Predict x and deliveries, starting from x = \u2212120. Click the green flag. Read x and deliveries. Record your results below. Record your repeat 1 prediction and actual results.",
    "items": [
      {
        "type": "response",
        "label": "Record your repeat 1 prediction and actual results.",
        "source": {
          "kind": "field",
          "name": "result"
        }
      }
    ]
  }
};
