export const testV2 = {
  "id": "testV2",
  "title": "Predict, run and check",
  "short": "Test three deliveries",
  "kind": "form",
  "stage": "independent",
  "allFields": true,
  "intro": "<p>Keep <strong>repeat 3</strong> and movement <strong>40</strong>.</p><p>Fill the two <strong>Before running</strong> boxes. Click the green flag in Scratch. Then read the x box and counter and fill the two <strong>After running</strong> boxes.</p><p>Look for three visible stops, ending at <strong>House 3</strong>. Keep your first predictions, even if they differ.</p>",
  "fields": [
    {
      "name": "predicted_x",
      "label": "Before running: predicted final x",
      "type": "number"
    },
    {
      "name": "predicted_deliveries",
      "label": "Before running: predicted deliveries",
      "type": "number"
    },
    {
      "name": "actual_x",
      "label": "After running: actual final x",
      "type": "number"
    },
    {
      "name": "actual_deliveries",
      "label": "After running: actual deliveries",
      "type": "number"
    }
  ],
  "pdf": {
    "prompt": "From Start x \u2212120, y 0, repeat deliver three times. Each delivery moves x by 40, adds one delivery and waits one second. Record predictions before running and actual numbers after running.",
    "items": [
      {
        "type": "response",
        "label": "Before running: predicted final x",
        "source": {
          "kind": "field",
          "name": "predicted_x"
        }
      },
      {
        "type": "response",
        "label": "Before running: predicted deliveries",
        "source": {
          "kind": "field",
          "name": "predicted_deliveries"
        }
      },
      {
        "type": "response",
        "label": "After running: actual final x",
        "source": {
          "kind": "field",
          "name": "actual_x"
        }
      },
      {
        "type": "response",
        "label": "After running: actual deliveries",
        "source": {
          "kind": "field",
          "name": "actual_deliveries"
        }
      }
    ]
  }
};
