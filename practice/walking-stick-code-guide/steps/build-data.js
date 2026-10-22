export const buildSteps = [
  {
    "id": "goal",
    "title": "One complete sensor and Bluetooth program",
    "where": "At your already-built walking stick",
    "why": "The program measures an echo, checks whether it can use it, then chooses UNKNOWN, NEAR or FAR. The Bluetooth website plays a warning for NEAR.",
    "do": "Use the complete P0/P1 program in this guide. First protect your old work, then paste the program once and inspect its real blocks.",
    "expected": "The finished Blocks workspace has five separate stacks: on start, a sensor function, two Bluetooth events and forever.",
    "help": "Keep the existing built sensor connections: Trig P0 and Echo P1. Have the teacher check the powered sensor interface before physical tests. Keep the model on a table. This is a classroom prototype, not tested mobility equipment.",
    "links": [],
    "stage": "guided",
    "diagram": "overview"
  },
  {
    "id": "open-team-project",
    "title": "Protect the old program and make a test copy",
    "where": "In MakeCode · Home → your team project",
    "why": "The complete program will replace the code in a test copy. A backup keeps the earlier team program available.",
    "do": "Open your latest team project and download a backup named WalkingStick_BeforeBluetooth.hex. Return Home and create a new project named WalkingStick_Bluetooth_Test.",
    "expected": "Your earlier .hex is saved, and the new test project is open.",
    "help": "Keep the old team project. For an older saved .hex, use Import → Import File before making its backup. The following pages work in the new test project.",
    "links": [
      [
        "Open MakeCode",
        "https://makecode.microbit.org/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "bluetooth-sound",
    "title": "Add Bluetooth before pasting",
    "where": "In the new MakeCode test project · Extensions",
    "why": "The supplied program uses Bluetooth instructions. MakeCode needs the Bluetooth extension before it can recognize that code.",
    "do": "Open Extensions and add the official Bluetooth extension to WalkingStick_Bluetooth_Test.",
    "expected": "The Bluetooth category appears before you paste any program.",
    "help": "If MakeCode asks to remove the radio extension, Bluetooth uses its place in this test project. Keep the original project and backup. Ask the teacher to resolve a different conflict or a memory error.",
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
    "title": "Choose the classroom Bluetooth setting",
    "where": "In MakeCode · Project Settings",
    "why": "No Pairing Required lets nearby devices connect for this teacher-supervised demonstration. Chrome still asks which device to use.",
    "do": "In the test project, select the teacher-approved No Pairing Required setting before pasting and downloading the program.",
    "expected": "The Bluetooth extension and checked connection setting are ready.",
    "help": "If school policy requires a different mode, have the teacher verify that connection route. Do not guess among nearby boards.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "sensor-profile",
    "title": "Paste the complete program once",
    "where": "In WalkingStick_Bluetooth_Test · JavaScript view",
    "why": "The complete source already contains the sensor read, decisions and Bluetooth sender. Replacing the test editor once avoids duplicate stacks.",
    "do": "Open the complete code below and click Copy code. In MakeCode choose JavaScript, select all the editor text and replace it with the copied program. Then choose Blocks.",
    "expected": "MakeCode converts the program to five stacks without errors. Later pages inspect these existing blocks; do not add another copy.",
    "help": "Select the text inside the code editor, not the whole browser page. On Windows use Ctrl+A then Ctrl+V; on Mac use Command+A then Command+V. If Bluetooth names are not recognized, check the extension. If conversion fails, compare the complete source and keep the old backup.",
    "links": [
      [
        "Download the complete program source",
        "downloads/WalkingStick_Bluetooth.ts"
      ]
    ],
    "stage": "guided",
    "fullCode": true
  },
  {
    "id": "start-uart",
    "title": "Inspect the on start stack",
    "where": "In Blocks · on start",
    "why": "on start runs once. Variables are named boxes: stickStatus stores a word and btConnected stores true or false. UART service prepares Bluetooth text messages.",
    "do": "Compare your on start stack with the real block image. Find trigPin P0, echoPin P1, stickStatus UNKNOWN and Bluetooth uart service.",
    "expected": "These blocks already came from the pasted program. No NEAR/FAR decision, UART write or repeating pause is inside on start.",
    "help": "MakeCode hides default initial values in Blocks: echoTime and distanceCm begin at 0; btConnected begins false. The initial UNKNOWN is only the starting word. The forever stack later replaces it using a fresh measurement. UART service prepares sending; UART write line actually sends and belongs in forever.",
    "links": [],
    "stage": "guided",
    "diagram": "startup"
  },
  {
    "id": "rule",
    "title": "Inspect the sensor-reading function",
    "where": "In Blocks · function readUltrasonicDistance",
    "why": "A function is a named set of instructions. This one sends a short trigger pulse and returns the length of the Echo pulse in microseconds, not centimetres.",
    "do": "Find the separate readUltrasonicDistance function. Follow Trig low, wait 2 microseconds, Trig high, wait 10 microseconds, Trig low, then pulse in on Echo with a 25000-microsecond timeout.",
    "expected": "The function uses trigPin P0 and echoPin P1. It returns an echo time; the distance conversion happens later in forever.",
    "help": "A microsecond is one millionth of a second. The timeout limits how long pulse in waits; a missing pulse returns 0. The return may contain a grey JavaScript block showing pins.pulseIn(echoPin, PulseValue.High, 25000). That is expected; keep it unchanged.",
    "links": [],
    "stage": "guided",
    "diagram": "sensor"
  },
  {
    "id": "connection-events",
    "title": "Inspect the two Bluetooth events",
    "where": "In Blocks · two separate Bluetooth event stacks",
    "why": "An event runs when a connection changes. These events remember the connection state while the separate forever stack reads the sensor.",
    "do": "Find on bluetooth connected with set btConnected to true. Find on bluetooth disconnected with set btConnected to false and set stickStatus to UNKNOWN.",
    "expected": "Both event stacks match the image. They contain no sensor loop, near/far decision or sender.",
    "help": "true means a Bluetooth device is connected; false means it is not. Do not drag these blocks into on start. They already exist in the pasted program.",
    "links": [],
    "stage": "guided",
    "diagram": "events"
  },
  {
    "id": "unknown-message",
    "title": "Check the invalid echo first",
    "where": "In Blocks · forever → first if",
    "why": "forever first calls the sensor function and stores its returned time in echoTime. The first if rejects an echo below 116 or above 23200 microseconds.",
    "do": "Find set echoTime to call readUltrasonicDistance. Follow the first if: echoTime < 116 OR echoTime > 23200. Inside it, find distanceCm 0, stickStatus UNKNOWN and show string ?.",
    "expected": "A missing echo returns 0 and enters UNKNOWN. This invalid branch runs before any near/far comparison.",
    "help": "< means less than; > means greater than. OR means either condition is enough. The accepted echo interval is about 2–400 cm. distanceCm 0 here marks an unusable result; it is not a measured zero-centimetre obstacle. Do not move UNKNOWN to the end of a straight stack.",
    "links": [],
    "stage": "guided",
    "diagram": "unknown"
  },
  {
    "id": "near-message",
    "title": "Follow a usable echo to NEAR",
    "where": "In Blocks · first if’s else → distanceCm ≤ 30",
    "why": "The outer else handles accepted echoes. It divides echoTime by 58 to estimate centimetres. A second if then checks whether that distance is at or below 30 cm.",
    "do": "In the outer else, find set distanceCm to echoTime ÷ 58. Follow the inner distanceCm ≤ 30 branch to set stickStatus NEAR and show icon X.",
    "expected": "Only an accepted echo can become NEAR. Exactly 30 cm belongs to this branch.",
    "help": "÷ 58 converts this program’s raw echo time into centimetres once. ≤ means less than or equal to. The X is the No icon. Inspect the blocks already present; do not add a second conversion or another if.",
    "links": [],
    "stage": "guided",
    "diagram": "near"
  },
  {
    "id": "far-message",
    "title": "Follow a usable farther echo to FAR",
    "where": "In Blocks · outer else → inner distance check’s else",
    "why": "The inner else runs only after the echo was accepted and the distance was found to be above 30 cm.",
    "do": "Find the else paired with distanceCm ≤ 30. Follow set stickStatus to FAR and clear screen.",
    "expected": "FAR gives a blank micro:bit display. The invalid-echo branch is separate and cannot become FAR.",
    "help": "There are two different else branches. The outer else contains the conversion and whole near/far decision. This inner else contains only FAR and clear screen. Compare their nesting in the image.",
    "links": [],
    "stage": "guided",
    "diagram": "far"
  },
  {
    "id": "send-fresh",
    "title": "Inspect the sender after the whole decision",
    "where": "In Blocks · bottom of the same forever stack",
    "why": "The sensor decision chooses one word first. A separate if then sends that word only when btConnected is true.",
    "do": "After the complete sensor if/else, find if btConnected with Bluetooth uart write line stickStatus inside. Find pause 500 after that if, still inside forever.",
    "expected": "There is one sensor loop and one UART write line. Sending is outside every result branch. The pause runs even when disconnected.",
    "help": "Write line sends the chosen word with a line ending so the website can read a complete message. The 500-millisecond pause is half a second. No sender or loop pause belongs in on start. Do not append an old distance: sender.",
    "links": [],
    "stage": "guided",
    "diagram": "send"
  },
  {
    "id": "complete-program",
    "title": "Compare all five stacks before running",
    "where": "In MakeCode · whole Blocks workspace",
    "why": "The source, real block images and program on the board must agree. Inspecting the layout catches a missing or misplaced section before transfer.",
    "do": "Compare all five stacks with the complete image and source below. Check invalid echo first, conversion in its else, near/far inside that else, and the sender after the whole decision.",
    "expected": "Your test project matches the pasted P0/P1 program. It contains one sensor function, one forever, one on start and two Bluetooth events.",
    "help": "This complete source is the same program you pasted earlier. Copy it again only to replace the whole test editor if repairing it; never append a second program. Conversion to Blocks does not prove the physical sensor or Bluetooth connection works.",
    "links": [
      [
        "Download the complete program source",
        "downloads/WalkingStick_Bluetooth.ts"
      ]
    ],
    "stage": "guided",
    "diagram": "complete",
    "fullCode": true,
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
    "help": "If results disagree, keep the model on the table and compare the pasted program, board display, website word and uploaded version. This program sends status words, not numeric distances.",
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
    "why": "The first if must report UNKNOWN for a missing echo or an echo outside the accepted interval. Test this path with the teacher as well as the near and far paths.",
    "do": "Have your teacher run a safe missing-echo or out-of-range test for this built model.",
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
    "do": "Run three trials with cardboard measured at 20 cm and three at 40 cm. Record the ruler distance, board display, website word and sound for each trial.",
    "expected": "Six real trials show what happened, including any failed or missing readings.",
    "help": "The website receives UNKNOWN, NEAR or FAR, not a numeric sensor reading. Record the ruler position and the results you actually observe. Do not replace a missing result with a made-up zero.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "improve-retest",
    "title": "Improve one thing and repeat the tests",
    "where": "In the same project and team test record",
    "why": "Changing one thing helps you see what caused a difference. Keep the original observations.",
    "do": "If a correction is needed, make one teacher-checked correction using the first results. Download the next numbered .hex and copy it to MICROBIT. Wait for transfer, reconnect the sound page and repeat the same six trials.",
    "expected": "If corrected, a separate after-change record can be compared with the original. If every trial worked, record that no correction was needed.",
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
