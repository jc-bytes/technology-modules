export const buildSteps = [
  {
    "id": "goal",
    "title": "One program, three results",
    "where": "At your already-built walking stick",
    "why": "The sensor reads distance. Your program chooses a result. A valid near reading gives X and a sound. A valid farther reading gives a blank display and silence. An unusable reading gives ? and UNKNOWN.",
    "do": "Use Blocks view in your working MakeCode project. Follow this guide with the separate sound page.",
    "expected": "You will update one project and keep the built sensor wiring. Code panels show the same blocks in JavaScript; they are not a replacement sensor program.",
    "help": "Keep the model on a table during tests. This is a classroom prototype, not tested mobility equipment.",
    "links": [],
    "stage": "guided",
    "image": "assets/input-output.svg",
    "alt": "One program, three results reference drawing. Open full size for the labels."
  },
  {
    "id": "open-team-project",
    "title": "Open and protect the working program",
    "where": "In MakeCode · Home → your team project",
    "why": "Your working program has the sensor settings that match the built model. A saved copy lets you undo today’s changes.",
    "do": "Open the latest team project, then download a backup named WalkingStick_BeforeBluetooth.hex.",
    "expected": "The working sensor blocks are visible and the starting file is saved in the team folder.",
    "help": "For a saved .hex, use Import → Import File. Do not start from the older Mandrake program or change pins to P15/P16 just because it used them.",
    "links": [
      [
        "Open MakeCode",
        "https://makecode.microbit.org/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "sensor-profile",
    "title": "Check the existing sensor once",
    "where": "With your teacher · current sensor program",
    "why": "Keep the sensor blocks, extension and pins that already work. Find the distance in centimetres, written cm. Also find how this sensor reports a failed reading.",
    "do": "With your teacher, find the forever loop that reads the sensor, the value in cm and the test that separates usable readings from failed ones.",
    "expected": "The teacher has checked all three before you continue. If one is missing, keep the backup and stop here for preparation.",
    "help": "If the program has no checked failure rule, stop here for the teacher to prepare it. A positive number is not automatically valid. Only raw HC-SR04 Echo microseconds use /58; never divide a value already in centimetres again.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "rule",
    "title": "Keep the 30 cm rule",
    "where": "In the existing sensor decision blocks",
    "why": "Check for a usable reading first. Then compare the distance with 30 cm. The symbol ≤ means less than or equal to, so exactly 30 cm counts as near.",
    "do": "Follow the arrows: failed reading → ?; usable reading at or below 30 cm → X; usable reading above 30 cm → blank.",
    "expected": "All three outcomes belong to the same loop that reads the sensor.",
    "help": "Keep an existing correct decision. If it is missing, build the outer valid/invalid if first, then the ≤30 if inside its valid branch, using the checked sensor value.",
    "links": [],
    "stage": "guided",
    "image": "assets/decision.svg",
    "alt": "Keep the 30 cm rule reference drawing. Open full size for the labels."
  },
  {
    "id": "bluetooth-sound",
    "title": "Add Bluetooth to this project",
    "where": "In MakeCode · Extensions",
    "why": "Bluetooth lets the board send messages without a cable. The UART service sends the short text messages that the sound page understands.",
    "do": "Open Extensions and add the official Bluetooth extension.",
    "expected": "Bluetooth blocks appear and the existing sensor blocks remain available.",
    "help": "Add Bluetooth to this same sensor project. If MakeCode reports conflicting extensions or a memory error, keep the backup and ask your teacher to resolve it. Do not delete the working sensor extension.",
    "links": [
      [
        "Bluetooth UART reference",
        "https://makecode.microbit.org/reference/bluetooth/start-uart-service"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "connection-setting",
    "title": "Use the checked classroom setting",
    "where": "In MakeCode · Project Settings",
    "why": "For this supervised demonstration, the teacher checks No Pairing Required. This permits nearby devices to connect. Chrome still asks you to select a device.",
    "do": "Select the teacher-approved No Pairing Required setting for this classroom demonstration.",
    "expected": "The project has the checked setting before it is downloaded.",
    "help": "If school policy requires another mode, the teacher must verify that pairing route. Never identify your board by guessing among nearby devices.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "start-uart",
    "title": "Prepare the two message variables",
    "where": "In MakeCode · Variables and on start",
    "why": "A variable is a named box that remembers a value. stickStatus holds text. btConnected holds true or false to remember the connection.",
    "do": "In Variables → Make a Variable, create stickStatus and btConnected. In on start, set stickStatus to the text UNKNOWN and btConnected to the Logic value false. Add Bluetooth → start UART service.",
    "expected": "The on start block has both set blocks and one start UART service block. UNKNOWN means no usable result yet.",
    "help": "For UNKNOWN, use a Text block and type the word in capitals. For false, use Logic, not a text block. Reuse any matching startup blocks already present. The download is a setup reference, not a complete sensor program.",
    "links": [
      [
        "Download Bluetooth setup reference",
        "downloads/WalkingStick_Bluetooth_Setup.ts"
      ]
    ],
    "stage": "guided",
    "code": "let stickStatus = \"UNKNOWN\"\nlet btConnected = false\nbluetooth.startUartService()"
  },
  {
    "id": "connection-events",
    "title": "Remember connection and disconnection",
    "where": "In MakeCode · Bluetooth events",
    "why": "An event runs when something happens. These two events remember when the website connects or disconnects. The sensor loop still controls the display.",
    "do": "From Bluetooth, add on bluetooth connected and put set btConnected to true inside it. Add on bluetooth disconnected; put set btConnected to false and set stickStatus to UNKNOWN inside it.",
    "expected": "Each event exists once. true means connected; false means disconnected.",
    "help": "Do not put sensor reading or a second forever loop in these events. Remove old temporary connection-display animations if they cover the sensor warning.",
    "links": [],
    "stage": "guided",
    "code": "bluetooth.onBluetoothConnected(function () {\n    btConnected = true\n})\nbluetooth.onBluetoothDisconnected(function () {\n    btConnected = false\n    stickStatus = \"UNKNOWN\"\n})"
  },
  {
    "id": "near-message",
    "title": "Add the near message",
    "where": "In the existing valid, distance ≤30 cm branch",
    "why": "The same decision must drive both the display and the message. This branch is reached only after a usable reading.",
    "do": "From Variables, drag set stickStatus to into the existing near branch, beside the X display. Put a Text block in its value space and type NEAR in capitals.",
    "expected": "A valid near reading selects NEAR and still shows X.",
    "help": "Keep the exact uppercase word. Use the existing near branch; do not add another sensor read for Bluetooth.",
    "links": [],
    "stage": "guided",
    "code": "stickStatus = \"NEAR\"\n// Keep the existing X display in this branch."
  },
  {
    "id": "far-message",
    "title": "Add the farther message",
    "where": "In the existing valid, distance >30 cm branch",
    "why": "FAR means the latest valid measurement is farther than 30 cm. It does not prove a whole walking route is clear.",
    "do": "Add another set stickStatus to block inside the existing farther branch, beside clear screen. Put the text FAR in its value space.",
    "expected": "A valid farther reading selects FAR and clears the display.",
    "help": "Keep this branch inside the valid-reading decision. A failed reading must not fall into FAR.",
    "links": [],
    "stage": "guided",
    "code": "stickStatus = \"FAR\"\n// Keep the existing clear-screen block in this branch."
  },
  {
    "id": "unknown-message",
    "title": "Add the unusable-reading message",
    "where": "In the existing invalid-reading branch",
    "why": "A failed measurement must choose UNKNOWN. It must never be treated as a large, valid distance.",
    "do": "Add set stickStatus to inside the existing failed-reading branch, beside the ? display. Use the text UNKNOWN.",
    "expected": "The checked invalid-reading path chooses UNKNOWN, not FAR.",
    "help": "Keep the checked sensor failure condition. The older Mandrake example sent 50000 for a failed reading. Do not copy that placeholder into another sensor program or let it become FAR.",
    "links": [],
    "stage": "guided",
    "code": "stickStatus = \"UNKNOWN\"\n// Keep the existing question-mark display in this branch."
  },
  {
    "id": "send-fresh",
    "title": "Send after the fresh sensor decision",
    "where": "In the same sensor-reading forever loop",
    "why": "Use one sender in the same forever loop that reads the sensor. It must send after the whole near/far/failed decision, so it reports the newest result.",
    "do": "Remove the old distance: send blocks and any separate sending loop. After the complete sensor decision, add a Logic if with btConnected as its condition. Inside it, add Bluetooth uart write line with the stickStatus variable. Put one checked 500 ms pause after the if.",
    "expected": "The sensor read stays in place. Only NEAR, FAR or UNKNOWN is sent. The write line block adds the line ending for you.",
    "help": "Do not add a new forever sender. 500 milliseconds is half a second. If the sensor loop already pauses, have your teacher keep one suitable pause instead of stacking waits. The website does not accept distance: numbers.",
    "links": [],
    "stage": "guided",
    "code": "// Inside the EXISTING sensor loop, after its whole decision:\nif (btConnected) {\n    bluetooth.uartWriteLine(stickStatus)\n}\nbasic.pause(500)"
  },
  {
    "id": "save-transfer",
    "title": "Save and run the updated program",
    "where": "In MakeCode · Download, then the MICROBIT drive",
    "why": "A numbered file records the exact program being tested. The simulator cannot prove a physical ultrasonic reading or Bluetooth link.",
    "do": "Download the next unused numbered .hex, for example WalkingStick_02.hex. Copy it to the MICROBIT drive using the checked USB data cable.",
    "expected": "Wait for copying and flashing to finish. Keep the cable connected until the board is running the updated program.",
    "help": "Keep the earlier backup. If MakeCode shows errors or downloading removes a needed setting, resolve that before testing the model.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "sound-page",
    "title": "Open the sound page",
    "where": "In Chrome · a separate tab",
    "why": "The website is already provided. It plays the warning sent by your micro:bit. Browsers wait for a click before allowing sound.",
    "do": "Open Walking-stick sounds and click Enable sound.",
    "expected": "The page is ready to play a warning; connecting is the next step.",
    "help": "Use the checked Chrome laptop and HTTPS site. Keep its tab visible during each test. The labelled demo is only a website demonstration, not a Bluetooth test.",
    "links": [
      [
        "Open Walking-stick sounds",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "connect-board",
    "title": "Connect your team’s micro:bit",
    "where": "On Walking-stick sounds",
    "why": "Chrome asks which nearby board to connect. Your program must be running on the board you choose.",
    "do": "Click Connect micro:bit and select your team’s identified device.",
    "expected": "The website shows a live connection and receives fresh sensor messages.",
    "help": "If no board appears, check Bluetooth, the uploaded UART program and its connection setting. Use the teacher-checked laptop; Chrome on iPhone or iPad cannot make this Web Bluetooth connection.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "test-near",
    "title": "Test cardboard at 20 cm",
    "where": "At the tabletop model · sound tab visible",
    "why": "This checks the whole path: sensor → program → Bluetooth → website → speaker. Use a ruler, not a guessed distance.",
    "do": "Place the cardboard 20 cm from the sensor’s front face and observe both displays and the sound.",
    "expected": "A usable reading near 20 cm gives X, NEAR and the near warning.",
    "help": "If results disagree, keep the model on the table and compare the actual sensor reading, message and uploaded version.",
    "links": [],
    "stage": "guided",
    "image": "assets/test-positions.svg",
    "alt": "Test cardboard at 20 cm reference drawing. Open full size for the labels."
  },
  {
    "id": "test-far",
    "title": "Move the same cardboard to 40 cm",
    "where": "At the tabletop model · sound tab visible",
    "why": "Keep the object and setup the same while changing the distance. The result must come from a valid new reading.",
    "do": "Move the cardboard to 40 cm from the sensor face and observe again.",
    "expected": "A usable reading near 40 cm gives a blank display and FAR. The near warning stops.",
    "help": "The sound page says Beyond 30 cm. That describes the reported measurement, not proof that the surroundings are safe.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "test-unknown",
    "title": "Check an unusable sensor reading",
    "where": "With your teacher · sound tab visible",
    "why": "The error path matters as much as the near and far paths. Different sensors need different safe invalid-reading tests.",
    "do": "Have your teacher run the already-checked unusable-reading test for this model.",
    "expected": "The board shows ? and the website reports UNKNOWN, with the near warning stopped.",
    "help": "Do not move live sensor wires to force an error. If a safe test is not prepared, record Test not run and have the teacher arrange it.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "test-connection-loss",
    "title": "Check loss of the connection",
    "where": "On Walking-stick sounds · tabletop model",
    "why": "A disconnected board must not leave an old warning sounding. Separately, more than three seconds without fresh complete messages makes the page show Signal paused.",
    "do": "Click Disconnect and check that sound stops. Reconnect the same board and wait for a fresh result.",
    "expected": "The page shows disconnection, then returns to live sensor messages after reconnecting.",
    "help": "For a separate stale-stream check, the teacher can pause sending in a checked test copy while keeping Bluetooth connected. The labelled website demo’s Stop messages button tests the page timer only, not the sensor or Bluetooth.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "record-trials",
    "title": "Keep three real trials at each distance",
    "where": "In your existing team test record",
    "why": "One successful try can happen by chance. Repeat the same measured positions so failures are visible too.",
    "do": "Run three trials at 20 cm and three at 40 cm. Record distance, actual reading, board display, website message and sound.",
    "expected": "Six real trials show what happened, including any failed or missing readings.",
    "help": "Keep the fan, moving people or other obstacles away from the measured path. Do not replace a missing reading with a made-up zero.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "improve-retest",
    "title": "Improve one thing and repeat the tests",
    "where": "In the same project and team test record",
    "why": "Changing one thing helps you see what caused a difference. Keep the original observations.",
    "do": "Choose one checked correction using the first results. Save the next numbered .hex and copy it to MICROBIT. Wait for transfer to finish, reconnect the sound page, then repeat the same six trials.",
    "expected": "A separate after-change record can be compared with the original.",
    "help": "Keep the original results and the 30 cm rule. If every trial worked, record that no correction was needed. If a correction is made, fix one thing, such as a wrong message branch or duplicate sender. Ask the teacher before changing physical settings or sensor timing.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "save-evidence",
    "title": "Save the final program and results",
    "where": "In your existing team folder and shared report",
    "why": "The saved code should match the program that produced the recorded behavior. The guide itself does not collect answers.",
    "do": "Keep the final numbered .hex and actual test notes in the team folder. Update Test and improvement in the shared report.",
    "expected": "The next editor can find the working version, results and any untested behavior.",
    "help": "Keep Project, Research, Test and improvement, References. Label missing tests honestly. Use the exact sources you actually consulted.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "submit",
    "title": "Use the existing team handoff",
    "where": "In Google Classroom · existing STEAM assignment",
    "why": "The teacher needs access to the shared report and the final program that your team demonstrates. This is the same project, not another assignment.",
    "do": "Have one team member attach the shared report and final numbered .hex to the existing assignment by its announced deadline.",
    "expected": "The files open for your teacher and match the demonstrated tabletop model.",
    "help": "Each member explains their contribution and one actual result. The website does not submit files for you.",
    "links": [],
    "stage": "guided"
  }
];
