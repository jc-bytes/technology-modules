export const buildSteps = [
  {
    "id": "goal",
    "title": "What you will make",
    "why": "Moving air turns the blades and generator. We will make the board show its voltage, then compare fan-off and fan-on readings. Voltage is electrical push, measured in volts, written V.",
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
    "do": "Find the Freenove Projects Board V1.2, its control board, USB data cable, multimeter, AA holder, breadboard, wires and two 10k resistors.",
    "expected": "Your teacher confirms a classic Uno-compatible 5 V control board and checks both 10k resistor values. The turbine stays disconnected.",
    "help": "These directions use the checked 5 V Uno-compatible board. A different processor or supply needs a checked program and input circuit. USB powers the board separately.",
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
    "help": "This drawing records the existing model. Keep the generator disconnected until the later physical input check. The AA bench program uses a different two-resistor circuit and scale.",
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
    "do": "Add this section at the very top, above setup(). Keep these pin numbers and the two 10k bench resistor values.",
    "expected": "The pin names and measuring constants are above both empty functions.",
    "help": "ADC_REFERENCE_V starts at 5.00 V for the checked 5 V board. INPUT_SCALE is 2 because the equal resistors halve the source voltage. These are bench values; the teacher checks final calibration later.",
    "links": [],
    "stage": "guided",
    "code": "#include <Arduino.h>\n\nconst byte LATCH_PIN = 12;\nconst byte CLOCK_PIN = 13;\nconst byte DATA_PIN = 11;\nconst byte VOLTAGE_PIN = A0;\nconst float ADC_REFERENCE_V = 5.00; // Measure board 5V-to-GND for calibration.\nconst float R_TOP_OHMS = 10000.0;\nconst float R_BOTTOM_OHMS = 10000.0;\nconst float INPUT_SCALE = (R_TOP_OHMS + R_BOTTOM_OHMS) / R_BOTTOM_OHMS;",
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
    "id": "board-divider-idea",
    "title": "Wire the known AA test circuit",
    "why": "This bench circuit uses two equal 10k resistors. A0 connects between them and sees about half the known AA voltage. This drawing is not final turbine wiring.",
    "where": "At the Freenove board",
    "do": "Disconnect USB and the AA source. Place the two 10k resistors as drawn. Join their middle point to A0 and their lower end to board GND. Leave the AA source disconnected.",
    "expected": "The teacher checks the connected breadboard rows, both resistor values, A0 at the midpoint and the shared GND before power is applied.",
    "help": "The upper resistor goes from the planned AA positive to the middle point. The lower goes from that point to GND. AA negative will share GND. Do not put both ends of a resistor in the same connected row. The generator stays separate.",
    "links": [],
    "stage": "guided",
    "image": "assets/bench-divider.svg",
    "alt": "Bench-only divider with known AA source, upper and lower 10 kilohm resistors, A0 at their midpoint, shared GND and separate USB board power."
  },
  {
    "id": "board-bench-upload",
    "title": "Run the voltage program",
    "why": "Your sketch now includes the measurement, display refresh and Serial Monitor output.",
    "where": "In Arduino IDE",
    "do": "After the wiring check, connect USB and upload your WindVoltage_Student sketch. Open Serial Monitor at 9600 baud.",
    "expected": "Upload finishes. Serial Monitor shows Voltage and ADC lines.",
    "help": "USB powers the board. Keep the AA signal disconnected until the next checks. If text is scrambled, select 9600 baud.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-bench-zero",
    "title": "Check zero before the battery",
    "why": "With no source connected, the lower resistor holds A0 near ground. This gives a useful first check.",
    "where": "At the Freenove board",
    "do": "With the AA source disconnected, read the display and Serial Monitor.",
    "expected": "Both should show a near-zero estimate, about 0.00 V.",
    "help": "The lower resistor holds A0 near GND. If the result is wrong, disconnect power and ask your teacher to check GND, the midpoint and the A0 sensor switches.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-bench-battery",
    "title": "Compare with a known voltage",
    "why": "A known source lets us check the estimate before using the generator. The meter must measure across the AA terminals, not just A0 to GND.",
    "where": "At the Freenove board",
    "do": "With divider wiring checked and USB power on, have your teacher apply the AA signal through the prepared connections: positive through the upper resistor, negative to GND. Compare the display with the checked meter across the AA terminals.",
    "expected": "The teacher records the difference and checks whether calibration is adequate. Remove the AA signal before removing USB power.",
    "help": "The source need not be exactly its nominal voltage. The teacher checks additional known positive inputs within the approved bench range. On dashes, remove the signal immediately. A bench pass does not approve the generator interface.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-meter-connect",
    "title": "Set up the generator-only meter test",
    "where": "At the stationary generator · teacher checks the clips",
    "why": "The generator voltage is still unknown. A red LED lighting does not establish its maximum. Keep the Arduino completely disconnected for this check.",
    "do": "With fan off and blades stopped, have your teacher identify the output type and choose its voltage mode and range. Check black in COM and red in V. Attach one probe to each generator terminal.",
    "expected": "The Arduino and intentional loads are disconnected. Clips are clear of blades. Never use current mode across the generator.",
    "help": "Never use current mode across the generator. A 100 ohm resistor across its terminals is a load, not A0 protection. It can heat up and needs a suitable rating. The teacher checks DC or AC output; this program needs a checked positive DC input.",
    "image": "assets/turbine-meter.svg",
    "alt": "Red voltage probe and black COM probe attach to different stationary generator terminals. No Arduino connection.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-raw-maximum",
    "title": "Measure the generator on its own",
    "why": "The interface must suit the generator over the intended test conditions. One slow test is not enough. A meter can still miss fast spikes.",
    "where": "At the Freenove board",
    "do": "Have your teacher test the intended fan settings and distances, including the highest intended speed. Record the maximum observed voltage, polarity and output type.",
    "expected": "The record contains real meter readings. A minus sign is recorded, not ignored.",
    "help": "Some generators reverse polarity when rotation reverses. A meter can miss fast spikes. The observed maximum alone does not establish a safe Arduino input. Keep hands clear of the moving blades.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-interface-gate",
    "title": "Check the protected generator interface",
    "why": "An interface is the circuit between the generator and A0. Its divider, load and protection depend on the measured voltage, polarity and possible spikes. The final design still needs a physical teacher check.",
    "where": "At the Freenove board",
    "do": "Continue only after your teacher physically tests and approves the actual circuit between the generator and A0. If it is not approved, save the bench work and stop here.",
    "expected": "The interface handles the measured range, polarity and possible spikes. A0 stays nonnegative and below the powered reference voltage.",
    "help": "A divider alone, an LED or a 100 ohm load does not establish protection. The final load, divider, rectification and protection depend on the real generator. Do not connect it directly to A0.",
    "links": [],
    "stage": "guided",
    "image": "assets/measure-path.svg",
    "alt": "Generator reaches A0 only through a physically checked teacher-selected interface, then the display. Final interface is unresolved until checked."
  },
  {
    "id": "board-final-scale",
    "title": "Match the code to the checked circuit",
    "why": "The bench sketch assumes two 10k resistors. A different final divider needs its actual resistor values in the sketch. Its calibration must match the real board.",
    "where": "In Arduino IDE",
    "do": "Have your teacher enter the actual resistor values and reference voltage. Save as WindVoltage_Checked_01 and upload with the generator signal disconnected.",
    "expected": "The saved sketch matches the approved interface and calibration.",
    "help": "INPUT_SCALE changes when the resistor ratio changes. Do not keep bench values for a different circuit. The sketch cannot undo an unknown rectifier drop. Keep the complete .ino file in its matching sketch folder.",
    "links": [],
    "stage": "guided",
    "code": "const float ADC_REFERENCE_V = 5.00;\nconst float R_TOP_OHMS = 10000.0;\nconst float R_BOTTOM_OHMS = 10000.0;"
  },
  {
    "id": "board-final-connect",
    "title": "Check the live generator display",
    "why": "All wiring changes happen with power and signal removed. The board must then have USB power before a generator signal is present.",
    "where": "At the Freenove board",
    "do": "Have your teacher connect the approved interface with power and signal removed, power the board by USB, then apply the generator signal. Compare meter and display at the same source terminals under the same load.",
    "expected": "The teacher checks fan-off/on readings at the same loaded terminals. Record the approved interface and calibration. At shutdown, remove the generator signal before removing USB power.",
    "help": "Remove the generator signal before removing USB power. Never compare an unloaded meter result with a loaded Arduino result. Mark unfinished checks Not checked.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "fixed-setup",
    "title": "Set up a fair comparison",
    "why": "A fair comparison changes the fan condition while keeping the other parts the same. Your teacher chooses a safe position and one fan-on setting.",
    "where": "In the team test record",
    "do": "Open your team test record. Record the marked fan distance in cm, fan-on setting, settling time and wait between readings. Write your expected voltage change and reason.",
    "expected": "Use the checked multimeter for recorded readings and compare the Arduino display alongside it. The teacher checks the complete setup before testing.",
    "help": "Settling time is the wait after starting the fan. Keep the same model, distance, connections and fan-on setting for the first comparison. Keep hands clear of blades; leave meter settings and connections to the teacher.",
    "links": [
      [
        "Download blank test sheet",
        "downloads/Wind_Test_Record_Blank.csv"
      ]
    ]
  },
  {
    "id": "before-off-1",
    "title": "Take three fan-off readings",
    "why": "Three readings help you see whether the number stays steady. A real zero is a result; a missing reading is not zero.",
    "where": "At the model and in the team test record",
    "do": "With fan off and blades stopped, take three multimeter readings using the agreed wait. Under Before change, fan off, record readings 1, 2 and 3, each with V. Compare the Arduino display too.",
    "expected": "Your test record has three real fan-off readings, including decimal points and any minus signs.",
    "help": "Example only: 0.42 V is read zero point four two volts. Use your own readings. Write Test not run and a reason if you cannot measure.",
    "links": [],
    "stage": "independent"
  },
  {
    "id": "before-on-1",
    "title": "Take three fan-on readings",
    "why": "Keep the marked distance, fan setting, connections and wait unchanged.",
    "where": "At the model and in the team test record",
    "do": "Have your teacher start the guarded fan. After the settling time, record three multimeter readings under Before change, fan on. Compare the Arduino display. Then stop the fan and wait for all blades to stop.",
    "expected": "Your original record now has six readings, three off and three on.",
    "help": "Record a changing display honestly. Stop if the base moves or a part comes loose. Never touch or adjust moving blades.",
    "links": []
  },
  {
    "id": "before-compare",
    "title": "Compare and choose one improvement",
    "why": "Compare the three fan-off readings with the three fan-on readings. Look for higher, lower, similar or changing readings. You do not need to calculate an average.",
    "where": "In the team report",
    "do": "Compare the three off readings with the three on readings. Use actual values to describe the pattern. Choose one small change with your teacher and record why the evidence supports it.",
    "expected": "Your report says whether the pattern matched your prediction and names just one approved change.",
    "help": "Higher, lower, similar and unclear are all possible results. You do not need an average. If a test was not run, explain what is missing instead of claiming a pattern.",
    "links": []
  },
  {
    "id": "make-change",
    "title": "Make the change and repeat the test",
    "why": "Changing just one thing makes the comparison easier to explain. Keep the first results.",
    "where": "At the wind model",
    "do": "With fan off and blades stopped, make the approved change with your teacher and record its date. After the setup check, repeat three multimeter readings off and three on under After change. Compare the Arduino display and stop the fan afterward.",
    "expected": "Both sets of six readings are saved. Use the same distance, fan setting and timing unless that was the one approved change.",
    "help": "Any electrical change needs power and signal removed. Recheck its code scale and meter comparison before testing. Do not replace original readings or write zero for a test not run.",
    "links": []
  },
  {
    "id": "after-compare",
    "title": "Explain what the results show",
    "why": "Use both sets of real results. A change may help, make no clear difference or make the result worse. All three findings are useful.",
    "where": "In the team report",
    "do": "Under Test and improvement, compare actual before/after voltages. Say whether the change helped, made no clear difference or made the result worse. State one limit.",
    "expected": "Your explanation uses real values and says this test measured voltage under the recorded conditions.",
    "help": "Overlapping or changing readings may make the result unclear. Voltage alone does not show useful power delivered to a device. This fan test differs from outdoor wind. Keep the four report headings: Project; Research; Test and improvement; References.",
    "links": []
  },
  {
    "id": "save-evidence",
    "title": "Save your test evidence",
    "why": "Keep the checked Arduino program, original and after-change test records, and current team report together. The blank CSV is a backup for recording tests, not completed evidence.",
    "where": "In the team Drive folder",
    "do": "Save the actual program, test record and report in the team Drive folder.",
    "expected": "The folder contains the checked sketch and the real evidence, including any test marked Test not run.",
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
    "why": "Use this complete bench-test sketch to check the code you built one section at a time.",
    "do": "Compare your saved sketch with the full code below. These are the AA bench-test settings. Keep the actual resistor values and calibration checked for your generator.",
    "expected": "Four display helpers, one setup and one loop. The sketch reads A0, updates the display and prints the voltage estimate.",
    "help": "Keep your tested program and results. If you try the reference, save a separate numbered copy first. The two 10k bench resistors do not protect against unknown generator voltage, reverse polarity or spikes. Use the actual teacher-approved interface and matching calibration for generator tests. The program is not input protection.",
    "links": [
      [
        "Download complete bench reference",
        "downloads/WindVoltageBench.zip"
      ]
    ],
    "stage": "guided",
    "completeCode": "/* Freenove Projects Board FNK0059 voltage-display BENCH CANDIDATE.\n   Display protocol checked against Freenove's Chapter 16 example.\n   Do not connect an uncharacterized turbine to this input.\n   Bench wiring: known positive DC source -> 10k -> A0 -> 10k -> GND.\n   Source negative -> GND. Board powered separately through USB.\n   Keep A0 between 0 V and the board's measured ADC reference voltage.\n   Resistor divider is NOT transient or reverse-polarity protection.\n*/\n#include <Arduino.h>\n\nconst byte LATCH_PIN = 12;\nconst byte CLOCK_PIN = 13;\nconst byte DATA_PIN = 11;\nconst byte VOLTAGE_PIN = A0;\nconst float ADC_REFERENCE_V = 5.00; // Measure board 5V-to-GND for calibration.\nconst float R_TOP_OHMS = 10000.0;\nconst float R_BOTTOM_OHMS = 10000.0;\nconst float INPUT_SCALE = (R_TOP_OHMS + R_BOTTOM_OHMS) / R_BOTTOM_OHMS;\nconst byte DIGIT[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99,\n                      0x92, 0x82, 0xf8, 0x80, 0x90};\nbyte screen[4] = {0xc0 & 0x7f, 0xc0, 0xc0, 0xff};\nfloat voltage = 0.0;\nunsigned int rawAverage = 0;\nbool atAdcLimit = false;\nunsigned long lastRead = 0;\nunsigned long lastPrint = 0;\n\nvoid sendDigit(byte position, byte segments) {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(1U << position));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, segments);\n  digitalWrite(LATCH_PIN, HIGH);\n}\n\nvoid blankDisplay() {\n  digitalWrite(LATCH_PIN, LOW);\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0));\n  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0xff));\n  digitalWrite(LATCH_PIN, HIGH);\n}\n\nvoid makeScreen() {\n  unsigned int hundredths = (unsigned int)(voltage * 100.0 + 0.5);\n  if (atAdcLimit || hundredths > 999) {\n    for (byte i = 0; i < 4; ++i) screen[i] = 0xbf; // ----: check range.\n    return;\n  }\n  screen[0] = DIGIT[hundredths / 100] & 0x7f; // Whole volts and decimal point.\n  screen[1] = DIGIT[(hundredths / 10) % 10];\n  screen[2] = DIGIT[hundredths % 10];\n  screen[3] = 0xff; // Fourth position intentionally blank.\n}\n\nvoid readVoltage() {\n  unsigned long total = 0;\n  atAdcLimit = false;\n  for (byte i = 0; i < 8; ++i) {\n    unsigned int raw = analogRead(VOLTAGE_PIN);\n    if (raw >= 1020) atAdcLimit = true;\n    total += raw;\n  }\n  rawAverage = (total + 4) / 8;\n  voltage = (total / 8.0) * ADC_REFERENCE_V / 1023.0 * INPUT_SCALE;\n  makeScreen();\n}\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(LATCH_PIN, OUTPUT);\n  pinMode(CLOCK_PIN, OUTPUT);\n  pinMode(DATA_PIN, OUTPUT);\n  pinMode(VOLTAGE_PIN, INPUT); // No internal pull-up on the measuring input.\n  blankDisplay();\n  readVoltage();\n}\n\nvoid loop() {\n  unsigned long now = millis();\n  if (now - lastRead >= 100) {\n    lastRead = now;\n    readVoltage();\n  }\n  // Scan continuously. Blank between digits and before sampling/printing.\n  for (byte i = 0; i < 4; ++i) {\n    sendDigit(i, screen[i]);\n    delay(1);\n    blankDisplay();\n  }\n  if (now - lastPrint >= 250) {\n    lastPrint = now;\n    if (atAdcLimit) {\n      Serial.println(F(\"ADC LIMIT: stop and check input voltage\"));\n    } else {\n      Serial.print(F(\"Voltage: \"));\n      Serial.print(voltage, 2);\n      Serial.print(F(\" V; ADC: \"));\n      Serial.println(rawAverage);\n    }\n  }\n}\n"
  }
];
