export const buildSteps = [
  {
    "id": "goal",
    "title": "Measure distance and hear a warning",
    "where": "At your already-built walking stick",
    "why": "The micro:bit measures how far away an object is. The website shows that distance in centimetres and plays a warning when the object is 30 cm away or closer.",
    "do": "Keep the built model on a table. Save your old program, add one small JavaScript section at a time, then switch to Blocks to understand it. Test the distance and warning after building.",
    "expected": "A nearby object gives X on the micro:bit, a distance on the website and a warning sound.",
    "help": "Keep the existing built sensor connections: Trig P0 and Echo P1. Have the teacher check the powered sensor interface before physical tests. Keep the model on a table. This is a classroom prototype, not tested mobility equipment.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "open-team-project",
    "title": "Protect the old program and make a test copy",
    "where": "In MakeCode · Home → your team project",
    "why": "A backup keeps the earlier team program available while you build a new test program.",
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
    "title": "Add the Bluetooth blocks",
    "where": "In the new MakeCode test project · Extensions",
    "why": "Bluetooth lets the micro:bit send messages without a cable. Adding its extension puts Bluetooth blocks in the toolbox.",
    "do": "Open Extensions and add the official Bluetooth extension to WalkingStick_Bluetooth_Test.",
    "expected": "A Bluetooth category appears in the toolbox.",
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
    "do": "Open Settings → Project Settings and select No Pairing Required. Close the settings. Later, download this updated project to the physical micro:bit.",
    "expected": "No Pairing Required is selected. The board uses it only after you download the updated program.",
    "help": "If school policy requires a different mode, have the teacher verify that connection route. Do not guess among nearby boards.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "sensor-profile",
    "title": "Create the six named storage boxes",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "A variable is a named box that remembers a value. Two boxes hold pin names, two hold numbers, one holds a word and one holds true or false.",
    "do": "Choose JavaScript. Copy these six lines into the empty test project. Choose Blocks and find the starting values in on start.",
    "expected": "on start sets Trig to P0, Echo to P1 and stickStatus to UNKNOWN. Zero and false starting values may be hidden.",
    "help": "Type each name exactly, including capital letters. DigitalPin.P0 means pin zero; DigitalPin.P1 means pin one. 0 is a number, \"UNKNOWN\" is a text word and false means not connected. MakeCode may hide starting values of 0 and false in Blocks. If an unused name disappears, open Variables → Make a Variable and create that name again.",
    "links": [],
    "stage": "guided",
    "code": "let trigPin = DigitalPin.P0\nlet echoPin = DigitalPin.P1\nlet echoTime = 0\nlet distanceCm = 0\nlet stickStatus = \"UNKNOWN\"\nlet btConnected = false",
    "placement": "First coding step only: replace the starter code in the new test project.",
    "explain": "Each variable is a named storage box. The pin boxes say where to send and read the pulse.",
    "pairImage": "sensor-profile"
  },
  {
    "id": "start-uart",
    "title": "Start the Bluetooth message service",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "on start runs once when the program starts. UART service prepares Bluetooth text messages; it does not send a reading.",
    "do": "Keep your six variable lines. Add this one line below them. Choose Blocks and compare on start.",
    "expected": "on start now has one bluetooth uart service below the starting values.",
    "help": "Your initial zero and false values may be hidden after switching views. Do not add NEAR and FAR here: they must be chosen using each new reading.",
    "links": [],
    "stage": "guided",
    "code": "bluetooth.startUartService()",
    "placement": "Add at the bottom of the JavaScript, outside any function or event.",
    "explain": "This service prepares a Bluetooth text channel. It does not send a reading yet.",
    "pairImage": "start-uart"
  },
  {
    "id": "rule",
    "title": "Write the small sensor-reading function",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "A function is a named group of instructions. This helper sends a tiny pulse on P0, then measures how long the echo on P1 lasts. Its answer is time, not centimetres.",
    "do": "Paste the sensor helper below the code already in your project. Choose Blocks and find the separate purple function.",
    "expected": "The function is its own stack. Its return expression may appear grey, which is expected.",
    "help": "0 means trigger off; 1 means on. The waits are 2 and 10 microseconds. The return line gives back the echo time and stops waiting after 25000 microseconds. In Blocks, that return expression appears grey. It is expected. Keep the function named readUltrasonicDistance.",
    "links": [],
    "stage": "guided",
    "code": "function readUltrasonicDistance() {\n    pins.digitalWritePin(trigPin, 0)\n    control.waitMicros(2)\n    pins.digitalWritePin(trigPin, 1)\n    control.waitMicros(10)\n    pins.digitalWritePin(trigPin, 0)\n    return pins.pulseIn(echoPin, PulseValue.High, 25000)\n}",
    "placement": "Add this entire function at the bottom of the JavaScript. Keep the existing lines.",
    "explain": "P0 sends the short trigger pulse. P1 measures the returning echo. The answer is microseconds, not centimetres.",
    "pairImage": "rule"
  },
  {
    "id": "connection-events",
    "title": "Build the two connection events",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "These events run when Bluetooth connects or disconnects. They remember the connection while forever reads the sensor.",
    "do": "Add these two event handlers. Choose Blocks and compare the connected and disconnected stacks.",
    "expected": "Two separate Bluetooth stacks appear. Connected sets true; disconnected sets false and UNKNOWN.",
    "help": "An event runs when the connection changes. true means connected; false means disconnected. These events remember the connection while forever reads the sensor.",
    "links": [],
    "stage": "guided",
    "code": "bluetooth.onBluetoothConnected(function () {\n    btConnected = true\n})\n\nbluetooth.onBluetoothDisconnected(function () {\n    btConnected = false\n    stickStatus = \"UNKNOWN\"\n})",
    "placement": "Add both events at the bottom, after the sensor function’s closing brace. Do not put them inside that function.",
    "explain": "An event runs when the connection changes. It does not belong inside forever.",
    "pairImage": "connection-events"
  },
  {
    "id": "read-echo",
    "title": "Read a fresh echo in forever",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "forever repeats. Each repeat must read the sensor again before making a decision.",
    "do": "Add this short repeating loop. Choose Blocks and trace the function call followed by the pause.",
    "expected": "forever reads a fresh echo and pauses for 500 ms. Keep later additions between these two instructions.",
    "help": "Use the function call that returns a number. Keep the separate purple function definition outside forever.",
    "links": [],
    "stage": "guided",
    "code": "basic.forever(function () {\n    echoTime = readUltrasonicDistance()\n    basic.pause(500)\n})",
    "placement": "Add this whole forever at the bottom, outside the other stacks. There must be only one forever.",
    "explain": "The function definition is the recipe. This function call runs that recipe and saves its answer in echoTime.",
    "pairImage": "read-echo"
  },
  {
    "id": "unknown-message",
    "title": "Build the failed-reading branch first",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "An unusable echo must choose UNKNOWN. This test also catches 0 when no echo arrives.",
    "do": "Insert this if/else between the read and the pause. Choose Blocks and inspect the failed-reading branch.",
    "expected": "The first then sets 0 and UNKNOWN and shows ?. Its else is empty for the next step.",
    "help": "< means less than; > means greater than. OR means either test can select this branch. 0 here marks an unusable distance. It must not be sent as a real measurement.",
    "links": [],
    "stage": "guided",
    "code": "if (echoTime < 116 || echoTime > 23200) {\n    distanceCm = 0\n    stickStatus = \"UNKNOWN\"\n    basic.showString(\"?\")\n} else {\n}",
    "placement": "Inside forever: add below echoTime = readUltrasonicDistance() and above basic.pause(500).",
    "explain": "|| means OR. A missing echo is 0, so it enters this branch. The 0 is a placeholder, not a measured distance.",
    "pairImage": "unknown-message"
  },
  {
    "id": "convert-distance",
    "title": "Turn echo time into centimetres",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "The sound travels out and back. Dividing its echo time by 58 estimates centimetres. Rounding keeps one decimal place.",
    "do": "Put this calculation inside the empty outer else. Choose Blocks and follow the calculation from inside to outside.",
    "expected": "The outer else contains set distanceCm to the calculation. An echo of 1177 gives about 20.3 cm.",
    "help": "Build the sockets from the inside outward. For 20.293… cm: ×10 gives 202.93…, round gives 203, then ÷10 gives 20.3. Leave room below this calculation for the near/far check.",
    "links": [],
    "stage": "guided",
    "code": "distanceCm = Math.round(echoTime / 58 * 10) / 10",
    "placement": "Inside the empty else of the echoTime check. Put this line between its opening and closing braces.",
    "explain": "Divide by 58 to estimate cm. Multiply by 10, round, then divide by 10 to keep one decimal place.",
    "pairImage": "convert-distance"
  },
  {
    "id": "near-message",
    "title": "Build the nearby-object branch",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "A usable distance of 30 cm or less chooses NEAR and displays X.",
    "do": "Keep the calculation in place. Add this second if/else directly below it. Choose Blocks and check the nesting.",
    "expected": "The distance check is inside the outer else. Its then sets NEAR and shows X. Its inner else is still empty.",
    "help": "≤ means less than or equal to. Exactly 30 belongs to NEAR. Keep the UNKNOWN branch above separate.",
    "links": [],
    "stage": "guided",
    "code": "if (distanceCm <= 30) {\n    stickStatus = \"NEAR\"\n    basic.showIcon(IconNames.No)\n} else {\n}",
    "placement": "Inside the outer else: add below the distanceCm calculation, before that else’s closing brace.",
    "explain": "<= means less than or equal to. Exactly 30 cm counts as NEAR. IconNames.No is the X icon.",
    "pairImage": "near-message"
  },
  {
    "id": "far-message",
    "title": "Fill the farther-object else",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "The inner else runs only after the echo was accepted and the distance was found to be above 30 cm.",
    "do": "Fill only the empty inner else with these two lines. Choose Blocks and follow the NEAR and FAR paths.",
    "expected": "The inner else sets FAR and clears the LEDs. It runs only for an accepted reading above 30 cm.",
    "help": "The outer else contains the conversion and the whole distance check. The inner else contains FAR and clear screen. Match the nesting in the image.",
    "links": [],
    "stage": "guided",
    "code": "stickStatus = \"FAR\"\nbasic.clearScreen()",
    "placement": "Inside the empty inner else belonging to distanceCm <= 30. Keep the outer else and its calculation.",
    "explain": "The outer else means the echo was accepted. The inner else means the accepted distance is greater than 30 cm.",
    "pairImage": "far-message"
  },
  {
    "id": "send-fresh",
    "title": "Build the Bluetooth sending checks",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "Send after choosing the reading. A usable message has a word and cm, like NEAR,20.3.",
    "do": "Add the sender below the complete sensor decision. Choose Blocks and inspect its two checks. The next step adds cm to the second message.",
    "expected": "The new if btConnected is inside forever, after the sensor decision. Both sending branches currently send only the word.",
    "help": "The outer sending if asks whether Bluetooth is connected. The inner sending if asks whether this reading is UNKNOWN. They do different jobs.",
    "links": [],
    "stage": "guided",
    "code": "if (btConnected) {\n    if (stickStatus == \"UNKNOWN\") {\n        bluetooth.uartWriteLine(stickStatus)\n    } else {\n        bluetooth.uartWriteLine(stickStatus)\n    }\n}",
    "placement": "Inside forever: add after the entire sensor if/else and before basic.pause(500). Keep this sender outside both sensor branches.",
    "explain": "First ask whether Bluetooth is connected. Then ask whether the reading is UNKNOWN. Each reading sends only one line.",
    "pairImage": "send-fresh"
  },
  {
    "id": "send-distance",
    "title": "Send the chosen word and distance",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "A comma separates the result from the cm estimate. Write line ends the message for the website.",
    "do": "Find the else inside if btConnected. Replace only its UART line. Choose Blocks and inspect the join block.",
    "expected": "UNKNOWN sends only the word. The else joins word, comma and cm, such as NEAR,20.3 or FAR,40. The 500 ms pause stays after the whole sender.",
    "help": "Use variable blocks for stickStatus and distanceCm; do not type those names as text. Put a comma with no spaces in the middle join input. Keep the pause outside the sending if.",
    "links": [],
    "stage": "guided",
    "code": "bluetooth.uartWriteLine(stickStatus + \",\" + distanceCm)",
    "placement": "In the sender’s else only: replace its bluetooth.uartWriteLine(stickStatus) line with this line. Keep the UNKNOWN line unchanged.",
    "explain": "The plus signs join text and the number. The comma separates them so the website can read both values.",
    "pairImage": "send-distance"
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
        "Open Bluetooth sound site",
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
    "expected": "The website receives fresh messages. With a usable echo, it shows the sensor distance in cm as well as NEAR or FAR.",
    "help": "If Chrome shows No compatible devices found, cancel. In MakeCode choose Settings → Project Settings → No Pairing Required, download the program again and wait for flashing to finish. Press Reset once and retry. If still empty, check that Chrome has Bluetooth access in macOS settings. Chrome on iPhone or iPad cannot make this connection.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "test-near",
    "title": "Test cardboard at 20 cm",
    "where": "At the tabletop model · sound tab visible",
    "why": "This checks the whole path: sensor → program → Bluetooth → website → speaker. Use a ruler, not a guessed distance.",
    "do": "Place cardboard 20 cm from the sensor’s front face. Compare the website’s sensor distance with the ruler, then check the display and sound.",
    "expected": "A usable reading near 20 cm shows X, NEAR, an estimated distance near 20 cm and the warning.",
    "help": "The ruler shows where you placed the cardboard; the website shows what the ultrasonic sensor estimated. They may differ. If the number is missing, upload the updated program and reconnect.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
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
    "expected": "A usable reading near 40 cm gives a blank display, FAR and an estimated distance near 40 cm. The warning stops.",
    "help": "The sound page says Beyond 30 cm. That describes the reported measurement, not proof that the surroundings are safe.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "test-unknown",
    "title": "Check an unusable sensor reading",
    "where": "With your teacher · sound tab visible",
    "why": "The first if must report UNKNOWN for a missing echo or an echo outside the accepted interval. Test this path with the teacher as well as the near and far paths.",
    "do": "Have your teacher run a safe missing-echo or out-of-range test for this built model.",
    "expected": "The board shows ?. The website reports UNKNOWN, shows a dash instead of a distance and stops the warning.",
    "help": "Do not move live sensor wires to force an error. If a safe test is not prepared, record Test not run and have the teacher arrange it.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "test-connection-loss",
    "title": "Check loss of the connection",
    "where": "On Walking-stick sounds · tabletop model",
    "why": "A disconnected board must not leave an old warning sounding. Separately, more than three seconds without fresh complete messages makes the page show Signal paused.",
    "do": "Click Disconnect and check that sound stops. Reconnect the same board and wait for a fresh result.",
    "expected": "Disconnection clears the number and stops sound. Reconnecting shows a number only after a new usable reading. Signal paused also clears an old number.",
    "help": "For a separate stale-stream check, the teacher can pause sending in a checked test copy while keeping Bluetooth connected. The labelled website demo’s Stop messages button tests the page timer only, not the sensor or Bluetooth.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "record-trials",
    "title": "Keep three real trials at each distance",
    "where": "In your existing team test record",
    "why": "One successful try can happen by chance. Repeat the same measured positions so failures are visible too.",
    "do": "Run three trials at a ruler distance of 20 cm and three at 40 cm. For each, record ruler distance, website sensor distance, board display, website word and sound.",
    "expected": "Six real trials show what happened, including any failed or missing readings.",
    "help": "Keep ruler distance and sensor distance in separate columns. Write unavailable for a dash; never copy an old value or invent zero. Record differences as they happen.",
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
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
    "links": [
      [
        "Open Bluetooth sound site",
        "../walking-stick-sounds/"
      ]
    ],
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
  },
  {
    "id": "complete-program",
    "title": "Check your complete program",
    "where": "Final reference · JavaScript or Blocks",
    "why": "Use this full program to check the code you built one step at a time.",
    "do": "Compare your saved program. Choose JavaScript for the full code or Blocks for all five stacks.",
    "expected": "Five stacks: one startup, one sensor function, two Bluetooth events and one forever.",
    "help": "Keep your tested project and results. If you need to try the reference, create a separate MakeCode copy with Bluetooth added. Copy the complete program into that copy, download a new numbered HEX, send it to the micro:bit and repeat the physical tests. Code that compiles does not prove the real sensor or Bluetooth works.",
    "links": [],
    "stage": "guided",
    "diagram": "complete",
    "wideDiagram": true,
    "completeCode": "let trigPin = DigitalPin.P0\nlet echoPin = DigitalPin.P1\nlet echoTime = 0\nlet distanceCm = 0\nlet stickStatus = \"UNKNOWN\"\nlet btConnected = false\n\nbluetooth.startUartService()\n\nfunction readUltrasonicDistance() {\n    pins.digitalWritePin(trigPin, 0)\n    control.waitMicros(2)\n    pins.digitalWritePin(trigPin, 1)\n    control.waitMicros(10)\n    pins.digitalWritePin(trigPin, 0)\n    return pins.pulseIn(echoPin, PulseValue.High, 25000)\n}\n\nbluetooth.onBluetoothConnected(function () {\n    btConnected = true\n})\n\nbluetooth.onBluetoothDisconnected(function () {\n    btConnected = false\n    stickStatus = \"UNKNOWN\"\n})\n\nbasic.forever(function () {\n    echoTime = readUltrasonicDistance()\n    if (echoTime < 116 || echoTime > 23200) {\n        distanceCm = 0\n        stickStatus = \"UNKNOWN\"\n        basic.showString(\"?\")\n    } else {\n        distanceCm = Math.round(echoTime / 58 * 10) / 10\n        if (distanceCm <= 30) {\n            stickStatus = \"NEAR\"\n            basic.showIcon(IconNames.No)\n        } else {\n            stickStatus = \"FAR\"\n            basic.clearScreen()\n        }\n    }\n    if (btConnected) {\n        if (stickStatus == \"UNKNOWN\") {\n            bluetooth.uartWriteLine(stickStatus)\n        } else {\n            bluetooth.uartWriteLine(stickStatus + \",\" + distanceCm)\n        }\n    }\n    basic.pause(500)\n})",
    "placement": "To try the reference, replace all JavaScript in a separate MakeCode test copy with Bluetooth added. Keep your saved team program.",
    "explain": "The complete Blocks view has one on start, one sensor function, two Bluetooth events and one forever. Click any image to inspect it full size."
  }
];
