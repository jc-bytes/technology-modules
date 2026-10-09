export const run = {
  "id": "run",
  "title": "Test the example",
  "short": "Test the example",
  "kind": "form",
  "stage": "guided",
  "intro": "<p>Click the green flag. With movement <strong>40</strong> and repeat <strong>2</strong>, expect <strong>x = \u221240</strong> and <strong>deliveries = 2</strong>.</p><details><summary>Need help?</summary><p>Count stays at 0? Check change deliveries by 1 inside define deliver.</p><p>Nothing moves? Put the small deliver block inside repeat.</p></details>",
  "fields": [
    {
      "name": "guided_result",
      "label": "What actual x and deliveries did Scratch show?",
      "type": "textarea",
      "help": "Write: Actual x = \u2026; deliveries = \u2026."
    }
  ],
  "pdf": {
    "prompt": "Click the green flag. With movement 40 and repeat 2 , expect x = \u221240 and deliveries = 2 . Need help? Count stays at 0? Check change deliveries by 1 inside define deliver. Nothing moves? Put the small deliver block inside repeat. What actual x and deliveries did Scratch show?",
    "items": [
      {
        "type": "response",
        "label": "What actual x and deliveries did Scratch show?",
        "source": {
          "kind": "field",
          "name": "guided_result"
        }
      }
    ]
  }
};
