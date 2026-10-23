export const explain = {
  "id": "explain",
  "title": "Explain your program",
  "short": "Explain your program",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Use your repeat 3 results to explain the two blocks.</p>",
  "fields": [
    {
      "name": "explanation",
      "label": "What does deliver do, and what does repeat 3 do?",
      "type": "textarea",
      "help": "Use your actual x and deliveries as evidence."
    }
  ],
  "pdf": {
    "prompt": "Use your repeat 3 results to explain the two blocks. What does deliver do, and what does repeat 3 do?",
    "items": [
      {
        "type": "response",
        "label": "What does deliver do, and what does repeat 3 do?",
        "source": {
          "kind": "field",
          "name": "explanation"
        }
      }
    ]
  }
};
