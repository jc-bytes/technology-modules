export const routeB = {
  "id": "routeB",
  "title": "Test Route B",
  "short": "Test Route B",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Use <strong>deliver (50)</strong> inside <strong>repeat 3</strong>. Keep the same definition.</p><ol><li>Predict final x and deliveries from x = \u2212120.</li><li>Click the green flag.</li><li>Read and record the actual values.</li></ol>",
  "fields": [
    {
      "name": "route_result",
      "label": "Record your Route B prediction and actual results.",
      "type": "textarea",
      "help": "Predicted x = \u2026; actual x = \u2026; predicted deliveries = \u2026; actual deliveries = \u2026."
    }
  ],
  "pdf": {
    "prompt": "Use deliver (50) inside repeat 3 . Keep the same definition. Predict final x and deliveries from x = \u2212120. Click the green flag. Read and record the actual values. Record your Route B prediction and actual results.",
    "items": [
      {
        "type": "response",
        "label": "Record your Route B prediction and actual results.",
        "source": {
          "kind": "field",
          "name": "route_result"
        }
      }
    ]
  }
};
