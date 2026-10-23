export const understandV2 = {
  "id": "understandV2",
  "title": "Check what deliver does",
  "short": "Check deliver",
  "kind": "choice",
  "stage": "guided",
  "items": [
    {
      "title": "One reusable action",
      "question": "What happens when the small deliver block runs once?",
      "options": [
        "The package moves to the next house, counts one delivery and pauses.",
        "The program creates another house.",
        "The program finishes all three deliveries at once."
      ],
      "answer": 0,
      "retry": "Look at the three instructions below define deliver: move, count, wait."
    }
  ],
  "pdf": {
    "prompt": "What happens when the small deliver block runs once?",
    "items": [
      {
        "type": "response",
        "label": "One call of deliver",
        "source": {
          "kind": "choice",
          "index": 0
        }
      }
    ]
  }
};
