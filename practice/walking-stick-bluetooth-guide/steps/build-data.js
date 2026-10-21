export const buildSteps = [
  {
    "id": "bt-goal",
    "title": "Make the message travel",
    "why": "Your micro:bit makes a decision. Bluetooth sends that decision to the sound website. The laptop or Android device plays the sound.",
    "where": "In this guide",
    "do": "Follow the path from micro:bit to the website.",
    "expected": "The micro:bit sends text. The website plays the warning.",
    "links": [],
    "image": "assets/bluetooth-path.svg",
    "alt": "A microbit sends NEAR, FAR or UNKNOWN over Bluetooth to a browser, which plays sound through its device speakers.",
    "stage": "model"
  },
  {
    "id": "bt-new-project",
    "title": "Start a button rehearsal",
    "why": "Bluetooth sends a short message without a cable. First use buttons as pretend sensor results. This checks the connection before you change your sensor program.",
    "where": "In MakeCode · Home",
    "do": "Create a new project named WalkingStick_BLE_Rehearsal_01.",
    "expected": "A separate blank rehearsal project opens.",
    "help": "Keep your latest working sensor .hex saved in the team folder. This rehearsal has no sensor code and cannot measure an obstacle.",
    "links": [
      [
        "Open MakeCode",
        "https://makecode.microbit.org/"
      ]
    ],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-extension",
    "title": "Add Bluetooth blocks",
    "why": "An extension adds blocks to MakeCode. Bluetooth and micro:bit radio cannot run together.",
    "where": "In MakeCode · Extensions",
    "do": "Search for Bluetooth and select the official Bluetooth extension.",
    "expected": "The Bluetooth category appears in the block toolbox.",
    "help": "If MakeCode asks to remove radio, check with your teacher that the project does not need it before accepting. Keep the sensor extension when you later add Bluetooth to the sensor project.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-pairing",
    "title": "Set the classroom connection mode",
    "why": "For this supervised browser test, No Pairing Required lets the website connect. Anyone nearby can also connect, so use this mode only for the teacher-approved tabletop demonstration.",
    "where": "With your teacher · MakeCode gear menu → Project Settings",
    "do": "Have your teacher select No Pairing Required: Anyone can connect via Bluetooth for the rehearsal project.",
    "expected": "The rehearsal uses the teacher-approved no-pairing setting.",
    "help": "This is a visible project security choice. The browser chooser still asks permission to select a device. If your teacher requires another mode, stop and use their checked computer and pairing steps instead.",
    "links": [
      [
        "Official MakeCode pairing-mode explanation",
        "https://support.microbit.org/support/solutions/articles/19000080745-what-are-the-different-bluetooth-pairing-modes-in-makecode-"
      ]
    ],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-service",
    "title": "Start the message service",
    "why": "UART is a service for sending short text messages. Starting it makes this message channel available when the program starts.",
    "where": "In MakeCode · on start",
    "do": "Place Bluetooth → bluetooth uart service inside on start.",
    "expected": "The program starts the UART service once.",
    "help": "Expand the Bluetooth category or its more section to find the UART blocks.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "bluetooth.startUartService()"
  },
  {
    "id": "bt-status",
    "title": "Start with an unknown result",
    "why": "A variable is a named place holding a value. status holds the message we will send. UNKNOWN means we have no usable sensor result.",
    "where": "In MakeCode · Variables and on start",
    "do": "Create status and set it to the text \"UNKNOWN\" in on start.",
    "expected": "status starts as text in uppercase.",
    "help": "Use a text value with quotes in JavaScript. Do not type UNKNOWN as a variable name.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "let status = \"UNKNOWN\""
  },
  {
    "id": "bt-flag",
    "title": "Start disconnected",
    "why": "btConnected holds true or false. At startup the website has not connected yet.",
    "where": "In MakeCode · Variables and on start",
    "do": "Create btConnected and set it to Logic → false in on start.",
    "expected": "btConnected starts false.",
    "help": "False is a Logic value. Do not use the text \"false\".",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "let btConnected = false"
  },
  {
    "id": "bt-connected",
    "title": "Notice a connection",
    "why": "An event runs when something happens. This event runs when the micro:bit gets a Bluetooth connection.",
    "where": "In MakeCode · Bluetooth",
    "do": "Add on bluetooth connected and put set btConnected to true inside it.",
    "expected": "The flag becomes true when a device connects.",
    "help": "This means a device connected. It does not confirm a sensor reading or prove which person is using the device.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "bluetooth.onBluetoothConnected(function () {\n    btConnected = true\n})"
  },
  {
    "id": "bt-disconnected",
    "title": "Notice a lost connection",
    "why": "When the connection closes, the program must stop sending and stop keeping an old result as its starting state.",
    "where": "In MakeCode · Bluetooth",
    "do": "Add on bluetooth disconnected with btConnected set to false and status set to \"UNKNOWN\".",
    "expected": "A lost connection clears the connection flag and old status.",
    "help": "Keep these assignments in this event. They do not change the sensor wiring.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "bluetooth.onBluetoothDisconnected(function () {\n    btConnected = false\n    status = \"UNKNOWN\"\n})"
  },
  {
    "id": "bt-button-near",
    "title": "Make A mean near",
    "why": "The buttons are temporary pretend inputs. NEAR is the exact message for a usable distance at 30 cm or nearer.",
    "where": "In MakeCode · Input",
    "do": "Add on button A pressed and set status to \"NEAR\" inside it.",
    "expected": "Pressing A selects the NEAR message.",
    "help": "This changes text only. It does not take a sensor measurement.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "input.onButtonPressed(Button.A, function () {\n    status = \"NEAR\"\n})"
  },
  {
    "id": "bt-button-far",
    "title": "Make B mean farther",
    "why": "FAR means a usable sensor reading above 30 cm. It never means every possible obstacle has been checked.",
    "where": "In MakeCode · Input",
    "do": "Add on button B pressed and set status to \"FAR\" inside it.",
    "expected": "Pressing B selects the FAR message.",
    "help": "",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "input.onButtonPressed(Button.B, function () {\n    status = \"FAR\"\n})"
  },
  {
    "id": "bt-button-unknown",
    "title": "Make A+B mean unknown",
    "why": "UNKNOWN is different from FAR. A missing or unusable measurement cannot say that the area is clear.",
    "where": "In MakeCode · Input",
    "do": "Add on button A+B pressed and set status to \"UNKNOWN\" inside it.",
    "expected": "Pressing A and B together selects UNKNOWN.",
    "help": "",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "input.onButtonPressed(Button.AB, function () {\n    status = \"UNKNOWN\"\n})"
  },
  {
    "id": "bt-guard",
    "title": "Send only while connected",
    "why": "Forever repeats its instructions. The if block allows a send only when btConnected is true.",
    "where": "In MakeCode · Basic and Logic",
    "do": "Place if btConnected then inside a forever block.",
    "expected": "The forever loop contains a connection check.",
    "help": "Keep this sending loop separate from the sensor loop when you add it later.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "basic.forever(function () {\n    if (btConnected) {\n        // Put the send block here next.\n    }\n})"
  },
  {
    "id": "bt-send-line",
    "title": "Send one whole message",
    "why": "The website reads one message per line. uart write line adds the line ending for you.",
    "where": "In MakeCode · inside if btConnected",
    "do": "Place Bluetooth → uart write line with status in its text slot.",
    "expected": "The selected message is sent as a complete line.",
    "help": "Use uart write line, not uart write string. Do not add extra labels, numbers or spaces to the status text.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "bluetooth.uartWriteLine(status)"
  },
  {
    "id": "bt-heartbeat",
    "title": "Wait half a second",
    "why": "500 milliseconds is half a second. Repeating the message lets the website notice when messages stop arriving.",
    "where": "In MakeCode · forever, below the whole if block",
    "do": "Place Basic → pause 500 outside the if block, at the bottom of forever.",
    "expected": "The loop sends at roughly half-second intervals while connected.",
    "help": "The pause stays outside if so the loop also waits when disconnected. This heartbeat confirms recent messages, not a fresh sensor measurement by itself.",
    "links": [
      [
        "Complete button rehearsal reference, .ts",
        "downloads/WalkingStick_BLE_Button_Reference.ts"
      ]
    ],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "basic.forever(function () {\n    if (btConnected) {\n        bluetooth.uartWriteLine(status)\n    }\n    basic.pause(500)\n})"
  },
  {
    "id": "bt-flash",
    "title": "Run your rehearsal",
    "why": "The physical micro:bit must run the new program before it can send messages to the website.",
    "where": "In MakeCode · Download, then computer MICROBIT drive",
    "do": "Download WalkingStick_BLE_Rehearsal_01.hex and copy it to the MICROBIT drive using the checked USB connection.",
    "expected": "The micro:bit runs the rehearsal program.",
    "help": "Keep the built model on the table. The simulator does not prove a physical Bluetooth connection. Recheck the approved project security setting if flashing changed it.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-open-sounds",
    "title": "Open the sound website",
    "why": "Keep the guide visible so you can return to each instruction. The sound website receives your micro:bit messages.",
    "where": "In your browser · new tab",
    "do": "Open Walking-stick sounds in a new tab using the link below.",
    "expected": "The separate sound website opens beside this guide.",
    "help": "Use the teacher-checked browser and computer. If Bluetooth is unavailable in the page, ask for that checked setup rather than changing sensor wiring.",
    "links": [
      [
        "Open Walking-stick sounds",
        "../walking-stick-sounds/"
      ]
    ],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-enable-sound",
    "title": "Allow the website to play",
    "why": "Browsers wait for a person to click before playing sound. Enabling sound is separate from connecting a micro:bit.",
    "where": "On Walking-stick sounds",
    "do": "Click Enable sound.",
    "expected": "The page can play sound after your click.",
    "help": "Check the computer volume with your teacher. A muted computer cannot prove the sound works.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-connect",
    "title": "Connect your micro:bit",
    "why": "The browser asks which nearby device you want. Choose your team’s identified micro:bit.",
    "where": "On Walking-stick sounds",
    "do": "Click Connect micro:bit and select the team device in the browser chooser.",
    "expected": "The website shows a live connection and starts receiving UNKNOWN.",
    "help": "Select only your team’s identified device. This browser chooser gives the website permission to connect. If the device is missing, check the flashed UART program and approved Project Settings with your teacher. No Pairing Required allows nearby devices to connect too.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-try-near",
    "title": "Try the near message",
    "why": "A is still a pretend input. This test checks the message and sound path.",
    "where": "At your micro:bit and Walking-stick sounds",
    "do": "Press button A once.",
    "expected": "The page receives NEAR and gives its near warning.",
    "help": "This is a button rehearsal, not an obstacle test. If the page remains UNKNOWN, check the connection and exact uppercase text.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-try-far",
    "title": "Try the farther message",
    "why": "B changes the selected message, which the repeating loop sends again.",
    "where": "At your micro:bit and Walking-stick sounds",
    "do": "Press button B once.",
    "expected": "The page receives FAR and stops the near warning.",
    "help": "FAR reports a selected state in this rehearsal. It cannot reassure someone that a walking route is clear.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-try-unknown",
    "title": "Try the unknown message",
    "why": "Unknown must remain different from a measured farther reading.",
    "where": "At your micro:bit and Walking-stick sounds",
    "do": "Press A and B together.",
    "expected": "The page receives UNKNOWN and shows that no usable reading is available.",
    "help": "The website must not label UNKNOWN as clear or safe.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-try-disconnect",
    "title": "Check a lost connection",
    "why": "Without a connection, an earlier FAR message is no longer a current result.",
    "where": "On Walking-stick sounds",
    "do": "Click Disconnect.",
    "expected": "The page changes to disconnected or unknown and stops the near sound.",
    "help": "After reconnecting, test stopping incoming messages with your teacher. The page must become unknown when messages are stale, even if the last message was FAR.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-remove-buttons",
    "title": "Remove the rehearsal-only blocks",
    "why": "The real sensor must choose the message. Its own loop must send each result after the fresh sensor decision.",
    "where": "In MakeCode · rehearsal project",
    "do": "Delete the three temporary button event blocks and the rehearsal forever sending block.",
    "expected": "Only the variables, UART service and two connection events remain in the add-on.",
    "help": "Keep the earlier button-rehearsal .hex. Save this smaller add-on as a new version. The real sensor loop will send messages later; do not leave an extra background sender.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-open-original",
    "title": "Open the saved sensor program",
    "why": "The original program already knows your sensor’s extension, connections and valid-reading rule. Preserve that work.",
    "where": "In a second MakeCode editor tab",
    "do": "Import the latest working sensor .hex and save a new numbered copy for Bluetooth work.",
    "expected": "The saved sensor blocks are visible in a separate project.",
    "help": "Confirm it is the working walking-stick program. If it already uses names status or btConnected for another job, ask your teacher to resolve those names before pasting.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-original-extension",
    "title": "Add Bluetooth to the sensor copy",
    "why": "Extensions belong to each MakeCode project. Adding Bluetooth to the rehearsal does not add it to your sensor project.",
    "where": "In MakeCode · sensor project · Extensions",
    "do": "Add the official Bluetooth extension to this saved sensor copy.",
    "expected": "This project has both its existing sensor blocks and the Bluetooth category.",
    "help": "If it asks to remove radio, check with your teacher that the sensor extension does not need radio. Do not remove the sensor extension or change its pins.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "bt-original-setting",
    "title": "Check the sensor copy connection mode",
    "why": "The sound website needs the same approved Bluetooth connection mode in the program you actually transfer.",
    "where": "With your teacher · sensor project · gear menu → Project Settings",
    "do": "Select the teacher-approved No Pairing Required setting for this saved sensor copy.",
    "expected": "The sensor copy has the same approved setting as the tested rehearsal.",
    "help": "This permits nearby devices to connect. Use this configuration for the supervised tabletop demonstration. The website chooser still asks which device to use.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "bt-append-addon",
    "title": "Move the Bluetooth setup",
    "why": "JavaScript is the text view of your blocks. The remaining add-on starts Bluetooth and records connections. It has no sensor pins or separate sender.",
    "where": "In MakeCode · rehearsal and sensor projects · JavaScript",
    "do": "Copy the remaining rehearsal JavaScript and paste it at the end of the existing sensor program.",
    "expected": "The sensor project contains the variables, UART service and connection events alongside its original sensor code.",
    "help": "Keep both editor tabs open. Add the official Bluetooth extension here if needed. Keep the sensor extension and pins. Have your teacher confirm the same approved security setting for this copy before flashing. Stop if an extension requires radio or code names conflict. Return to Blocks after errors are resolved.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-sensor-unknown",
    "title": "Send unknown for a failed reading",
    "why": "Use the original checked validity branch. A sensor error must never become FAR.",
    "where": "In MakeCode · original invalid-reading branch",
    "do": "Add set status to \"UNKNOWN\" before the existing question-mark display.",
    "expected": "The invalid branch selects UNKNOWN and still shows its existing display.",
    "help": "Keep the actual sensor’s checked validity test. Do not replace it with an assumed pin or a guessed rule such as every positive number is valid.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "status = \"UNKNOWN\"\n// Keep the existing question-mark display below this assignment."
  },
  {
    "id": "bt-sensor-near",
    "title": "Send the near sensor result",
    "why": "The original valid-reading branch already compares distanceCm with 30. Use that same decision.",
    "where": "In MakeCode · valid reading, distanceCm ≤ 30 branch",
    "do": "Add set status to \"NEAR\" before the existing X display.",
    "expected": "A usable near reading selects NEAR and still shows X.",
    "help": "",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "status = \"NEAR\"\n// Keep the existing X display below this assignment."
  },
  {
    "id": "bt-sensor-far",
    "title": "Send the farther sensor result",
    "why": "FAR belongs only to the existing valid-reading branch above 30 cm. The display remains part of your built model.",
    "where": "In MakeCode · valid reading, distanceCm > 30 branch",
    "do": "Add set status to \"FAR\" before the existing clear-screen block.",
    "expected": "A usable farther reading selects FAR and still clears the LEDs.",
    "help": "Keep all three status assignments in the original sensor decision branches. Do not create a second decision using a second reading.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "status = \"FAR\"\n// Keep the existing clear-screen block below this assignment."
  },
  {
    "id": "bt-sensor-send",
    "title": "Send after the fresh decision",
    "why": "Put sending in the same loop as the sensor decision. If that loop stops producing results, the website will stop hearing messages and show unknown.",
    "where": "In MakeCode · end of the original sensor-reading forever loop",
    "do": "Add the checked if btConnected → uart write line status stack after the complete decision, followed by pause 500.",
    "expected": "One sensor loop reads, checks validity, selects status and display, sends that status if connected, then waits.",
    "help": "Do not restore the separate rehearsal sender. Put sending outside every near, far and invalid branch so every completed reading can be reported. Keep a checked sensor timing requirement; ask your teacher to reconcile an existing pause instead of stacking duplicate waits.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided",
    "code": "// After the EXISTING fresh sensor read, validity check,\n// status assignment and display decision, in the SAME loop:\nif (btConnected) {\n    bluetooth.uartWriteLine(status)\n}\nbasic.pause(500)"
  },
  {
    "id": "bt-real-test",
    "title": "Check the real sensor messages",
    "why": "Now the sensor, rather than buttons, selects the message. Check the website and model together.",
    "where": "At the supervised tabletop model and Walking-stick sounds",
    "do": "Save and transfer the next numbered sensor .hex, reconnect the website, and run your teacher-checked 20 cm, 40 cm and unusable-reading checks.",
    "expected": "Usable 20 cm gives X and NEAR; usable 40 cm gives a blank display and FAR; an unusable reading gives ? and UNKNOWN.",
    "help": "Remove every temporary test button and the separate rehearsal sender before this check. Ask your teacher for the safe unusable-reading test; do not move live wires. The page must show unknown if processing or messages stop. Keep actual results in the existing report; this adds no new graded report.",
    "links": [],
    "phase": "Bluetooth sound",
    "stage": "guided"
  },
  {
    "id": "bt-check-message",
    "title": "Choose the message",
    "why": "The words must match exactly so both devices understand the same state.",
    "where": "In this guide",
    "kind": "check",
    "question": "Which message should an unusable reading send?",
    "options": [
      "FAR",
      "UNKNOWN",
      "NEAR"
    ],
    "answer": 1,
    "hint": "An unusable reading cannot tell us how far away the obstacle is.",
    "stage": "guided"
  },
  {
    "id": "bt-explain-result",
    "title": "Explain one real result",
    "why": "Button rehearsal and sensor tests prove different things. Use actual observations.",
    "where": "In this guide",
    "kind": "response",
    "question": "What did you test, and what happened?",
    "starter": "I tested ___. The micro:bit sent ___. The website ___. One thing we still need to check is ___.",
    "stage": "independent"
  },
  {
    "id": "bt-review",
    "title": "Review your saved answers",
    "kind": "review"
  }
];
