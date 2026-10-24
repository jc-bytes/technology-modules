export const buildSteps = [
  {
    "id": "goal",
    "title": "What you will make",
    "why": "Moving air turns the blades and generator. We will make the board show its voltage, then compare readings before and after one change. Voltage is electrical push, measured in volts, written V.",
    "where": "At the wind model",
    "do": "Use the already-built wind model. Keep the generator disconnected from the Arduino until its input circuit is checked.",
    "expected": "The blades turn the generator. A meter reading in V shows measured voltage; spinning alone does not.",
    "help": "You will build the Arduino voltage program in small sections. Keep the built turbine; this guide does not ask you to rebuild it.",
    "links": [],
    "stage": "model",
    "image": "assets/energy-path.svg",
    "alt": "The fan moves air. Air turns the model blades and shaft. The shaft turns the generator. The meter measures voltage from the generator."
  },
  {
    "id": "board-identify",
    "title": "Check the board and parts",
    "why": "The photo shows the Freenove Projects Board V1.2 used for these directions. It does not show the wiring of your turbine prototype. The smaller control board plugs into it.",
    "where": "At the Freenove board",
    "do": "Find the built wind model, Freenove board, control board, USB data cable and computer with Arduino IDE. The model has a 220 Ω load resistor and a red LED.",
    "expected": "Your teacher confirms a classic Uno-compatible 5 V control board. Keep the generator signal disconnected during programming.",
    "help": "Red and white are positive. Black and gray are negative. USB powers the board separately. The electrical checks are teacher preparation, not a separate student meter activity.",
    "links": [],
    "stage": "guided",
    "image": "assets/freenove-board-reference.png",
    "alt": "Reference photo of a Freenove project board, not a turbine wiring diagram."
  },
  {
    "id": "existing-circuit",
    "title": "Read the existing circuit",
    "where": "On the connection diagram",
    "why": "Red and white are positive. Black and gray are negative.",
    "do": "Trace the 220 Ω resistor and the LED. Each connects across the same positive and negative points.",
    "expected": "White goes directly to A0. Black goes to GND. The 220 Ω resistor is a load, not input protection.",
    "help": "This drawing records the existing model. Keep the generator signal disconnected until the teacher input check. The 220 Ω resistor is a load across the motor. It does not divide the voltage reaching A0.",
    "links": [],
    "stage": "model",
    "image": "assets/wind-existing-circuit.svg",
    "alt": "Existing model circuit: motor positive is red and white to A0; negative is gray and black to GND. A 220 ohm load resistor and a red LED are separate parallel branches across positive and negative. A0 is direct, with no divider.",
    "diagram": true
  },
  {
    "id": "existing-breadboard",
    "title": "Find the two breadboard connections",
    "where": "On the breadboard diagram",
    "why": "Each shaded strip joins five holes. The two strips are separate.",
    "do": "Find red and white on positive, then gray and black on negative. Follow both the resistor legs and the LED legs.",
    "expected": "The 220 Ω resistor and LED each span the two strips. Strip numbers 10 and 20 are examples.",
    "help": "LED anode is positive; cathode is negative. The drawing uses the same A–E side of a breadboard. This is a reference drawing of the existing wiring, not a new instruction to power it.",
    "links": [
      [
        "Download both diagrams",
        "downloads/wind-generator-connections.png"
      ]
    ],
    "stage": "model",
    "image": "assets/wind-existing-breadboard.svg",
    "alt": "Breadboard example: A10 red positive, B10 white to A0, A20 gray negative, B20 black to GND. The 220 ohm resistor bridges C10 and C20; LED anode is E10 and cathode E20. Each numbered five-hole strip is connected internally.",
    "diagram": true
  },
  {
    "id": "board-display-switch",
    "title": "Set the board switches",
    "why": "The number display is already wired inside the board. Some other modules share its pins or A0, so we must turn those modules off.",
    "where": "At the Freenove board",
    "do": "Disconnect USB and every signal source. Set Digital Tube, module 15, ON. Set all unused modules OFF, including Light Res and Thermistor.",
    "expected": "The board is unpowered. Digital Tube is ON, and the two A0 sensor switches are OFF.",
    "help": "Use the printed module names, not an assumed switch direction. Keep LED Matrix, LED Bar, Blue LED, motor and RFID functions OFF. Change switches and wires only with power and signal disconnected.",
    "links": [
      [
        "Official display switch picture",
        "https://docs.freenove.com/projects/fnk0059/en/latest/_images/Chapter16_05.png"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "board-board-port",
    "title": "Connect USB and choose the board",
    "why": "A USB data cable carries the program from the computer. The board choice must match the actual plugged-in control board.",
    "where": "In Arduino IDE",
    "do": "Connect the USB data cable. In Arduino IDE, select the teacher-confirmed Arduino Uno board and its USB port.",
    "expected": "Arduino IDE shows the checked board and a connected port.",
    "help": "If no port appears, have your teacher check the cable. A charge-only cable can power the board without carrying a program.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-bench-download",
    "title": "Create your own voltage sketch",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "A sketch is an Arduino program. You will build this one in short sections, keeping each earlier section as you go.",
    "do": "Choose File → New Sketch. Save it as WindVoltage_Student. Keep the empty setup() and loop() functions.",
    "expected": "A saved sketch has one empty setup() and one empty loop(). There is no downloaded complete program.",
    "help": "Keep the generator disconnected. The next pages add code above or inside these two functions. Do not replace the whole editor when adding a section.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-input-pin",
    "title": "Name the pins and measuring values",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "A constant is a named value that stays the same. A0 reads voltage. D11, D13 and D12 talk to the display already on the Freenove board.",
    "do": "Add this section at the very top, above setup(). Keep these pin numbers. Use INPUT_SCALE = 1.0 for the direct A0 connection in the diagram.",
    "expected": "The pin names and measuring constants are above both empty functions.",
    "help": "ADC_REFERENCE_V starts at 5.00 V for the checked 5 V board. INPUT_SCALE is 1 because A0 reads the same voltage as the generator terminals. The 220 Ω load does not change that scale. Your teacher checks the actual reference voltage.",
    "links": [],
    "stage": "guided",
    "code": "#include <Arduino.h>\n\nconst byte LATCH_PIN = 12;\nconst byte CLOCK_PIN = 13;\nconst byte DATA_PIN = 11;\nconst byte VOLTAGE_PIN = A0;\nconst float ADC_REFERENCE_V = 5.00; // Measure board 5V-to-GND for calibration.\nconst float INPUT_SCALE = 1.0; // Direct A0 reading; no voltage divider.",
    "placement": "Add at the top of the sketch, above setup() and loop()."
  },
  {
    "id": "board-screen-data",
    "title": "Give the program its storage boxes",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "A variable is a named storage box. DIGIT is a lookup table: each pattern turns on the segments needed for one number. screen holds the four display patterns.",
    "do": "Add this storage section below the constants, still above setup().",
    "expected": "DIGIT contains patterns for 0 through 9. voltage begins at 0; the two clock variables begin at 0.",
    "help": "Keep the pattern values exactly as shown. A value starting with 0x is a compact way to write a pattern. The first three screen positions show 0.00 and the fourth is blank. You will use the variables in later sections.",
    "links": [],
    "stage": "guided",
    "code": "const byte DIGIT[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99,\n                      0x92, 0x82, 0xf8, 0x80, 0x90};\nbyte screen[4] = {0xc0 & 0x7f, 0xc0, 0xc0, 0xff};\nfloat voltage = 0.0;\nunsigned int rawAverage = 0;\nbool atAdcLimit = false;\nunsigned long lastRead = 0;\nunsigned long lastPrint = 0;",
    "placement": "Add below the constants. Keep setup() and loop() below it."
  },
  {
    "id": "board-display-helpers",
    "title": "Add the two display helpers",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "A function is a named group of instructions. sendDigit chooses one display position and sends its pattern. blankDisplay turns the display off between positions.",
    "do": "Add both helper functions below your storage section and above setup().",
    "expected": "Each helper has its own closing brace. Neither helper is inside setup() or loop().",
    "help": "The latch goes LOW while data moves, then HIGH to show it. shiftOut sends the position first, then the segment pattern. 1U << position selects one position. These helpers only control the display; they do not measure voltage.",
    "links": [],
    "stage": "guided",
    "code": "void sendDigit(byte position, byte segments) {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(1U << position));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, segments);\n  digitalWrite(LATCH_PIN, HIGH);\n}\n\nvoid blankDisplay() {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0xff));\n  digitalWrite(LATCH_PIN, HIGH);\n}",
    "placement": "Add both functions above setup(), after the storage section."
  },
  {
    "id": "board-decimal",
    "title": "Build the voltage display patterns",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "The display needs whole digits. Multiply volts by 100 and round to turn 1.73 V into 173. The digit positions then show 1.73.",
    "do": "Add makeScreen() below the two display helpers and above setup().",
    "expected": "The first digit has the decimal point. The fourth position stays blank. ---- means stop and check the input.",
    "help": "hundredths / 100 finds whole volts. (hundredths / 10) % 10 finds tenths; % means remainder. hundredths % 10 finds hundredths. & 0x7f adds the decimal point. The dashes are a warning, not electrical protection.",
    "links": [],
    "stage": "guided",
    "code": "void makeScreen() {\n  unsigned int hundredths = (unsigned int)(voltage * 100.0 + 0.5);\n  if (atAdcLimit || hundredths > 999) {\n    for (byte i = 0; i < 4; ++i) screen[i] = 0xbf; // ----: check range.\n    return;\n  }\n  screen[0] = DIGIT[hundredths / 100] & 0x7f; // Whole volts and decimal point.\n  screen[1] = DIGIT[(hundredths / 10) % 10];\n  screen[2] = DIGIT[hundredths % 10];\n  screen[3] = 0xff; // Fourth position intentionally blank.\n}",
    "placement": "Add this separate function above setup(), below blankDisplay()."
  },
  {
    "id": "board-conversion",
    "title": "Read A0 and calculate the voltage",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "analogRead gives a count from 0 to 1023. Eight quick samples are averaged to reduce flicker. The formula changes that count into source volts.",
    "do": "Add readVoltage() below makeScreen() and above setup().",
    "expected": "The function takes eight samples, calculates voltage and calls makeScreen() to prepare the display.",
    "help": "total / 8.0 gives the average count. × reference voltage ÷ 1023 gives volts at A0; × INPUT_SCALE estimates source volts. raw >= 1020 sets the warning near the input limit. Unsafe voltage can damage A0 before code reacts.",
    "links": [],
    "stage": "guided",
    "code": "void readVoltage() {\n  unsigned long total = 0;\n  atAdcLimit = false;\n  for (byte i = 0; i < 8; ++i) {\n    unsigned int raw = analogRead(VOLTAGE_PIN);\n    if (raw >= 1020) atAdcLimit = true;\n    total += raw;\n  }\n  rawAverage = (total + 4) / 8;\n  voltage = (total / 8.0) * ADC_REFERENCE_V / 1023.0 * INPUT_SCALE;\n  makeScreen();\n}",
    "placement": "Add this separate function above setup(), below makeScreen()."
  },
  {
    "id": "board-program-start",
    "title": "Fill setup(), which runs once",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "setup() prepares the pins and Serial Monitor once when the board starts. It also prepares the first reading.",
    "do": "Replace only the empty setup() with this filled setup(). Keep your helpers and empty loop().",
    "expected": "There is exactly one setup(). The display pins are OUTPUT and A0 is INPUT.",
    "help": "OUTPUT means the board sends a signal. INPUT means it reads one. Serial.begin(9600) sets the text speed; use 9600 in Serial Monitor later. Do not add a second setup().",
    "links": [],
    "stage": "guided",
    "code": "void setup() {\n  Serial.begin(9600);\n  pinMode(LATCH_PIN, OUTPUT);\n  pinMode(CLOCK_PIN, OUTPUT);\n  pinMode(DATA_PIN, OUTPUT);\n  pinMode(VOLTAGE_PIN, INPUT); // No internal pull-up on the measuring input.\n  blankDisplay();\n  readVoltage();\n}",
    "placement": "Replace only the empty setup() function. Keep everything else."
  },
  {
    "id": "board-loop-read",
    "title": "Start the repeating measurement",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "loop() repeats. millis() is a clock in milliseconds. This check updates the measurement about every 100 milliseconds while the display can keep refreshing.",
    "do": "Put these lines inside the empty loop(), between its opening and closing braces.",
    "expected": "loop() contains the clock and one if that calls readVoltage().",
    "help": "now - lastRead is the time since the last measurement. >= means greater than or equal to. Keep loop()’s own closing brace below this code; more instructions go before it.",
    "links": [],
    "stage": "guided",
    "code": "  unsigned long now = millis();\n  if (now - lastRead >= 100) {\n    lastRead = now;\n    readVoltage();\n  }",
    "placement": "Add inside loop(). Keep the outer closing brace below the code."
  },
  {
    "id": "board-loop-refresh",
    "title": "Refresh the four display positions",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "The board lights one position briefly, then the next. Repeating quickly makes the digits look steady.",
    "do": "Inside loop(), add this scan below the measurement if and before loop()’s closing brace.",
    "expected": "The scan visits positions 0, 1, 2 and 3. Each gets a 1 ms pause and is blanked before the next.",
    "help": "i++ moves to the next position. i < 4 stops after the fourth. Keep delay(1); a long pause would make the display flicker. The scan is outside the 100 ms measurement if.",
    "links": [],
    "stage": "guided",
    "code": "  // Scan continuously. Blank between digits and before sampling/printing.\n  for (byte i = 0; i < 4; ++i) {\n    sendDigit(i, screen[i]);\n    delay(1);\n    blankDisplay();\n  }",
    "placement": "Add inside loop(), below the first if and before the last brace."
  },
  {
    "id": "board-loop-print",
    "title": "Send a readable result to Serial Monitor",
    "where": "In Arduino IDE · WindVoltage_Student",
    "why": "The display shows the voltage. Serial Monitor also shows the voltage and raw A0 count, which helps compare readings and find errors.",
    "do": "Inside loop(), add this last if below the display scan and before loop()’s final brace. Then click Verify.",
    "expected": "Verify finishes without errors. You have one setup(), one loop() and four helper functions.",
    "help": "This prints about every 250 milliseconds. Serial.print keeps writing the same line; println ends it. voltage, 2 prints two decimal places. F() keeps fixed text in program memory. On an error, first check for a missing brace or a helper placed inside another function.",
    "links": [],
    "stage": "guided",
    "code": "  if (now - lastPrint >= 250) {\n    lastPrint = now;\n    if (atAdcLimit) {\n      Serial.println(F(\"ADC LIMIT: stop and check input voltage\"));\n    } else {\n      Serial.print(F(\"Voltage: \"));\n      Serial.print(voltage, 2);\n      Serial.print(F(\" V; ADC: \"));\n      Serial.println(rawAverage);\n    }\n  }",
    "placement": "Add inside loop(), after the display scan and before the final brace."
  },
  {
    "id": "board-bench-upload",
    "title": "Upload your voltage program",
    "why": "Your sketch now includes the measurement, display refresh and Serial Monitor output.",
    "where": "In Arduino IDE",
    "do": "Keep the generator signal disconnected. Connect USB and upload your WindVoltage_Student sketch. Open Serial Monitor at 9600 baud.",
    "expected": "Upload finishes. Serial Monitor shows Voltage and ADC lines. With no signal connected, the number may move.",
    "help": "A disconnected A0 input can float, so it is not a zero-voltage test. USB powers the board. If text is scrambled, select 9600 baud. The next checks use the teacher-checked model.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-interface-gate",
    "title": "Check before connecting the model",
    "why": "The drawing shows the existing 220 Ω load and LED. The load does not protect A0.",
    "where": "At the built model",
    "do": "Keep the generator signal disconnected until your teacher confirms the model is suitable for this powered board.",
    "expected": "Teacher preparation covers the voltage range, polarity, possible spikes, LED current and load resistor power rating.",
    "help": "For this 5 V board, the signal must stay nonnegative and below the actual powered reference voltage. A dim LED does not prove this. Stop if the model has not been checked. This guide does not certify the direct connection.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-final-scale",
    "title": "Check the direct-reading scale",
    "why": "The 220 Ω resistor is across the motor. It is a load, not a two-resistor divider. The diagram uses a direct A0 reading.",
    "where": "In Arduino IDE",
    "do": "Check that INPUT_SCALE is 1.0. Have your teacher check ADC_REFERENCE_V against the powered board. Save your sketch.",
    "expected": "The direct-reading program does not multiply the generator voltage by two.",
    "help": "If your teacher changes the input circuit, the program scale must match that circuit. The program cannot protect against excessive or reversed voltage.",
    "links": [],
    "stage": "guided",
    "code": "const float ADC_REFERENCE_V = 5.00;\nconst float INPUT_SCALE = 1.0;"
  },
  {
    "id": "board-final-connect",
    "title": "Check the model display",
    "why": "USB powers the board. The generator supplies the voltage signal. The display and Serial Monitor show the same estimate.",
    "where": "At the Freenove board",
    "do": "After the teacher input check, have your teacher apply USB power before connecting the generator signal. Compare the board display with the Voltage line in Serial Monitor.",
    "expected": "Both show the same voltage to two decimal places. At shutdown, remove the generator signal before removing USB power.",
    "help": "Agreement between the display and Serial Monitor checks the program output, not measurement accuracy. Calibration is a teacher check. On dashes or an ADC LIMIT message, stop the fan and have your teacher remove the signal.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "before-on-1",
    "title": "Record three readings before the change",
    "why": "These are your starting readings. Keep them so you can compare them with the model after one change.",
    "where": "At the model and in the team test record",
    "do": "Open the blank test sheet. Have your teacher start the guarded fan. Once the blades spin steadily, record the board voltage three times, five seconds apart, in the Before change rows. Stop the fan afterward.",
    "expected": "All three Before change voltage cells contain your actual readings.",
    "help": "Keep the fan in the same marked position and use the same setting for the repeat test. Keep the 220 Ω load, LED and connections unchanged. If a number moves, record what you see. Keep hands clear of moving blades.",
    "links": [
      [
        "Download blank test sheet",
        "downloads/Wind_Test_Record_Blank.csv"
      ]
    ]
  },
  {
    "id": "before-compare",
    "title": "Choose one change to the model",
    "why": "Change one part of the model so you can test whether it affects the voltage.",
    "where": "In the team report",
    "do": "Choose one small change with your teacher. In your report, finish: \"We will change ___ because ___.\"",
    "expected": "Name one change to the model. Keep the fan setting and position the same.",
    "help": "Choose a change that can be made with the fan stopped. Keep your first readings. Your teacher checks the physical change before testing.",
    "links": [],
    "example": "If the model allows it, change the blade angle, meaning how much the blades tilt. Do not also change their size."
  },
  {
    "id": "make-change",
    "title": "Make the change and record three new readings",
    "why": "Repeat the same test after changing one part of the model.",
    "where": "At the wind model",
    "do": "With fan off and blades stopped, make the approved change with your teacher. Use the same fan setting and position. Once the blades spin steadily, record three display readings, five seconds apart, in the After change rows. Stop the fan afterward.",
    "expected": "The sheet contains six readings: three before and three after the model change.",
    "help": "Keep the LED, 220 Ω load and wiring unchanged. Any electrical change requires a separate teacher input check. Do not replace the first readings or fill an unrun test with zero.",
    "links": []
  },
  {
    "id": "after-compare",
    "title": "Compare your before and after readings",
    "why": "Look at all three readings in each set. The new readings may be higher, lower or mixed.",
    "where": "In the team report",
    "do": "Under Test and improvement, write: \"We changed ___. Before, we measured ___ V, ___ V and ___ V. After, we measured ___ V, ___ V and ___ V. The readings were ___.\" Then state one limit of the test.",
    "expected": "Use your own six numbers. If the sets overlap or move around, say there is no clear difference.",
    "help": "You do not need an average. A limit might be changing fan airflow or small display changes. This test estimates voltage; it does not measure power. Keep the report headings Project, Research, Test and improvement, and References.",
    "links": [],
    "example": "Before: 0.80, 0.82, 0.81 V. After: 1.10, 1.08, 1.11 V. All three after readings are higher. These are example numbers only."
  },
  {
    "id": "save-evidence",
    "title": "Save your test evidence",
    "why": "Keep the program, six real voltage readings, description of your model change and team report together.",
    "where": "In the team Drive folder",
    "do": "Save the tested sketch, completed test sheet and report in the team Drive folder.",
    "expected": "The folder contains your original readings and after-change readings. Mark a test you could not run as Test not run.",
    "help": "One team member attaches the shared report to the existing 8B STEAM assignment in Classroom. Show the physical model to your teacher. If equipment failed, arrange a supervised catch-up. Do not claim an unrun test is complete.",
    "links": [
      [
        "Download blank test sheet",
        "downloads/Wind_Test_Record_Blank.csv"
      ]
    ],
    "stage": "independent"
  },
  {
    "id": "complete-program",
    "title": "Check your complete program",
    "where": "Final reference · Arduino IDE",
    "why": "Use this complete direct-reading sketch to check the code you built one section at a time.",
    "do": "Compare your saved sketch with the full code below. This version uses INPUT_SCALE = 1.0 for the direct A0 connection shown in the diagrams.",
    "expected": "Four display helpers, one setup and one loop. The sketch reads A0, updates the display and prints the voltage estimate.",
    "help": "Save a separate numbered copy before trying the reference. The teacher must check the real model and calibration. The 220 Ω load and the program do not protect A0.",
    "links": [
      [
        "Download complete direct-reading program",
        "downloads/WindVoltage_Student.zip"
      ]
    ],
    "stage": "guided",
    "completeCode": "/* Freenove Projects Board FNK0059 voltage display for the existing wind model.\n   Direct positive DC input at A0; INPUT_SCALE = 1.0.\n   The 220 ohm resistor and LED are parallel loads, not input protection.\n   Teacher must verify voltage range, polarity, transients and component ratings.\n   Keep A0 nonnegative and below the actual powered reference voltage.\n   Power the board by USB before connecting the signal; remove signal before USB.\n   Display protocol adapted from Freenove Chapter 16.\n*/\n#include <Arduino.h>\n\nconst byte LATCH_PIN = 12;\nconst byte CLOCK_PIN = 13;\nconst byte DATA_PIN = 11;\nconst byte VOLTAGE_PIN = A0;\nconst float ADC_REFERENCE_V = 5.00; // Measure board 5V-to-GND for calibration.\nconst float INPUT_SCALE = 1.0; // Direct A0 reading; no voltage divider.\nconst byte DIGIT[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99,\n                      0x92, 0x82, 0xf8, 0x80, 0x90};\nbyte screen[4] = {0xc0 & 0x7f, 0xc0, 0xc0, 0xff};\nfloat voltage = 0.0;\nunsigned int rawAverage = 0;\nbool atAdcLimit = false;\nunsigned long lastRead = 0;\nunsigned long lastPrint = 0;\n\nvoid sendDigit(byte position, byte segments) {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(1U << position));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, segments);\n  digitalWrite(LATCH_PIN, HIGH);\n}\n\nvoid blankDisplay() {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0xff));\n  digitalWrite(LATCH_PIN, HIGH);\n}\n\nvoid makeScreen() {\n  unsigned int hundredths = (unsigned int)(voltage * 100.0 + 0.5);\n  if (atAdcLimit || hundredths > 999) {\n    for (byte i = 0; i < 4; ++i) screen[i] = 0xbf; // ----: check range.\n    return;\n  }\n  screen[0] = DIGIT[hundredths / 100] & 0x7f; // Whole volts and decimal point.\n  screen[1] = DIGIT[(hundredths / 10) % 10];\n  screen[2] = DIGIT[hundredths % 10];\n  screen[3] = 0xff; // Fourth position intentionally blank.\n}\n\nvoid readVoltage() {\n  unsigned long total = 0;\n  atAdcLimit = false;\n  for (byte i = 0; i < 8; ++i) {\n    unsigned int raw = analogRead(VOLTAGE_PIN);\n    if (raw >= 1020) atAdcLimit = true;\n    total += raw;\n  }\n  rawAverage = (total + 4) / 8;\n  voltage = (total / 8.0) * ADC_REFERENCE_V / 1023.0 * INPUT_SCALE;\n  makeScreen();\n}\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LATCH_PIN, OUTPUT);\n  pinMode(CLOCK_PIN, OUTPUT);\n  pinMode(DATA_PIN, OUTPUT);\n  pinMode(VOLTAGE_PIN, INPUT); // No internal pull-up on the measuring input.\n  blankDisplay();\n  readVoltage();\n}\n\nvoid loop() {\n  unsigned long now = millis();\n  if (now - lastRead >= 100) {\n    lastRead = now;\n    readVoltage();\n  }\n  // Scan continuously. Blank between digits and before sampling/printing.\n  for (byte i = 0; i < 4; ++i) {\n    sendDigit(i, screen[i]);\n    delay(1);\n    blankDisplay();\n  }\n  if (now - lastPrint >= 250) {\n    lastPrint = now;\n    if (atAdcLimit) {\n      Serial.println(F(\"ADC LIMIT: stop and check input voltage\"));\n    } else {\n      Serial.print(F(\"Voltage: \"));\n      Serial.print(voltage, 2);\n      Serial.print(F(\" V; ADC: \"));\n      Serial.println(rawAverage);\n    }\n  }\n}\n"
  }
];
