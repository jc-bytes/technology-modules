import {site} from './site.js';
export const lesson={...site,sections:[
  {
    "id": "start",
    "title": "Binary conversion check",
    "short": "Start",
    "kind": "html",
    "html": "<p>30 minutes. 24 points.</p><p>Change two decimal numbers into binary. Change two binary numbers into decimal. Then answer four short questions about the steps.</p><p>Work on your own. Use this page only. Do not use a calculator, AI, notes, or the practice website.</p><p>Show your steps in the tables. Write short answers in English. A few words are enough.</p><p>Your work saves in this browser. At the end, download your PDF and submit it to Binary conversion check in Google Classroom.</p>"
  },
  {
    "id": "q1",
    "title": "1. Change decimal 6 into binary",
    "short": "Question 1",
    "kind": "form",
    "assessment": true,
    "summary": "4 points. Complete the division table. Write the binary number below.",
    "fields": [
      {
        "name": "q0",
        "label": "Row 1 whole-number answer",
        "type": "text"
      },
      {
        "name": "r0",
        "label": "Row 1 remainder",
        "type": "text"
      },
      {
        "name": "n1",
        "label": "Row 2 starting number",
        "type": "text"
      },
      {
        "name": "q1",
        "label": "Row 2 whole-number answer",
        "type": "text"
      },
      {
        "name": "r1",
        "label": "Row 2 remainder",
        "type": "text"
      },
      {
        "name": "n2",
        "label": "Row 3 starting number",
        "type": "text"
      },
      {
        "name": "q2",
        "label": "Row 3 whole-number answer",
        "type": "text"
      },
      {
        "name": "r2",
        "label": "Row 3 remainder",
        "type": "text"
      },
      {
        "name": "binary",
        "label": "Completed binary number",
        "type": "text"
      }
    ],
    "answerTable": {
      "columns": [
        "Start",
        "Divide",
        "Answer",
        "Remainder"
      ],
      "rows": [
        [
          "6",
          "÷ 2 =",
          {
            "field": "q0"
          },
          {
            "field": "r0"
          }
        ],
        [
          {
            "field": "n1"
          },
          "÷ 2 =",
          {
            "field": "q1"
          },
          {
            "field": "r1"
          }
        ],
        [
          {
            "field": "n2"
          },
          "÷ 2 =",
          {
            "field": "q2"
          },
          {
            "field": "r2"
          }
        ]
      ]
    },
    "tailFields": [
      "binary"
    ],
    "pdf": {
      "prompt": "Convert decimal 6 into binary. Show every division and remainder.",
      "visual": {
        "type": "table",
        "caption": "Decimal 6",
        "columns": [
          "Start",
          "Divide",
          "Answer",
          "Remainder"
        ],
        "rows": [
          [
            "6",
            "÷ 2 =",
            "___",
            "___"
          ],
          [
            "___",
            "÷ 2 =",
            "___",
            "___"
          ],
          [
            "___",
            "÷ 2 =",
            "___",
            "___"
          ]
        ]
      }
    }
  },
  {
    "id": "q2",
    "title": "2. Change decimal 11 into binary",
    "short": "Question 2",
    "kind": "form",
    "assessment": true,
    "summary": "4 points. Complete the division table. Write the binary number below.",
    "fields": [
      {
        "name": "q0",
        "label": "Row 1 whole-number answer",
        "type": "text"
      },
      {
        "name": "r0",
        "label": "Row 1 remainder",
        "type": "text"
      },
      {
        "name": "n1",
        "label": "Row 2 starting number",
        "type": "text"
      },
      {
        "name": "q1",
        "label": "Row 2 whole-number answer",
        "type": "text"
      },
      {
        "name": "r1",
        "label": "Row 2 remainder",
        "type": "text"
      },
      {
        "name": "n2",
        "label": "Row 3 starting number",
        "type": "text"
      },
      {
        "name": "q2",
        "label": "Row 3 whole-number answer",
        "type": "text"
      },
      {
        "name": "r2",
        "label": "Row 3 remainder",
        "type": "text"
      },
      {
        "name": "n3",
        "label": "Row 4 starting number",
        "type": "text"
      },
      {
        "name": "q3",
        "label": "Row 4 whole-number answer",
        "type": "text"
      },
      {
        "name": "r3",
        "label": "Row 4 remainder",
        "type": "text"
      },
      {
        "name": "binary",
        "label": "Completed binary number",
        "type": "text"
      }
    ],
    "answerTable": {
      "columns": [
        "Start",
        "Divide",
        "Answer",
        "Remainder"
      ],
      "rows": [
        [
          "11",
          "÷ 2 =",
          {
            "field": "q0"
          },
          {
            "field": "r0"
          }
        ],
        [
          {
            "field": "n1"
          },
          "÷ 2 =",
          {
            "field": "q1"
          },
          {
            "field": "r1"
          }
        ],
        [
          {
            "field": "n2"
          },
          "÷ 2 =",
          {
            "field": "q2"
          },
          {
            "field": "r2"
          }
        ],
        [
          {
            "field": "n3"
          },
          "÷ 2 =",
          {
            "field": "q3"
          },
          {
            "field": "r3"
          }
        ]
      ]
    },
    "tailFields": [
      "binary"
    ],
    "pdf": {
      "prompt": "Convert decimal 11 into binary. Show every division and remainder.",
      "visual": {
        "type": "table",
        "caption": "Decimal 11",
        "columns": [
          "Start",
          "Divide",
          "Answer",
          "Remainder"
        ],
        "rows": [
          [
            "11",
            "÷ 2 =",
            "___",
            "___"
          ],
          [
            "___",
            "÷ 2 =",
            "___",
            "___"
          ],
          [
            "___",
            "÷ 2 =",
            "___",
            "___"
          ],
          [
            "___",
            "÷ 2 =",
            "___",
            "___"
          ]
        ]
      }
    }
  },
  {
    "id": "q3",
    "title": "3. Change binary 1010 into decimal",
    "short": "Question 3",
    "kind": "form",
    "assessment": true,
    "summary": "4 points. Fill the blue box with the binary digit. Fill the raised pink box with its position. Work out each result. Then add all four results.",
    "answerTable": {
      "columns": [
        "Binary digit",
        "1",
        "0",
        "1",
        "0"
      ],
      "rows": [
        [
          "Position",
          "3",
          "2",
          "1",
          "0"
        ],
        [
          "Multiply",
          {
            "field": "m0", "powerInput": true
          },
          {
            "field": "m1", "powerInput": true
          },
          {
            "field": "m2", "powerInput": true
          },
          {
            "field": "m3", "powerInput": true
          }
        ],
        [
          "Result",
          {
            "field": "v0"
          },
          {
            "field": "v1"
          },
          {
            "field": "v2"
          },
          {
            "field": "v3"
          }
        ]
      ]
    },
    "tailFields": [
      "sum",
      "decimal"
    ],
    "fields": [
      {
        "name": "m0",
        "label": "Position 3 multiplication",
        "type": "text"
      },
      {
        "name": "v0",
        "label": "Position 3 result",
        "type": "text"
      },
      {
        "name": "m1",
        "label": "Position 2 multiplication",
        "type": "text"
      },
      {
        "name": "v1",
        "label": "Position 2 result",
        "type": "text"
      },
      {
        "name": "m2",
        "label": "Position 1 multiplication",
        "type": "text"
      },
      {
        "name": "v2",
        "label": "Position 1 result",
        "type": "text"
      },
      {
        "name": "m3",
        "label": "Position 0 multiplication",
        "type": "text"
      },
      {
        "name": "v3",
        "label": "Position 0 result",
        "type": "text"
      },
      {
        "name": "sum",
        "label": "Sum with all four terms, including zeros",
        "type": "text"
      },
      {
        "name": "decimal",
        "label": "Decimal answer",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "Convert binary 1010 to decimal. Write each digit × power of 2, each result, the four-term sum, and the decimal answer.",
      "visual": {
        "type": "table",
        "caption": "Binary 1010",
        "columns": [
          "Binary digit",
          "1",
          "0",
          "1",
          "0"
        ],
        "rows": [
          [
            "Position",
            "3",
            "2",
            "1",
            "0"
          ],
          [
            "Multiply",
            "___",
            "___",
            "___",
            "___"
          ],
          [
            "Result",
            "___",
            "___",
            "___",
            "___"
          ]
        ]
      }
    }
  },
  {
    "id": "q4",
    "title": "4. Change binary 0100 into decimal",
    "short": "Question 4",
    "kind": "form",
    "assessment": true,
    "summary": "4 points. Fill the blue box with the binary digit. Fill the raised pink box with its position. Work out each result. Then add all four results.",
    "answerTable": {
      "columns": [
        "Binary digit",
        "0",
        "1",
        "0",
        "0"
      ],
      "rows": [
        [
          "Position",
          "3",
          "2",
          "1",
          "0"
        ],
        [
          "Multiply",
          {
            "field": "m0", "powerInput": true
          },
          {
            "field": "m1", "powerInput": true
          },
          {
            "field": "m2", "powerInput": true
          },
          {
            "field": "m3", "powerInput": true
          }
        ],
        [
          "Result",
          {
            "field": "v0"
          },
          {
            "field": "v1"
          },
          {
            "field": "v2"
          },
          {
            "field": "v3"
          }
        ]
      ]
    },
    "tailFields": [
      "sum",
      "decimal"
    ],
    "fields": [
      {
        "name": "m0",
        "label": "Position 3 multiplication",
        "type": "text"
      },
      {
        "name": "v0",
        "label": "Position 3 result",
        "type": "text"
      },
      {
        "name": "m1",
        "label": "Position 2 multiplication",
        "type": "text"
      },
      {
        "name": "v1",
        "label": "Position 2 result",
        "type": "text"
      },
      {
        "name": "m2",
        "label": "Position 1 multiplication",
        "type": "text"
      },
      {
        "name": "v2",
        "label": "Position 1 result",
        "type": "text"
      },
      {
        "name": "m3",
        "label": "Position 0 multiplication",
        "type": "text"
      },
      {
        "name": "v3",
        "label": "Position 0 result",
        "type": "text"
      },
      {
        "name": "sum",
        "label": "Sum with all four terms, including zeros",
        "type": "text"
      },
      {
        "name": "decimal",
        "label": "Decimal answer",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "Convert binary 0100 to decimal. Write each digit × power of 2, each result, the four-term sum, and the decimal answer.",
      "visual": {
        "type": "table",
        "caption": "Binary 0100",
        "columns": [
          "Binary digit",
          "0",
          "1",
          "0",
          "0"
        ],
        "rows": [
          [
            "Position",
            "3",
            "2",
            "1",
            "0"
          ],
          [
            "Multiply",
            "___",
            "___",
            "___",
            "___"
          ],
          [
            "Result",
            "___",
            "___",
            "___",
            "___"
          ]
        ]
      }
    }
  },
  {
    "id": "q5",
    "title": "5. What do you divide next?",
    "short": "Question 5",
    "kind": "form",
    "assessment": true,
    "summary": "2 points. A few words are enough.",
    "intro": "<p>You have written: 10 ÷ 2 = 5 remainder 0.</p>",
    "fields": [
      {
        "name": "next",
        "label": "Which number do you divide by 2 next?",
        "type": "text"
      },
      {
        "name": "why",
        "label": "Why did you choose that number?",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "You have written: 10 ÷ 2 = 5 remainder 0."
    }
  },
  {
    "id": "q6",
    "title": "6. When do you stop?",
    "short": "Question 6",
    "kind": "form",
    "assessment": true,
    "summary": "2 points. A few words are enough.",
    "intro": "<p>Think about the division table you use to change decimal into binary.</p>",
    "fields": [
      {
        "name": "stop",
        "label": "What whole-number answer tells you to stop dividing?",
        "type": "text"
      },
      {
        "name": "read",
        "label": "Do you read the remainder column from top to bottom or bottom to top?",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "Think about the division table you use to change decimal into binary."
    }
  },
  {
    "id": "q7",
    "title": "7. Where do positions start?",
    "short": "Question 7",
    "kind": "form",
    "assessment": true,
    "summary": "2 points. A few words are enough.",
    "intro": "<p>To change binary into decimal, you number the digit positions.</p>",
    "fields": [
      {
        "name": "starting_side_v2",
        "label": "Do you start counting positions at the leftmost or rightmost digit?",
        "type": "text"
      },
      {
        "name": "starting_position_v2",
        "label": "What position number do you start with?",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "To change binary into decimal, you number the digit positions."
    }
  },
  {
    "id": "q8",
    "title": "8. What happens when the digit is 0?",
    "short": "Question 8",
    "kind": "form",
    "assessment": true,
    "summary": "2 points. A few words are enough.",
    "intro": "<p>Think about a binary digit that is 0.</p>",
    "fields": [
      {
        "name": "zero",
        "label": "What is the result when you multiply that 0 by its power of 2?",
        "type": "text"
      },
      {
        "name": "why",
        "label": "Why is that the result?",
        "type": "text"
      }
    ],
    "pdf": {
      "prompt": "Think about a binary digit that is 0."
    }
  },
  {
    "id": "review",
    "title": "Review and submit",
    "short": "Review",
    "kind": "review"
  }
]};
