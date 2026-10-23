export const explainV2 = {
  "id": "explainV2",
  "title": "Explain your two scripts",
  "short": "Explain",
  "kind": "form",
  "stage": "independent",
  "intro": "<p>Point to <strong>define deliver</strong>, then to <strong>repeat 3</strong> in your Scratch project.</p>",
  "fields": [
    {
      "name": "two_scripts_explanation",
      "label": "What does deliver do, and what does repeat 3 do?",
      "type": "textarea",
      "rows": 3,
      "help": "My deliver block ___. The repeat loop ___.",
      "starter": "My deliver block ___. The repeat loop ___.",
      "plainLanguage": "Explain one delivery and why it happens three times."
    }
  ],
  "pdf": {
    "prompt": "Explain the separate jobs of define deliver and repeat 3.",
    "items": [
      {
        "type": "response",
        "label": "My explanation",
        "source": {
          "kind": "field",
          "name": "two_scripts_explanation"
        }
      }
    ]
  }
};
