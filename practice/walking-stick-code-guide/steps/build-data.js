export const buildSteps = [
  {
    "id": "goal",
    "title": "Measure distance and hear a warning",
    "where": "At your already-built walking stick",
    "why": "The micro:bit measures how far away an object is. The website shows that distance in centimetres and plays a warning when the object is 30 cm away or closer.",
    "do": "Keep the built model on a table. Save your old program, build each part of the code, then test the distance and warning.",
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
    "where": "In the new test project · JavaScript",
    "why": "A variable is a named box that remembers a value. Two boxes hold pin names, two hold numbers, one holds a word and one holds true or false.",
    "do": "Choose JavaScript. In this new empty test project, remove the starter code and type these six lines. They only create variables; they do not read the sensor or send anything.",
    "expected": "Choose Blocks. on start shows P0, P1 and UNKNOWN. Check the variable names in Variables.",
    "help": "Type each name exactly, including capital letters. DigitalPin.P0 means pin zero; DigitalPin.P1 means pin one. 0 is a number, \"UNKNOWN\" is a text word and false means not connected. MakeCode may hide starting values of 0 and false in Blocks. If an unused name disappears, open Variables → Make a Variable and create that name again.",
    "links": [],
    "stage": "guided",
    "code": "let trigPin = DigitalPin.P0\nlet echoPin = DigitalPin.P1\nlet echoTime = 0\nlet distanceCm = 0\nlet stickStatus = \"UNKNOWN\"\nlet btConnected = false"
  },
  {
    "id": "start-uart",
    "title": "Start the Bluetooth message service",
    "where": "In Blocks · on start",
    "why": "on start runs once when the program starts. UART service prepares Bluetooth text messages; it does not send a reading.",
    "do": "Put the message service below your variable setup.",
    "expected": "on start has the initial values and one bluetooth uart service, matching the image.",
    "help": "Your initial zero and false values may be hidden after switching views. Do not add NEAR and FAR here: they must be chosen using each new reading.",
    "links": [],
    "stage": "guided",
    "diagram": "startup",
    "actions": [
      "Open Bluetooth and drag bluetooth uart service into on start, below set stickStatus to UNKNOWN.",
      "Check trigPin is P0 and echoPin is P1. Keep those two assignments in on start.",
      "Keep decisions and UART write line out of on start. They will go in forever later."
    ]
  },
  {
    "id": "rule",
    "title": "Write the small sensor-reading function",
    "where": "In MakeCode · JavaScript, then Blocks",
    "why": "A function is a named group of instructions. This helper sends a tiny pulse on P0, then measures how long the echo on P1 lasts. Its answer is time, not centimetres.",
    "do": "Choose JavaScript. Below your existing code, type this function without deleting the variable setup or Bluetooth service. Then return to Blocks.",
    "expected": "A separate purple function stack appears. It is outside on start and outside forever.",
    "help": "0 means trigger off; 1 means on. The waits are 2 and 10 microseconds. The return line gives back the echo time and stops waiting after 25000 microseconds. In Blocks, that return expression appears grey. It is expected. Keep the function named readUltrasonicDistance.",
    "links": [],
    "stage": "guided",
    "diagram": "sensor",
    "code": "function readUltrasonicDistance() {\n    pins.digitalWritePin(trigPin, 0)\n    control.waitMicros(2)\n    pins.digitalWritePin(trigPin, 1)\n    control.waitMicros(10)\n    pins.digitalWritePin(trigPin, 0)\n    return pins.pulseIn(echoPin, PulseValue.High, 25000)\n}",
    "codeLabel": "Type this sensor helper only. Keep the code already in your project."
  },
  {
    "id": "connection-events",
    "title": "Build the two connection events",
    "where": "In Blocks · two separate Bluetooth event stacks",
    "why": "These events run when Bluetooth connects or disconnects. They remember the connection while forever reads the sensor.",
    "do": "Build two separate event stacks.",
    "expected": "The two events match the image. Neither is inside on start, forever or the sensor function.",
    "help": "An event runs when the connection changes. true means connected; false means disconnected. These events remember the connection while forever reads the sensor.",
    "links": [],
    "stage": "guided",
    "diagram": "events",
    "actions": [
      "From Bluetooth, drag on bluetooth connected into the workspace. Put Variables → set btConnected to inside it, using Logic → true.",
      "Drag on bluetooth disconnected into another empty space. Put set btConnected to false inside it.",
      "Below false, add set stickStatus to with a Text value UNKNOWN."
    ]
  },
  {
    "id": "read-echo",
    "title": "Read a fresh echo in forever",
    "where": "In Blocks · the empty forever stack",
    "why": "forever repeats. Each repeat must read the sensor again before making a decision.",
    "do": "Put the sensor call first in forever.",
    "actions": [
      "From Basic, drag one forever stack into the workspace if there is not one already.",
      "Inside forever, add Variables → set echoTime to.",
      "From Functions, place the value-shaped call readUltrasonicDistance in its value socket."
    ],
    "expected": "forever begins with set echoTime to call readUltrasonicDistance.",
    "help": "Use the function call that returns a number. Keep the separate purple function definition outside forever.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "unknown-message",
    "title": "Build the failed-reading branch first",
    "where": "In Blocks · forever → first if",
    "why": "An unusable echo must choose UNKNOWN. This test also catches 0 when no echo arrives.",
    "do": "Below the sensor call in forever, build the first if/else.",
    "expected": "The first then contains exactly the failed-reading result. The next page fills its else.",
    "help": "< means less than; > means greater than. OR means either test can select this branch. 0 here marks an unusable distance. It must not be sent as a real measurement.",
    "links": [],
    "stage": "guided",
    "diagram": "unknown",
    "actions": [
      "Drag Logic → if/else below set echoTime. Add else with + if needed.",
      "Put Logic → or in the condition. Fill it with echoTime < 116 and echoTime > 23200.",
      "Inside then, add set distanceCm to 0, set stickStatus to the Text word UNKNOWN, then Basic → show string with ?. Leave the outer else empty for now."
    ]
  },
  {
    "id": "convert-distance",
    "title": "Turn echo time into centimetres",
    "where": "In Blocks · the outer sensor if’s else",
    "why": "The sound travels out and back. Dividing its echo time by 58 estimates centimetres. Rounding keeps one decimal place.",
    "do": "Build the distance calculation inside the outer else.",
    "actions": [
      "Add set distanceCm to inside the empty outer else.",
      "From Math, fit arithmetic blocks together to make echoTime ÷ 58, then multiply that answer by 10.",
      "Place that result inside Math → round. Divide the rounded answer by 10 and put the whole calculation in set distanceCm."
    ],
    "expected": "The calculation reads round((echoTime ÷ 58) × 10) ÷ 10. An echo of 1177 gives about 20.3 cm.",
    "help": "Build the sockets from the inside outward. For 20.293… cm: ×10 gives 202.93…, round gives 203, then ÷10 gives 20.3. Leave room below this calculation for the near/far check.",
    "links": [],
    "stage": "guided",
    "diagram": "near"
  },
  {
    "id": "near-message",
    "title": "Build the nearby-object branch",
    "where": "In Blocks · first if’s else → distanceCm ≤ 30",
    "why": "A usable distance of 30 cm or less chooses NEAR and displays X.",
    "do": "Build NEAR inside a second if.",
    "expected": "NEAR is inside both checks. Keep the inner else empty for the next step.",
    "help": "≤ means less than or equal to. Exactly 30 belongs to NEAR. Keep the UNKNOWN branch above separate.",
    "links": [],
    "stage": "guided",
    "diagram": "near",
    "actions": [
      "Put Logic → if/else below set distanceCm, inside the outer else.",
      "Set its condition to distanceCm ≤ 30. Use the comparison dropdown to choose ≤.",
      "Inside this inner then, put set stickStatus to the Text word NEAR, then Basic → show icon with X, the No icon."
    ]
  },
  {
    "id": "far-message",
    "title": "Fill the farther-object else",
    "where": "In Blocks · outer else → inner distance check’s else",
    "why": "The inner else runs only after the echo was accepted and the distance was found to be above 30 cm.",
    "do": "Fill the else belonging to distanceCm ≤ 30.",
    "expected": "A usable distance above 30 cm chooses FAR and clears the LEDs.",
    "help": "The outer else contains the conversion and the whole distance check. The inner else contains FAR and clear screen. Match the nesting in the image.",
    "links": [],
    "stage": "guided",
    "diagram": "far",
    "actions": [
      "Inside the inner else, add Variables → set stickStatus to with the Text word FAR.",
      "Below FAR in that same inner else, add Basic → clear screen."
    ]
  },
  {
    "id": "send-fresh",
    "title": "Build the Bluetooth sending checks",
    "where": "In Blocks · bottom of the same forever stack",
    "why": "Send after choosing the reading. A usable message has a word and cm, like NEAR,20.3.",
    "do": "Build the sender at the bottom of forever.",
    "expected": "The sending if is inside forever and outside all sensor-result branches.",
    "help": "The outer sending if asks whether Bluetooth is connected. The inner sending if asks whether this reading is UNKNOWN. They do different jobs.",
    "links": [],
    "stage": "guided",
    "diagram": "send",
    "actions": [
      "After the entire sensor if/else, add Logic → if with btConnected as its condition.",
      "Inside that if, add if/else. Compare stickStatus = the Text word UNKNOWN.",
      "Leave its then and else empty for the next step."
    ]
  },
  {
    "id": "send-distance",
    "title": "Send the chosen word and distance",
    "where": "In Blocks · the two empty Bluetooth sending branches",
    "why": "A comma separates the result from the cm estimate. Write line ends the message for the website.",
    "do": "Fill the sender and add its repeating pause.",
    "actions": [
      "In the UNKNOWN then, add Bluetooth → uart write line with the variable stickStatus.",
      "In its else, add another uart write line. Put Text → join in its value socket.",
      "Use join’s + for three inputs: variable stickStatus, a Text comma , and variable distanceCm.",
      "After the entire if btConnected, add Basic → pause (ms) 500, still inside forever."
    ],
    "expected": "One message per reading: NEAR,20.3, FAR,40 or UNKNOWN.",
    "help": "Use variable blocks for stickStatus and distanceCm; do not type those names as text. Put a comma with no spaces in the middle join input. Keep the pause outside the sending if.",
    "links": [],
    "stage": "guided",
    "diagram": "send"
  },
  {
    "id": "complete-program",
    "title": "Check the five stacks you built",
    "where": "In MakeCode · whole Blocks workspace",
    "why": "The finished image is a check for placement. Your program should read a new echo, choose one result, then send that result and a usable distance.",
    "do": "Compare your own blocks with the five stacks below. Trace a missing echo, a 20 cm reading and a 40 cm reading through the branches.",
    "expected": "One on start, one sensor function, two Bluetooth events and one forever. Each usable reading sends a result with cm; UNKNOWN sends no number.",
    "help": "Check the two different sensor else branches and the separate sending if. Correct misplaced blocks in your own program. The simulator cannot prove a physical ultrasonic reading or Bluetooth connection.",
    "links": [],
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
  }
];
