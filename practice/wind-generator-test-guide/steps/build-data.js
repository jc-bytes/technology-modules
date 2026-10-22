export const buildSteps = [
  {
    "id": "goal",
    "title": "What you will make",
    "why": "Moving air turns the blades and generator. We will make the board show its voltage, then compare fan-off and fan-on readings. Voltage is electrical push, measured in volts, written V.",
    "where": "At the wind model",
    "do": "Use the already-built wind model. Keep the generator disconnected from the Arduino until its input circuit is checked.",
    "expected": "The blades turn the generator. A meter reading in V shows measured voltage; spinning alone does not.",
    "help": "Use the approved built model. You will use a supplied Arduino sketch for the voltage display; you do not need to rebuild the turbine.",
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
    "help": "The supplied program is for that checked board. A different processor or supply needs a checked program and input circuit. USB powers the board separately.",
    "links": [],
    "stage": "guided",
    "image": "assets/freenove-board-reference.png",
    "alt": "Reference photo of a Freenove project board, not a turbine wiring diagram."
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
    "id": "board-display-download",
    "title": "Open the display check",
    "why": "Test the existing display before connecting a measuring signal. This small sketch should show 0123. A sketch is an Arduino program.",
    "where": "In this guide",
    "do": "Download DisplayCheck.ino and open it in Arduino IDE.",
    "expected": "The editor shows the supplied display-check sketch. No generator or battery is connected.",
    "help": "A sketch is an Arduino program. If Arduino asks to create a DisplayCheck folder, accept. Keep the .ino file inside its matching folder.",
    "links": [
      [
        "Download display check",
        "downloads/DisplayCheck/DisplayCheck.ino"
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
    "id": "board-display-upload",
    "title": "Upload and check 0123",
    "why": "Upload copies the program to the connected board. USB supplies board power. There is still no measuring source connected.",
    "where": "In Arduino IDE",
    "do": "Click Upload. When it finishes, check that all four display positions read 0123 in order.",
    "expected": "All four digits are readable and correctly ordered. Stop here if any digit is wrong or missing.",
    "help": "Ask your teacher to check the board and switches if the display fails. Upload success alone does not prove that the display works.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "board-bench-download",
    "title": "Open the voltage program",
    "why": "WindVoltageBench.ino is a supplied bench-test program. You will read its main parts instead of typing a long program without understanding it.",
    "where": "In this guide",
    "do": "Download WindVoltageBench.ino and open it in Arduino IDE. Keep the generator disconnected.",
    "expected": "The complete voltage sketch is visible. Keep a copy of the downloaded file.",
    "help": "Accept a matching WindVoltageBench folder if Arduino asks. The program first uses a known low-voltage AA source, not the unknown generator.",
    "links": [
      [
        "Download voltage sketch",
        "downloads/WindVoltageBench.ino"
      ],
      [
        "Code sources",
        "downloads/CODE-SOURCES.txt"
      ]
    ],
    "stage": "guided"
  },
  {
    "id": "board-input-pin",
    "title": "Find the input and display pins",
    "why": "A0 reads the measuring circuit. D11 sends display patterns, D13 moves their bits and D12 makes the new pattern appear. These display wires are already on the board.",
    "where": "In Arduino IDE",
    "do": "Find these four pin names near the top of the sketch. Keep their supplied values.",
    "expected": "VOLTAGE_PIN is A0. Display data is D11, clock D13 and latch D12.",
    "help": "On this checked 5 V board, analogRead produces a count from 0 to 1023. The physical A0 input must stay nonnegative and below the actual powered reference voltage. Code cannot protect the input wires.",
    "links": [],
    "stage": "guided",
    "code": "const byte VOLTAGE_PIN = A0;\nconst byte LATCH_PIN = 12;\nconst byte CLOCK_PIN = 13;\nconst byte DATA_PIN = 11;"
  },
  {
    "id": "board-conversion",
    "title": "See how the count becomes volts",
    "why": "The code averages eight quick A0 samples. It converts that count into A0 volts, then multiplies by INPUT_SCALE to estimate voltage before the divider.",
    "where": "In Arduino IDE",
    "do": "Find this line in readVoltage. Follow it from left to right.",
    "expected": "Divide by 8 for the average, multiply by the board reference, divide by 1023, then multiply by the divider scale.",
    "help": "The reference starts at 5.00 V. Your teacher checks the real value. Two equal 10k resistors give a scale of 2. These quick samples are separate from your three recorded test readings.",
    "links": [],
    "stage": "guided",
    "code": "voltage = (total / 8.0) * ADC_REFERENCE_V / 1023.0 * INPUT_SCALE;"
  },
  {
    "id": "board-decimal",
    "title": "See how the display stays readable",
    "why": "The program rounds the voltage to hundredths and shows X.XX. It lights each digit briefly, over and over, so all digits look steady.",
    "where": "In Arduino IDE",
    "do": "Find makeScreen and the four-position scan in loop. Keep the supplied DIGIT table and sendDigit function.",
    "expected": "The decimal point follows the first digit. The fourth position is blank. Avoid long pauses in the display loop.",
    "help": "DIGIT stores segment patterns for 0 through 9. sendDigit transfers the position, then the pattern, between latch LOW and HIGH. The scan repeats four positions with a 1 ms pause and blanks between them. The program updates the measurement about every 100 ms. Two decimal places do not prove 0.01 V accuracy.",
    "links": [],
    "stage": "guided",
    "code": "// Round a positive reading to hundredths:\nunsigned int hundredths = (unsigned int)(voltage * 100.0 + 0.5);\n// Add the decimal point:\nscreen[0] = DIGIT[hundredths / 100] & 0x7f;"
  },
  {
    "id": "board-zero-limit",
    "title": "Know when to stop",
    "why": "0.00 is a near-zero estimate. It cannot tell an unplugged source from a stopped generator. ---- means a sampled count neared the ADC limit or the value exceeded the display format.",
    "where": "In Arduino IDE",
    "do": "Remember these meanings before applying a test signal: 0.00 is near zero; ---- means remove the signal and ask your teacher to check.",
    "expected": "You will stop on dashes. You will not treat 0.00 as proof that a source is connected.",
    "help": "The program uses dashes near the ADC limit or above its display range. This software warning is not electrical protection. An unsafe input can damage the board before it responds.",
    "links": [],
    "stage": "guided",
    "code": "if (atAdcLimit || hundredths > 999) {\n  for (byte i = 0; i < 4; ++i) screen[i] = 0xbf;\n  return;\n}"
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
    "why": "The complete supplied sketch handles measuring and display refresh together.",
    "where": "In Arduino IDE",
    "do": "After the wiring check, connect USB and upload WindVoltageBench.ino. Open Serial Monitor at 9600 baud.",
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
    "do": "With USB power on, have your teacher connect AA positive through the upper resistor and AA negative to GND. Compare the board reading with the checked meter across the AA terminals.",
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
    "do": "With the fan off and blades stopped, have your teacher check black in COM, red in V, and the correct voltage mode and range. Attach one probe to each generator terminal.",
    "expected": "The clips are clear of the blades. The LED and other intentional loads are removed for the unloaded check.",
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
    "expected": "The teacher checks fan-off and fan-on readings and approves the display estimate. Record the interface, divider values and calibration check.",
    "help": "Remove the generator signal before removing USB power. Never compare an unloaded meter result with a loaded Arduino result. Mark unfinished checks Not checked.",
    "links": [],
    "stage": "guided"
  },
  {
    "id": "fixed-setup",
    "title": "Set up a fair comparison",
    "why": "A fair comparison changes the fan condition while keeping the other parts the same. Your teacher chooses a safe position and one fan-on setting.",
    "where": "In the team test record",
    "do": "Record the marked fan distance in cm, one fan-on setting, settling time and wait between readings. Write your expected voltage change and reason before measuring.",
    "expected": "The teacher checks the base, guarded fan, blades and measuring connections. Only fan off/on will change during the first comparison.",
    "help": "Keep hands clear of blades and leave meter settings and connections to the teacher. A settling time is how long you wait after starting the fan before reading.",
    "links": []
  },
  {
    "id": "before-off-1",
    "title": "Take three fan-off readings",
    "why": "Three readings help you see whether the number stays steady. A real zero is a result; a missing reading is not zero.",
    "where": "At the model and in the team test record",
    "do": "With the fan off and blades stopped, take three readings using the agreed wait. Record each under Before change, fan off, as reading 1, 2 and 3, with V.",
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
    "do": "Have your teacher start the guarded fan. After the settling time, record three readings under Before change, fan on. Then stop the fan and wait for all blades to stop.",
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
    "do": "With fan off and blades stopped, make the approved change with your teacher. Record the change and date. After the teacher checks the setup, repeat three off and three on readings under After change. Stop the fan afterward.",
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
  }
];
