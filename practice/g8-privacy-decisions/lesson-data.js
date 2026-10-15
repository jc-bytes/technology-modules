export const spec={
  "topic": "Privacy decisions: follow the data",
  "website": "https://jc-bytes.github.io/technology-modules/practice/g8-privacy-decisions/",
  "minutes": 90,
  "datePrepared": "2026-10-15",
  "steps": [
    {
      "id": "data-purpose",
      "title": "Ask four privacy questions",
      "kind": "html"
    },
    {
      "id": "notice-model",
      "title": "Read a short notice",
      "kind": "html"
    },
    {
      "id": "permission-model",
      "title": "Follow a permission decision",
      "kind": "html"
    },
    {
      "id": "sketch-data",
      "title": "Find what is shared",
      "short": "Data",
      "stage": "guided",
      "table": {
        "caption": "SketchSpace: notice facts",
        "columns": [
          "Information",
          "What happens"
        ],
        "rows": [
          [
            "Saved drawings",
            "Stay on your device so you can reopen them."
          ],
          [
            "Drawing-tool activity",
            "Sent to an ad partner to choose targeted ads."
          ]
        ]
      },
      "question": "What does SketchSpace send to the ad partner?",
      "options": [
        "Drawing-tool activity",
        "Every saved drawing",
        "A live camera recording"
      ],
      "answer": 0,
      "hint": "Read the Drawing-tool activity row. Follow where that information goes."
    },
    {
      "id": "sketch-setting",
      "title": "Use the choice offered",
      "short": "Ad setting",
      "stage": "guided",
      "table": {
        "caption": "SketchSpace: the choice offered",
        "columns": [
          "Notice fact",
          "Meaning"
        ],
        "rows": [
          [
            "Personalized ads are optional",
            "You can turn this switch off."
          ],
          [
            "Drawing still works with the switch off",
            "Future drawing-tool activity is not sent for these ads."
          ]
        ]
      },
      "question": "Alex wants to draw without this optional ad sharing. Which change matches that goal?",
      "options": [
        "Turn the screen brightness down",
        "Turn personalized ads off",
        "Leave every setting unchanged"
      ],
      "answer": 1,
      "hint": "Find the switch that controls this optional ad use. The notice says drawing still works."
    },
    {
      "id": "sketch-camera",
      "title": "Match access to the task",
      "short": "Camera",
      "stage": "guided",
      "table": {
        "caption": "SketchSpace: optional photo feature",
        "columns": [
          "Task",
          "Access needed"
        ],
        "rows": [
          [
            "Draw with the on-screen tools",
            "No camera access needed."
          ],
          [
            "Choose to add a photo",
            "Camera access only while taking the photo."
          ]
        ]
      },
      "question": "Alex chooses to add a photo. Which camera access fits this task?",
      "options": [
        "Camera access all day in the background",
        "Access to all phone contacts as well",
        "Camera access only while taking the photo"
      ],
      "answer": 2,
      "hint": "Match the access to taking one photo, not to unrelated tasks."
    },
    {
      "id": "review-contacts",
      "title": "Check another app",
      "short": "Contacts",
      "stage": "independent",
      "table": {
        "caption": "ReviewBuddy: notice facts",
        "columns": [
          "Feature",
          "Notice says"
        ],
        "rows": [
          [
            "Create study cards",
            "Works without phone contacts."
          ],
          [
            "Invite friends",
            "Optional. Asks for the full contact list."
          ]
        ]
      },
      "question": "Alex only wants to create study cards. What should Alex do about contacts?",
      "options": [
        "Allow contacts because every app needs them",
        "Do not allow contacts for this task",
        "Post the contact list publicly"
      ],
      "answer": 1,
      "hint": "Check whether making study cards needs the contact list."
    },
    {
      "id": "review-ad",
      "title": "Explain an ad choice",
      "short": "Targeted ads",
      "stage": "independent",
      "table": {
        "caption": "ReviewBuddy: advertising notice",
        "columns": [
          "Information",
          "Use"
        ],
        "rows": [
          [
            "Study-session times",
            "Sent to an ad partner when personalized ads are on."
          ],
          [
            "Ad partner",
            "Uses those times to choose targeted ads."
          ]
        ]
      },
      "question": "Which statement is supported by this notice?",
      "options": [
        "The app records the camera all day",
        "Every file on the phone is public",
        "Study activity can help choose which ads Alex sees"
      ],
      "answer": 2,
      "hint": "Use only the information and purpose stated in the notice."
    },
    {
      "id": "review-limits",
      "title": "Check what changes",
      "short": "Limits",
      "stage": "independent",
      "table": {
        "caption": "ReviewBuddy: after changing a setting",
        "columns": [
          "Notice fact",
          "What it says"
        ],
        "rows": [
          [
            "Personalized ads are now off",
            "Future optional ad sharing described here stops."
          ],
          [
            "Yesterday’s data was already sent",
            "This switch does not delete data already shared."
          ]
        ]
      },
      "question": "What can Alex conclude after switching personalized ads off?",
      "options": [
        "This future ad sharing stops, but earlier data may remain",
        "All data already shared has been deleted",
        "The app no longer uses any data at all"
      ],
      "answer": 0,
      "hint": "Separate future sharing from information that was already sent."
    },
    {
      "id": "privacy-explanation",
      "title": "Explain your decision",
      "kind": "form",
      "question": "Which ReviewBuddy setting or permission would you change, and why? Use one fact from its notice.",
      "fieldId": "privacy-decision-reason-v1",
      "starter": "I would ___ because the notice says ___. This limits ___.",
      "help": "Write two short sentences. You may say your answer before typing.",
      "table": {
        "caption": "ReviewBuddy: facts for your reason",
        "columns": [
          "Choice",
          "Notice says"
        ],
        "rows": [
          [
            "Contacts",
            "Study cards work without contacts."
          ],
          [
            "Personalized ads",
            "Off stops future optional ad sharing; earlier data may remain."
          ]
        ]
      }
    },
    {
      "id": "review",
      "title": "Review your answers",
      "kind": "review"
    }
  ],
  "core": "6 choice checks plus one 2-sentence explanation. Discuss and revise the same explanation; no extra exit writing.",
  "sources": [
    "https://www.commonsense.org/education/digital-citizenship/lesson/being-aware-of-what-you-share",
    "https://consumer.ftc.gov/articles/how-websites-and-apps-collect-and-use-your-information"
  ],
  "caseCautions": [
    "All apps and notices here are fictional.",
    "Camera access supports the optional photo feature, not plain drawing.",
    "Turning optional ad sharing off is not a claim that every app collects nothing or deletes earlier data."
  ]
};
