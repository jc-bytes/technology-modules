export const buildSteps = [
  {
    "id": "goal",
    "title": "See the app you will finish",
    "do": "Look at the finished app screen. You will build the word card and its four controls.",
    "expected": "Your finished layout will include Listen, Mark as learned, Previous and Next.",
    "image": null,
    "why": "You will finish Cultural Language. Its first lesson teaches three Ngäbere words. A learner can listen, move through the words and mark them learned.",
    "help": "This is a project guide for several work sessions. Use Steps to return to your stopping point. Guide answers stay in this browser; app progress saves after sign-in.",
    "phase": "Start",
    "stage": "model",
    "links": [],
    "block": false,
    "download": null,
    "before": "A small word card; no student buttons.",
    "after": "A clear word card with four controls.",
    "where": "In this guide",
    "visuals": [
      {
        "src": "assets/runtime/stage-18-learning.png",
        "label": "The finished learning screen"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Completed app running in Web Preview with a local example learner."
  },
  {
    "id": "guide-and-editor",
    "title": "Keep the guide and editor open",
    "why": "Use three tabs: this guide for directions, MIT App Inventor to build, and our viewer to test exported app files.",
    "do": "Keep this guide and MIT App Inventor open. When you reach testing, open our viewer in another tab.",
    "expected": "You know where to read, where to build, and where to test.",
    "before": "This tab: read the next instruction.",
    "after": "App Inventor tab: make the change.",
    "where": "In this guide",
    "phase": "Start",
    "stage": "model",
    "links": [],
    "image": null
  },
  {
    "id": "get-starter",
    "title": "Download your starter",
    "do": "Click Download starter. Keep the downloaded file ending in .aia; do not unzip it.",
    "expected": "Downloads contains LanguageApp_Firebase_Starter.aia.",
    "image": null,
    "why": "The starter is the editable app project, not a picture. It already contains sign-in, the three word meanings and the saving instructions.",
    "help": null,
    "phase": "Start",
    "stage": "guided",
    "links": [
      [
        "Download starter",
        "downloads/LanguageApp_Firebase_Starter.aia"
      ]
    ],
    "block": false,
    "download": null,
    "before": "No project on your computer yet.",
    "after": "One .aia project file in Downloads.",
    "where": "In this guide"
  },
  {
    "id": "open-inventor",
    "title": "Open MIT App Inventor",
    "why": "Build the app on the official MIT App Inventor website.",
    "do": "Open MIT App Inventor using the link below and sign in. If a project opens, click the back arrow at the top left to reach My Projects.",
    "expected": "My Projects is open on MIT App Inventor.",
    "before": "No App Inventor editor open.",
    "after": "The editor is open in another tab.",
    "where": "In this guide",
    "phase": "Start",
    "stage": "model",
    "links": [
      [
        "Open MIT App Inventor",
        "https://ai2.appinventor.mit.edu/"
      ]
    ],
    "image": null,
    "help": "Use your school Google account to open the editor. The Cultural Language email and password used later belong to the app you are building."
  },
  {
    "id": "import",
    "title": "Import the project",
    "do": "In App Inventor, open Projects. Choose Import project (.aia) from my computer. Choose LanguageApp_Firebase_Starter.aia from Downloads, then confirm.",
    "expected": "The project opens in Designer and its preview shows Ju and House.",
    "image": null,
    "why": "Import means opening the supplied project for editing. Do not start with an empty app.",
    "help": "Import LanguageApp_Firebase_Starter.aia from Downloads into MIT App Inventor. Keep the supplied sign-in and saving code. Do not start a blank project.",
    "phase": "Start",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The App Inventor project list.",
    "after": "The supplied project is open.",
    "where": "In App Inventor · Projects",
    "visuals": [
      {
        "src": "assets/screenshots/menu-import.jpg",
        "label": "Projects → Import project"
      },
      {
        "src": "assets/screenshots/import-dialog.jpg",
        "label": "Choose the starter .aia"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "starter-check",
    "title": "Check the starter you opened",
    "why": "The supplied starter should show Ju and House with no Listen, Mark as learned, Previous or Next buttons. Its sign-in and saving code are already provided.",
    "do": "Compare your newly opened Designer preview with this actual starter.",
    "expected": "It shows Ju / House and has none of your four new buttons.",
    "before": "The actual starter: small Ju / House.",
    "after": "Later: the same card with four buttons.",
    "where": "In App Inventor · Designer",
    "phase": "Start",
    "stage": "model",
    "links": [],
    "image": null,
    "visuals": [
      {
        "src": "assets/screenshots/starter-cultural-language.png",
        "label": "Starter immediately after import"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test.",
    "help": "This is the starter immediately after import in Designer. The running app shows sign-in first; after sign-in, its word card starts with this same small text."
  },
  {
    "id": "designer-map",
    "title": "Find the four Designer areas",
    "why": "Palette supplies new components. The Designer Viewer arranges the screen. Components lists the items in your app. Properties changes the selected item.",
    "do": "Find Palette, Viewer, Components and Properties before editing anything.",
    "expected": "You can point to all four areas.",
    "before": "Palette → choose a new item.",
    "after": "Viewer → preview. Components → select. Properties → change.",
    "where": "In this guide",
    "phase": "Start",
    "stage": "model",
    "links": [],
    "image": null,
    "visuals": [
      {
        "src": "assets/screenshots/designer-cultural-language.png",
        "label": "The actual Designer"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual App Inventor Designer capture. Palette, Viewer, Components and Properties are the same four work areas. Our local capture also has a Web Preview button; MIT’s site does not need that button.",
    "help": "The Designer Viewer is the layout area marked 2. Our separate app viewer runs exported .aia files. MIT’s website has Designer and Blocks; use the separate viewer for classroom testing."
  },
  {
    "id": "find-card",
    "title": "Find the word card",
    "do": "In Components, expand Page, then AppPanel, LearningPanel and WordCard. Click WordLabel.",
    "expected": "WordLabel is selected. The Properties area now shows its settings.",
    "image": null,
    "why": "The Components list is a list of things inside your app. A Label shows text; an Arrangement holds things together.",
    "help": "Use the small expand arrow beside a name. WordLabel and MeaningLabel are inside WordCard. Leave LoginPanel and the provided components in place.",
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Nothing selected in the word card.",
    "after": "WordLabel selected; its settings are shown.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/screenshots/stage-00-details.jpg",
        "label": "WordLabel selected"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "word-style",
    "title": "Make the word stand out",
    "do": "Select WordLabel in Components. In Properties, set FontSize to 40, check FontBold, and set TextAlignment to center.",
    "expected": "Ju becomes large, bold and centered.",
    "image": null,
    "why": "WordLabel is the text Ju. Changing its font makes the same word easier to read; it does not change the recording.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Ju uses size 18.",
    "after": "Ju uses size 40 and bold.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-00-card.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-01-card.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "meaning-style",
    "title": "Style the meaning",
    "do": "Select MeaningLabel. Set FontSize to 24, TextColor to #566D68, and TextAlignment to center.",
    "expected": "House appears below Ju in gray text.",
    "image": null,
    "why": "MeaningLabel shows the English meaning. Its smaller text should sit below the large language word.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "House uses size 16.",
    "after": "House uses size 24 in gray.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-01-card.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-02-card.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "listen-button",
    "title": "Add the Listen button",
    "do": "From Palette → User Interface, drag Button into WordCard, just above CardBottom. In Components, select the new button, click Rename, and enter ListenButton.",
    "expected": "ListenButton appears in Components inside WordCard.",
    "image": null,
    "why": "A Button is something a learner taps. Adding it changes the screen; it will not play anything until we connect its Click event.",
    "help": "Select the component, click Rename, type ListenButton, and confirm. The spelling and capitals must match.",
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No button below the word.",
    "after": "One new button inside WordCard.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-02-card.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-03-card.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "listen-style",
    "title": "Style Listen",
    "do": "Select ListenButton and enter the settings below.",
    "expected": "The button reads Listen and fills the card width.",
    "image": null,
    "why": "The component name ListenButton is used by the blocks. The Text setting is the word the learner sees on the screen.",
    "help": "Open a color property and enter its hex value in the custom color box. Keep all eight characters if the editor adds FF for opacity.",
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "A plain new button.",
    "after": "A wide teal Listen button.",
    "where": "In App Inventor · Designer",
    "settings": [
      [
        "Text",
        "Listen"
      ],
      [
        "FontSize",
        "16"
      ],
      [
        "Width / Height",
        "Fill parent / 52 pixels"
      ],
      [
        "Shape",
        "Rounded"
      ],
      [
        "BackgroundColor / TextColor",
        "#00695C / #FFFFFF"
      ]
    ],
    "visuals": [
      {
        "src": "assets/runtime/stage-03-card.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-04-card.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "name-and-text",
    "title": "A name and a label are different",
    "why": "ListenButton is the component name used by code. Listen is its Text, the label a learner reads on the button.",
    "do": "In this real capture, find ListenButton in Components and Listen in its Text property.",
    "expected": "The component name is used in Blocks; Text is the label shown to the learner.",
    "before": "Component name: ListenButton.",
    "after": "Visible Text: Listen.",
    "where": "In this guide",
    "phase": "1 · Screen layout",
    "stage": "model",
    "links": [],
    "image": null,
    "visuals": [
      {
        "src": "assets/screenshots/listen-name.jpg",
        "label": "Name in Components"
      },
      {
        "src": "assets/screenshots/listen-text.jpg",
        "label": "Text shown on the button"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "instruction",
    "title": "Add a short instruction",
    "do": "Drag a Label into StudentButtons. Rename it InstructionLabel. Set Text to Listen, say it, then mark it. Set FontSize to 15, TextColor to #566D68 and Width to Fill parent.",
    "expected": "A short instruction appears below the card.",
    "image": null,
    "why": "A Label gives directions but cannot be tapped. StudentButtons is the empty space below the word card.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Empty area below the card.",
    "after": "One instruction below the card.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-04-controls.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-05-controls.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "learned-button",
    "title": "Add Mark as learned",
    "do": "Drag a Button below InstructionLabel, inside StudentButtons. Rename it LearnedButton and enter the settings below.",
    "expected": "Mark as learned appears below the instruction.",
    "image": null,
    "why": "This button will let the learner mark the current word as learned. First we create its appearance; saving comes later.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Only an instruction below the card.",
    "after": "The instruction and a new button.",
    "where": "In App Inventor · Designer",
    "settings": [
      [
        "Text",
        "Mark as learned"
      ],
      [
        "FontSize",
        "16"
      ],
      [
        "Width / Height",
        "Fill parent / 52 pixels"
      ],
      [
        "Shape",
        "Rounded"
      ],
      [
        "BackgroundColor / TextColor",
        "#E3F2ED / #00695C"
      ]
    ],
    "visuals": [
      {
        "src": "assets/runtime/stage-05-controls.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-06-controls.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "navigation-row",
    "title": "Add a navigation row",
    "do": "From Palette → Layout, drag HorizontalArrangement into StudentButtons, below LearnedButton. Rename it WordNavigation. Set Width to Fill parent.",
    "expected": "An empty horizontal row is ready for two buttons.",
    "image": null,
    "why": "Buttons normally stack downwards. A HorizontalArrangement is a row that lets Previous and Next sit side by side.",
    "help": "An empty arrangement has no visible app content yet. Check its name and Width in Designer; add Previous and Next inside it in the next two steps.",
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No row for navigation buttons.",
    "after": "An empty WordNavigation row.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/screenshots/navigation-properties.png",
        "label": "WordNavigation selected in Components and Properties"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual Designer: the empty HorizontalArrangement is named WordNavigation and its Width is Fill parent. Buttons are added in the next two steps."
  },
  {
    "id": "previous-button",
    "title": "Add Previous",
    "do": "Drag a Button into WordNavigation. Rename it PreviousButton and enter the settings below.",
    "expected": "Previous appears inside the row.",
    "image": null,
    "why": "These buttons will move through the three words. Their positions are ready now; their actions will be connected in Blocks.",
    "help": "For Width, choose percent and type 44. Do not type 44 pixels.",
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Previous button in the row.",
    "after": "Previous appears in the row.",
    "where": "In App Inventor · Designer",
    "settings": [
      [
        "Text",
        "Previous"
      ],
      [
        "FontSize",
        "16"
      ],
      [
        "Width / Height",
        "44 percent / 52 pixels"
      ],
      [
        "Shape",
        "Rounded"
      ],
      [
        "BackgroundColor / TextColor",
        "#E3F2ED / #00695C"
      ]
    ],
    "visuals": [
      {
        "src": "assets/runtime/stage-07-controls.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-08-controls.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "next-button",
    "title": "Add Next",
    "do": "Drag a Button into WordNavigation. Rename it NextButton and enter the settings below.",
    "expected": "Next appears inside the row.",
    "image": null,
    "why": "These buttons will move through the three words. Their positions are ready now; their actions will be connected in Blocks.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Next button in the row.",
    "after": "Next appears in the row.",
    "where": "In App Inventor · Designer",
    "settings": [
      [
        "Text",
        "Next"
      ],
      [
        "FontSize",
        "16"
      ],
      [
        "Width / Height",
        "44 percent / 52 pixels"
      ],
      [
        "Shape",
        "Rounded"
      ],
      [
        "BackgroundColor / TextColor",
        "#E3F2ED / #00695C"
      ]
    ],
    "visuals": [
      {
        "src": "assets/runtime/stage-08-controls.png",
        "label": "Before"
      },
      {
        "src": "assets/runtime/stage-09-controls.png",
        "label": "After"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "layout-check",
    "title": "Check your layout",
    "do": "Compare the controls in your Designer with this running-app view. The four new buttons have no Click instructions yet.",
    "expected": "Your word card and all four button names match.",
    "image": null,
    "why": "At this point the learning screen should look complete. Its four new buttons still have no Click instructions, so a click will not yet perform these actions.",
    "help": null,
    "phase": "1 · Screen layout",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The starter card.",
    "after": "Your completed layout, before coding.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-09-learning.png",
        "label": "Layout before connecting the Click events"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "names-check",
    "title": "Check component names",
    "question": "Which name must match the Click block exactly?",
    "options": [
      "The button component name",
      "The color name",
      "The project nickname"
    ],
    "answer": 0,
    "hint": "Compare ListenButton in Components with the name on its Click block.",
    "phase": "1 · Screen layout",
    "kind": "check",
    "image": null,
    "links": []
  },
  {
    "id": "upload-1",
    "title": "Upload Ju",
    "do": "Download word1.wav using the link below. In Designer, find Media under Components, choose Upload File, select that file from Downloads, and confirm.",
    "expected": "Media lists word1.wav. Keep this exact filename.",
    "image": null,
    "why": "Uploading puts a recording inside the project so our viewer can play it. Uploading does not change the visible word card.",
    "help": "If the downloaded file is named word1 (1).wav, rename it to word1.wav before uploading. The exact filename lets PlayWord find it.",
    "phase": "2 · Words and recordings",
    "stage": "guided",
    "links": [
      [
        "Download Ju recording",
        "downloads/word1.wav"
      ]
    ],
    "block": false,
    "download": null,
    "before": "0 word recordings in Media.",
    "after": "word1.wav has been added.",
    "where": "In App Inventor · Designer → Media",
    "visuals": [
      {
        "src": "assets/screenshots/stage-09-media.jpg",
        "label": "Before upload"
      },
      {
        "src": "assets/screenshots/stage-10-media.jpg",
        "label": "After upload"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "upload-2",
    "title": "Upload Nukro",
    "do": "Download word2.wav using the link below. In Designer, find Media under Components, choose Upload File, select that file from Downloads, and confirm.",
    "expected": "Media lists word2.wav. Keep this exact filename.",
    "image": null,
    "why": "Uploading puts a recording inside the project so our viewer can play it. Uploading does not change the visible word card.",
    "help": "If the downloaded file is named word2 (1).wav, rename it to word2.wav before uploading. The exact filename lets PlayWord find it.",
    "phase": "2 · Words and recordings",
    "stage": "guided",
    "links": [
      [
        "Download Nukro recording",
        "downloads/word2.wav"
      ]
    ],
    "block": false,
    "download": null,
    "before": "1 word recording in Media.",
    "after": "word2.wav has been added.",
    "where": "In App Inventor · Designer → Media",
    "visuals": [
      {
        "src": "assets/screenshots/stage-10-media.jpg",
        "label": "Before upload"
      },
      {
        "src": "assets/screenshots/stage-11-media.jpg",
        "label": "After upload"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "upload-3",
    "title": "Upload Minchi",
    "do": "Download word3.wav using the link below. In Designer, find Media under Components, choose Upload File, select that file from Downloads, and confirm.",
    "expected": "Media lists word3.wav. Keep this exact filename.",
    "image": null,
    "why": "Uploading puts a recording inside the project so our viewer can play it. Uploading does not change the visible word card.",
    "help": "If the downloaded file is named word3 (1).wav, rename it to word3.wav before uploading. The exact filename lets PlayWord find it.",
    "phase": "2 · Words and recordings",
    "stage": "guided",
    "links": [
      [
        "Download Minchi recording",
        "downloads/word3.wav"
      ]
    ],
    "block": false,
    "download": null,
    "before": "2 word recordings in Media.",
    "after": "word3.wav has been added.",
    "where": "In App Inventor · Designer → Media",
    "visuals": [
      {
        "src": "assets/screenshots/stage-11-media.jpg",
        "label": "Before upload"
      },
      {
        "src": "assets/screenshots/stage-12-media.jpg",
        "label": "After upload"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "connect-phone",
    "title": "Open your exported app in our viewer",
    "do": "In MIT App Inventor, choose Projects → Export selected project (.aia) to my computer. Open our viewer below. Click Choose File and select the .aia you just exported.",
    "expected": "Wait for Preview running. Cultural Language opens at its account screen.",
    "image": null,
    "why": "Our viewer is a separate website. It runs the .aia file you choose; it cannot see unsaved changes in the MIT editor.",
    "help": "After every app change, export a new .aia from MIT and choose that newest file in the viewer. Reloading the viewer alone does not load your editor changes.",
    "phase": "2 · Words and recordings",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "Computer: a Designer preview.",
    "after": "Phone: the running app sign-in.",
    "where": "MIT App Inventor → our viewer",
    "visuals": [
      {
        "label": "Export the current project from MIT",
        "src": "assets/screenshots/menu-export.jpg"
      },
      {
        "label": "Choose the exported .aia in our viewer",
        "src": "assets/screenshots/viewer-file-upload.png"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual Projects menu and separate viewer upload control. The app file is read in the browser; sign-in uses the classroom Firebase project."
  },
  {
    "id": "create-account",
    "title": "Create your app account",
    "do": "In the viewer, enter an email you control and a new app password of at least six characters. Click Create account. If you already have this app account, click Sign in.",
    "expected": "Learn opens in the viewer and shows the first word. Keep your password out of guide answers and screenshots.",
    "image": null,
    "why": "This account belongs to Cultural Language. It is separate from the account used to open the editor.",
    "help": "Use at least 6 characters. If the account already exists, click Sign in. Wait for Progress is up to date. Keep passwords out of screenshots and answers.",
    "phase": "2 · Words and recordings",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The app account screen.",
    "after": "The Learn screen with Ju / House.",
    "where": "In our viewer · Cultural Language",
    "visuals": [
      {
        "src": "assets/runtime/sign-in-screen.png",
        "label": "Before: account screen"
      },
      {
        "src": "assets/runtime/stage-12-learning.png",
        "label": "After: Learn opens"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Web Preview example using a local demonstration learner. Use your own account to check that sign-in works."
  },
  {
    "id": "event-meaning",
    "title": "See how a button works",
    "do": "Read this example: when ListenButton is tapped, call PlayWord. PlayWord chooses and plays the recording for the word on the card.",
    "expected": "The yellow event starts the purple instruction.",
    "image": null,
    "why": "An event means something happened. A Click event means someone tapped a button. A procedure is a named set of instructions already supplied in your starter.",
    "help": null,
    "phase": "3 · Listen and navigation",
    "stage": "model",
    "links": [],
    "block": true,
    "download": null,
    "before": "An empty Click event.",
    "after": "The Click event calls PlayWord.",
    "where": "In this guide",
    "visuals": [
      {
        "src": "assets/blocks/student-ListenButton.svg",
        "label": "Tap event → procedure call"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "provided-code",
    "title": "Use the supplied procedures",
    "why": "The starter already knows how to sign in, choose a word, play its file and save progress. These named instructions are procedures.",
    "do": "In Blocks, use the empty area beside the supplied code. Leave the provided procedures in place.",
    "expected": "Your job is four Click events, each with one procedure call.",
    "before": "Supplied procedures already exist.",
    "after": "Your four events will call them.",
    "where": "In App Inventor · Blocks",
    "phase": "3 · Connect buttons",
    "stage": "model",
    "links": [],
    "image": null,
    "visuals": [
      {
        "src": "assets/screenshots/provided-workspace.jpg",
        "label": "Supplied procedures and workspace"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual Blocks workspace of the supplied starter. Leave the supplied procedure definitions in place; add your own four Click connections.",
    "help": "Edit in the MIT App Inventor tab. To test a change, export a new .aia and load it in our separate viewer. If you keep choosing the old file, the viewer will show the old app."
  },
  {
    "id": "listen-event",
    "title": "Start the Listen event",
    "do": "Switch to the MIT App Inventor tab and click Blocks. In the component list, select ListenButton. Drag when ListenButton.Click into an empty workspace area.",
    "expected": "One yellow ListenButton.Click event has an empty do space.",
    "image": null,
    "why": "We need to tell the app what to do when someone clicks ListenButton. The yellow Click block is the starting point for that tap.",
    "help": "Use the component drawer under Screen1. Leave the collapsed provided blocks to the right.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Click event for this button.",
    "after": "One Click event with an empty do space.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-ListenButton.svg",
        "label": "Empty Click event"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "listen-call",
    "title": "Connect playback",
    "do": "Open Built-in → Procedures on the left. Find call PlayWord, then drag it inside the do space of ListenButton.Click until it snaps in.",
    "expected": "The purple call PlayWord block is attached inside the yellow event.",
    "image": null,
    "why": "PlayWord is a procedure already in the starter. It contains the instructions to play the current word recording. You only connect it to the button.",
    "help": "Choose the small purple call block. Do not drag the purple to PlayWord definition out of the provided code.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The Click event has an empty do space.",
    "after": "The Click event now calls PlayWord.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-ListenButton.svg",
        "label": "Before"
      },
      {
        "src": "assets/blocks/student-ListenButton.svg",
        "label": "After"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "test-listen",
    "title": "Test Ju",
    "do": "Export a new .aia from MIT, then choose that newest file in our viewer. Sign in if asked. Click Listen while Ju is on the card.",
    "expected": "You hear the original recording of Ju. The card still says Ju / House.",
    "image": null,
    "why": "The new connection changes behavior, not appearance. A click now runs PlayWord, which uses the uploaded file for the current word.",
    "help": "Check the computer volume, confirm Media contains word1.wav, and check ListenButton.Click calls PlayWord. After fixing it, export and choose the new .aia again.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "Listen had no tap action.",
    "after": "Listen plays Ju; the word stays Ju.",
    "where": "In our viewer · Learn"
  },
  {
    "id": "event-NextButton",
    "title": "Start the Next event",
    "do": "Switch to the MIT App Inventor tab and click Blocks. Select NextButton in the left component list and drag its Click event into an empty workspace area.",
    "expected": "One yellow NextButton.Click event has an empty do space.",
    "image": null,
    "why": "We need to tell the app what to do when someone clicks NextButton. The yellow Click block is the starting point for that tap.",
    "help": "Keep one Click event for each button. Duplicate events can cause an error.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Click event for this button.",
    "after": "One Click event with an empty do space.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-NextButton.svg",
        "label": "Empty Click event"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "call-NextButton",
    "title": "Connect Next",
    "do": "Open Built-in → Procedures on the left. Find call NextWord, then drag it inside the do space of NextButton.Click until it snaps in.",
    "expected": "The purple call NextWord block is attached inside the yellow event.",
    "image": null,
    "why": "NextWord is a procedure already in the starter. It contains the instructions to show the next word. You only connect it to the button.",
    "help": null,
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The Click event has an empty do space.",
    "after": "The Click event now calls NextWord.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-NextButton.svg",
        "label": "Before"
      },
      {
        "src": "assets/blocks/student-NextButton.svg",
        "label": "After"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "test-NextButton",
    "title": "Test Next",
    "do": "Export a new .aia from MIT, then choose that newest file in our viewer. Sign in if asked. Starting at Ju, click Next once for Nukro and again for Minchi.",
    "expected": "The pairs are Ju / House, Nukro / Dog, then Minchi / Cat.",
    "image": null,
    "why": "NextWord changes both the language word and its English meaning. It does not add a new word to the database.",
    "help": "After the second click, click Next once more. It should stay on Minchi. Previous will work after its own connection is added in the next steps.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "Ju / House.",
    "after": "One tap: Nukro / Dog.",
    "where": "In our viewer · Learn",
    "visuals": [
      {
        "src": "assets/runtime/ju-before-learning.png",
        "label": "Before clicking Next"
      },
      {
        "src": "assets/runtime/nukro-card.png",
        "label": "After one click"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "event-PreviousButton",
    "title": "Start the Previous event",
    "do": "Switch to the MIT App Inventor tab and click Blocks. Select PreviousButton in the left component list and drag its Click event into an empty workspace area.",
    "expected": "One yellow PreviousButton.Click event has an empty do space.",
    "image": null,
    "why": "We need to tell the app what to do when someone clicks PreviousButton. The yellow Click block is the starting point for that tap.",
    "help": "Keep one Click event for each button. Duplicate events can cause an error.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Click event for this button.",
    "after": "One Click event with an empty do space.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-PreviousButton.svg",
        "label": "Empty Click event"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "call-PreviousButton",
    "title": "Connect Previous",
    "do": "Open Built-in → Procedures on the left. Find call PreviousWord, then drag it inside the do space of PreviousButton.Click until it snaps in.",
    "expected": "The purple call PreviousWord block is attached inside the yellow event.",
    "image": null,
    "why": "PreviousWord is a procedure already in the starter. It contains the instructions to show the previous word. You only connect it to the button.",
    "help": null,
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The Click event has an empty do space.",
    "after": "The Click event now calls PreviousWord.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-PreviousButton.svg",
        "label": "Before"
      },
      {
        "src": "assets/blocks/student-PreviousButton.svg",
        "label": "After"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "test-PreviousButton",
    "title": "Test Previous",
    "do": "Export a new .aia from MIT, then choose that newest file in our viewer. Sign in if asked. Click Next twice to reach Minchi, then Previous once for Nukro and again for Ju.",
    "expected": "The word and meaning move backwards together.",
    "image": null,
    "why": "PreviousWord moves backwards through the same list. Test it from the last word so the change is easy to see.",
    "help": "Click Previous once more at Ju. It should stay on Ju.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "Minchi / Cat.",
    "after": "One tap: Nukro / Dog.",
    "where": "In our viewer · Learn",
    "visuals": [
      {
        "src": "assets/runtime/minchi-card.png",
        "label": "Before clicking Previous"
      },
      {
        "src": "assets/runtime/previous-nukro-card.png",
        "label": "After one click"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots of this build stage."
  },
  {
    "id": "three-audios",
    "title": "Test all recordings",
    "do": "In our viewer, use Next and Previous to visit Ju, Nukro and Minchi. Click Listen once on each word.",
    "expected": "Each card plays its matching original recording.",
    "image": null,
    "why": "The app uses the current word to choose its recording. Testing only Ju would miss a wrong filename for Dog or Cat.",
    "help": "Check each exact Media filename: Ju uses word1.wav; Nukro uses word2.wav; Minchi uses word3.wav.",
    "phase": "3 · Listen and navigation",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Only the first word has been tested.",
    "after": "All three word recordings checked.",
    "where": "In our viewer · Learn"
  },
  {
    "id": "audio-evidence",
    "title": "Record your audio test",
    "question": "For Ju, Nukro and Minchi, write what played. Record any problem you still need to fix.",
    "starter": "Ju played ___. Nukro played ___. Minchi played ___.",
    "phase": "3 · Listen and navigation",
    "kind": "response",
    "image": null,
    "links": []
  },
  {
    "id": "save-event",
    "title": "Start the save event",
    "do": "Switch to the MIT App Inventor tab and click Blocks. Select LearnedButton in the left component list and drag its Click event into an empty workspace area.",
    "expected": "One yellow LearnedButton.Click event has an empty do space.",
    "image": null,
    "why": "We need to tell the app what to do when someone clicks LearnedButton. The yellow Click block is the starting point for that tap.",
    "help": null,
    "phase": "4 · Save learning progress",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "No Click event for this button.",
    "after": "One Click event with an empty do space.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-LearnedButton.svg",
        "label": "Empty Click event"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "save-call",
    "title": "Connect saving",
    "do": "Open Built-in → Procedures on the left. Find call SaveLearnedWord, then drag it inside the do space of LearnedButton.Click until it snaps in.",
    "expected": "The purple call SaveLearnedWord block is attached inside the yellow event.",
    "image": null,
    "why": "SaveLearnedWord is a procedure already in the starter. It contains the instructions to save the current word as learned for this account. You only connect it to the button.",
    "help": "Use SaveLearnedWord. Do not copy tokens, database addresses or passwords into this event.",
    "phase": "4 · Save learning progress",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "The Click event has an empty do space.",
    "after": "The Click event now calls SaveLearnedWord.",
    "where": "In App Inventor · Blocks",
    "visuals": [
      {
        "src": "assets/blocks/empty-LearnedButton.svg",
        "label": "Before"
      },
      {
        "src": "assets/blocks/student-LearnedButton.svg",
        "label": "After"
      }
    ],
    "visualKind": "blocks",
    "visualCaption": "Rendered by the local MIT App Inventor Blockly engine."
  },
  {
    "id": "save-test",
    "title": "Save one learned word",
    "do": "Export a new .aia from MIT, then choose that newest file in our viewer. Sign in if asked. On Ju, click Mark as learned and wait for the sync message.",
    "expected": "Ju shows Learned ✓ and the app reports Progress is up to date.",
    "image": null,
    "why": "SaveLearnedWord sends this word to Firebase under the signed-in learner’s account. Other learners keep their own progress.",
    "help": "If the status says Saved on this device, open Progress and click Sync now when online. Do not claim cloud saving until it says up to date.",
    "phase": "4 · Save learning progress",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "Ju is not marked learned.",
    "after": "Ju shows Learned ✓ for this account.",
    "where": "In our viewer · Learn",
    "visuals": [
      {
        "src": "assets/runtime/ju-before-learning.png",
        "label": "Before marking Ju"
      },
      {
        "src": "assets/runtime/ju-learned-card.png",
        "label": "After marking Ju"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Web Preview example of the card change. Check the save status in your own running app."
  },
  {
    "id": "progress-test",
    "title": "Check the progress count",
    "do": "Click Progress at the top of the app in our viewer.",
    "expected": "The learned count includes Ju. If this account was empty, it now shows 1 / 3.",
    "image": null,
    "why": "Progress counts the words saved as learned for the current account. It may already include earlier practice.",
    "help": null,
    "phase": "4 · Save learning progress",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Ju was marked learned on its card.",
    "after": "Progress includes that saved word.",
    "where": "In our viewer · Progress",
    "visuals": [
      {
        "src": "assets/runtime/progress-zero-words.png",
        "label": "No words marked yet"
      },
      {
        "src": "assets/runtime/progress-one-word.png",
        "label": "Ju has been marked"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Web Preview example with a local learner. Your count can include words you learned earlier."
  },
  {
    "id": "return-test",
    "title": "Check saved progress",
    "do": "Click Progress, then Sign out. Sign in again with the same Cultural Language email and password. Check Ju after progress finishes loading.",
    "expected": "Ju still shows Learned ✓ after the app finishes syncing.",
    "image": null,
    "why": "A label changing once does not prove saving worked. Signing in again checks whether the app can retrieve the saved progress.",
    "help": "Use the same app account after signing out. Wait for progress to finish loading. A different account has its own progress.",
    "phase": "4 · Save learning progress",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "You signed out of the app.",
    "after": "The same account retrieves Ju as learned.",
    "where": "In our viewer · Learn",
    "visuals": [
      {
        "src": "assets/runtime/return-ju-learned.png",
        "label": "Ju after signing in again"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Web Preview example with local demonstration data. Repeat sign-out and sign-in with your own account to verify cloud saving."
  },
  {
    "id": "save-evidence",
    "title": "Record your save test",
    "question": "What happened to Ju after you signed out and signed in again?",
    "starter": "After signing in again, Ju showed ___.",
    "phase": "4 · Save learning progress",
    "kind": "response",
    "image": null,
    "links": []
  },
  {
    "id": "save-check",
    "title": "Check whose progress saves",
    "question": "Two learners sign in with different accounts. Whose progress should Mark as learned change?",
    "options": [
      "Only the signed-in learner’s progress",
      "Every learner’s progress",
      "Only the teacher’s progress"
    ],
    "answer": 0,
    "hint": "The helper uses the ID of the person signed in.",
    "phase": "4 · Save learning progress",
    "kind": "check",
    "image": null,
    "links": []
  },
  {
    "id": "independent",
    "title": "Make one small improvement",
    "do": "Switch to MIT App Inventor and click Designer. Select InstructionLabel and change its Text to your own short English instruction.",
    "expected": "Export a new .aia and choose it in our viewer. Your new instruction appears and the four buttons still work.",
    "image": null,
    "why": "You now have the four connected controls. Make a small wording change while keeping those working connections.",
    "help": null,
    "phase": "5 · Test and export",
    "stage": "independent",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "The supplied instruction.",
    "after": "Your own instruction; the buttons still work.",
    "where": "In App Inventor · Designer",
    "visuals": [
      {
        "src": "assets/runtime/stage-18-controls.png",
        "label": "Original instruction"
      },
      {
        "src": "assets/runtime/stage-19-controls.png",
        "label": "One possible change"
      }
    ],
    "visualKind": "runtime",
    "visualCaption": "Actual Web Preview screenshots. Write your own short instruction."
  },
  {
    "id": "export",
    "title": "Export the editable project",
    "do": "In the MIT App Inventor tab, open Projects and choose Export selected project (.aia) to my computer.",
    "expected": "An .aia copy of your current project is in Downloads.",
    "image": null,
    "why": "An .aia keeps the editable design, blocks and recordings. This is the file you can import later to continue building.",
    "help": "Use the menu option containing .aia. Keep the project file; screenshots alone cannot rebuild the app.",
    "phase": "5 · Test and export",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "Your work is open in App Inventor.",
    "after": "An editable backup is in Downloads.",
    "where": "In App Inventor · Projects",
    "visuals": [
      {
        "src": "assets/screenshots/menu-export.jpg",
        "label": "Projects → Export selected project"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "build-apk",
    "title": "Optional: build an Android file",
    "do": "If your teacher asks for an APK, choose Build → Android App (.apk) and download it. Otherwise, continue to the final viewer test.",
    "expected": "Your editable .aia is saved. An APK is needed only if your teacher requests one.",
    "image": null,
    "why": "The viewer is our classroom test tool. An APK is an optional Android installation file.",
    "help": "Building or installing an APK is not required for the viewer tests.",
    "phase": "5 · Test and export",
    "stage": "guided",
    "links": [],
    "block": false,
    "download": null,
    "before": "An editable project.",
    "after": "An Android installation file.",
    "where": "Optional · MIT App Inventor Build",
    "visuals": [
      {
        "src": "assets/screenshots/menu-build.jpg",
        "label": "Build → Android App (.apk)"
      }
    ],
    "visualKind": "designer",
    "visualCaption": "Actual local MIT App Inventor Designer captures. Gray outlines and empty spaces are editor guides, not a phone test."
  },
  {
    "id": "installed-test",
    "title": "Run the final viewer test",
    "do": "Open our viewer and choose your latest exported .aia. Sign in if asked. Test Listen, Next, Previous and Mark as learned, then click Progress to check the count.",
    "expected": "All four controls work in our viewer. Record any problem you still need to fix.",
    "image": null,
    "why": "Our viewer tests the exported file you choose. Export again after making any final changes in MIT.",
    "help": "Fix the matching Click event in MIT App Inventor, export a new .aia, then choose that new file in our viewer and try again.",
    "phase": "5 · Test and export",
    "stage": "guided",
    "links": [
      [
        "Open our app viewer",
        "viewer/index.html"
      ]
    ],
    "block": false,
    "download": null,
    "before": "You have finished editing.",
    "after": "The latest version has been tested in our viewer.",
    "where": "In our viewer · final test"
  },
  {
    "id": "final-evidence",
    "title": "Explain one connection",
    "question": "Choose one of your four buttons. Explain what its Click event calls and what that helper does.",
    "starter": "When I tap ___, the Click event calls ___. The helper ___.",
    "phase": "5 · Test and export",
    "kind": "response",
    "image": null,
    "links": []
  },
  {
    "id": "files-evidence",
    "title": "Keep your evidence",
    "question": "Write your exported .aia filename and state which controls you tested in our viewer.",
    "starter": "My project file is ___. In the viewer, I tested ___.",
    "phase": "5 · Test and export",
    "kind": "response",
    "image": null,
    "links": []
  },
  {
    "id": "review",
    "title": "Your build record",
    "kind": "review",
    "stage": "review",
    "phase": "Finish",
    "image": null,
    "links": []
  }
];
