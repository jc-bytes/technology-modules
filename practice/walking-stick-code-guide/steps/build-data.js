export const buildSteps = [
  {
    "id": "goal",
    "title": "One project, four separate stacks",
    "where": "At your already-built walking stick",
    "why": "on start runs once. The two Bluetooth events remember connection changes. forever reads the sensor again and again, chooses one result and sends it.",
    "do": "Use your working sensor project. Follow this four-stack plan while keeping the built sensor wiring.",
    "expected": "NEAR, FAR and failed-reading UNKNOWN belong in different forever branches. The sensor read and message sender repeat together.",
    "help": "Keep the model on a table during tests. This is a classroom prototype, not tested mobility equipment.",
    "links": [],
    "stage": "guided",
    "diagram": "overview",
    "wideDiagram": false
  },
  {
    "id": "open-team-project",
    "title": "Open and protect the working program",
    "where": "In MakeCode · Home → your team project",
    "why": "Your working program has the sensor settings that match the built model. A saved copy lets you undo today’s changes.",
    "do": "Open the latest team project, then download a backup named WalkingStick_BeforeBluetooth.hex.",
    "expected": "Your working sensor program is open and backed up. You can see its sensor-reading forever stack. Bluetooth setup alone is not the walking-stick program.",
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
    "title": "Build the sensor decision inside forever",
    "where": "Inside the existing forever · immediately after the sensor read",
    "why": "The outer if/else checks the reading. Inside its usable path, a second if/else checks the distance.",
    "do": "Keep or add an outer Logic if/else after the sensor read, using the checked usable-reading condition. Inside its usable branch, keep or add an if/else comparing your cm value ≤ 30. Put X in this inner if, clear screen in its else, and ? in the outer failed-reading branch.",
    "expected": "If displays are missing, use Basic show icon with X, clear screen, and show string with ?. Add only missing blocks. The next pages add the message assignments.",
    "help": "Use the + on a Logic if to add an else branch. Use a Logic comparison set to ≤ with your existing cm value and 30. The bracketed valid-reading condition is your teacher-checked sensor rule, not a new block to search for. Keep an existing correct decision and its actual branch meanings.",
    "links": [
      [
        "See the complete program layout",
        "#complete-program"
      ]
    ],
    "stage": "guided",
    "diagram": "decision",
    "wideDiagram": false
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
    "title": "Fill only the on start stack",
    "where": "Inside on start · not inside forever or an event",
    "why": "on start runs once. Bluetooth uart service prepares the message service. Bluetooth uart write sends a result and belongs later in forever.",
    "do": "Create stickStatus and btConnected in Variables. In on start, keep one set stickStatus to UNKNOWN, one set btConnected to Logic false and one Bluetooth uart service. Remove misplaced NEAR/FAR setters, extra UNKNOWN setters, all UART write blocks, send if blocks and loop pauses from on start.",
    "expected": "Keep any existing sensor setup. Startup has UART service, not UART write. The result choices and sending blocks will go in forever.",
    "help": "A variable is a named box for a value. stickStatus holds text; use a Text block for UNKNOWN. btConnected holds true or false; use Logic false. If repairing the earlier straight stack, remove only the misplaced Bluetooth/result/send blocks. Keep the real sensor setup.",
    "links": [],
    "stage": "guided",
    "diagram": "startup"
  },
  {
    "id": "connection-events",
    "title": "Build the two separate event stacks",
    "where": "Two separate top-level stacks · outside on start and forever",
    "why": "An event runs when something happens. These two events remember when the website connects or disconnects. The sensor loop still controls the display.",
    "do": "From Bluetooth, drag on bluetooth connected into an empty workspace area and put set btConnected to true inside it. Beside it, add on bluetooth disconnected with set btConnected to false and set stickStatus to UNKNOWN.",
    "expected": "Two separate event stacks look like the diagram. Neither event contains sensor reads, NEAR/FAR decisions or the send block.",
    "help": "Do not put sensor reading or a second forever loop in these events. Remove old temporary connection-display animations if they cover the sensor warning.",
    "links": [],
    "stage": "guided",
    "diagram": "events"
  },
  {
    "id": "near-message",
    "title": "Add the near message",
    "where": "forever → usable-reading branch → distance ≤ 30 branch",
    "why": "An if/else chooses one path. The near result belongs inside the usable-reading path, where the checked distance is at or below 30 cm.",
    "do": "Inside the existing forever stack, find the usable-reading test and its distance ≤ 30 branch. Put set stickStatus to the text NEAR directly beside the existing X display.",
    "expected": "NEAR is nested inside both checks. It is not in on start. Exactly 30 cm belongs to this near branch.",
    "help": "Keep the exact uppercase word. Use the existing near branch; do not add another sensor read for Bluetooth.",
    "links": [],
    "stage": "guided",
    "diagram": "near"
  },
  {
    "id": "far-message",
    "title": "Add the farther message",
    "where": "forever → usable-reading branch → distance check’s else",
    "why": "This else belongs to the distance check. It runs only when the reading is usable and the distance is above 30 cm.",
    "do": "Inside the same usable-reading path, find the else paired with distance ≤ 30. Put set stickStatus to the text FAR beside the existing clear screen block.",
    "expected": "FAR is inside the distance check’s else. Do not put it after NEAR or outside the usable-reading test.",
    "help": "Keep this branch inside the valid-reading decision. A failed reading must not fall into FAR.",
    "links": [],
    "stage": "guided",
    "diagram": "far"
  },
  {
    "id": "unknown-message",
    "title": "Add the unusable-reading message",
    "where": "forever → failed-reading branch of the outer sensor test",
    "why": "The failed-reading branch is separate from both usable-distance branches. It must not fall through to FAR.",
    "do": "Find the failed-reading branch paired with the outer usable-reading test. Put set stickStatus to the text UNKNOWN beside the existing ? display.",
    "expected": "Each fresh reading selects only one result: NEAR, FAR or UNKNOWN. UNKNOWN does not sit after FAR in a straight stack.",
    "help": "Use your existing checked validity rule. The diagram puts usable readings in if and failed ones in else. If your existing test is the other way round, keep its correct branch meanings. Never treat the older 50000 placeholder as a usable far distance.",
    "links": [],
    "stage": "guided",
    "diagram": "unknown"
  },
  {
    "id": "send-fresh",
    "title": "Send at the bottom of forever",
    "where": "Inside the same forever · after the entire sensor if/else",
    "why": "The complete sensor decision finishes first. The send if is a separate block after that decision, still inside forever.",
    "do": "Keep the sensor read. Remove old distance: send blocks and any separate sending loop. After the whole sensor decision, add if btConnected with Bluetooth uart write line stickStatus inside it. Put one checked pause 500 after the send if.",
    "expected": "The send if is not inside NEAR, FAR, UNKNOWN or on start. The pause is inside forever but outside the send if, so it runs even when disconnected.",
    "help": "Close the full sensor decision before placing the send if. Match the nesting in the diagram. Reuse one suitable existing pause with your teacher rather than stacking waits. Write line adds the line ending automatically.",
    "links": [],
    "stage": "guided",
    "diagram": "send"
  },
  {
    "id": "complete-program",
    "title": "Compare the complete program",
    "where": "In MakeCode · all four stacks before Download",
    "why": "The four stacks work together. The left stacks prepare and remember the connection. The forever stack keeps reading, chooses one result and then sends it.",
    "do": "Scroll through all four stacks and compare them with your workspace. Check the two different else branches and the send if after the complete sensor decision. Open the map on its own for a larger view.",
    "expected": "on start has initial UNKNOWN, false and UART service. NEAR/FAR/failed UNKNOWN sit in their own forever branches. The send if and pause are at the bottom of that same forever.",
    "help": "This is a complete placement map, not an importable replacement sensor program. Dashed boxes and bracketed labels mean your existing checked sensor read, value, setup or validity condition. Keep those real blocks. If they are missing, reopen the saved working sensor project before continuing.",
    "links": [
      [
        "Open the complete map on its own",
        "downloads/WalkingStick_Complete_Block_Map.html"
      ]
    ],
    "stage": "guided",
    "diagram": "complete",
    "wideDiagram": true
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
