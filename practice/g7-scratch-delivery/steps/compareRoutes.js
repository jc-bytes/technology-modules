export const compareRoutes = {
  "id": "compareRoutes",
  "title": "Compare your routes",
  "short": "Compare your routes",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Route A uses three 20-step deliveries. Route B uses three 50-step deliveries.</p><p>Use your test results to explain how the same definition runs both routes.</p>",
  "fields": [
    {
      "name": "route_explanation",
      "label": "How did distance change the final x, and why did both routes count three deliveries?",
      "type": "textarea",
      "help": "I changed the call from \u2026 to \u2026. Final x changed from \u2026 to \u2026. Both count three because \u2026."
    }
  ],
  "pdf": {
    "prompt": "Route A uses three 20-step deliveries. Route B uses three 50-step deliveries. Use your test results to explain how the same definition runs both routes. How did distance change the final x, and why did both routes count three deliveries?",
    "items": [
      {
        "type": "response",
        "label": "How did distance change the final x, and why did both routes count three deliveries?",
        "source": {
          "kind": "field",
          "name": "route_explanation"
        }
      }
    ]
  }
};
