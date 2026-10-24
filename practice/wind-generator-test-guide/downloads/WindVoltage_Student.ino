/* Freenove Projects Board FNK0059 voltage display for the existing wind model.
   Direct positive DC input at A0; INPUT_SCALE = 1.0.
   The 220 ohm resistor and LED are parallel loads, not input protection.
   Teacher must verify voltage range, polarity, transients and component ratings.
   Keep A0 nonnegative and below the actual powered reference voltage.
   Power the board by USB before connecting the signal; remove signal before USB.
   Display protocol adapted from Freenove Chapter 16.
*/
#include <Arduino.h>

const byte LATCH_PIN = 12;
const byte CLOCK_PIN = 13;
const byte DATA_PIN = 11;
const byte VOLTAGE_PIN = A0;
const float ADC_REFERENCE_V = 5.00; // Measure board 5V-to-GND for calibration.
const float INPUT_SCALE = 1.0; // Direct A0 reading; no voltage divider.
const byte DIGIT[] = {0xc0, 0xf9, 0xa4, 0xb0, 0x99,
                      0x92, 0x82, 0xf8, 0x80, 0x90};
byte screen[4] = {0xc0 & 0x7f, 0xc0, 0xc0, 0xff};
float voltage = 0.0;
unsigned int rawAverage = 0;
bool atAdcLimit = false;
unsigned long lastRead = 0;
unsigned long lastPrint = 0;

void sendDigit(byte position, byte segments) {
  digitalWrite(LATCH_PIN, LOW);
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(1U << position));
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, segments);
  digitalWrite(LATCH_PIN, HIGH);
}

void blankDisplay() {
  digitalWrite(LATCH_PIN, LOW);
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0));
  shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(0xff));
  digitalWrite(LATCH_PIN, HIGH);
}

void makeScreen() {
  unsigned int hundredths = (unsigned int)(voltage * 100.0 + 0.5);
  if (atAdcLimit || hundredths > 999) {
    for (byte i = 0; i < 4; ++i) screen[i] = 0xbf; // ----: check range.
    return;
  }
  screen[0] = DIGIT[hundredths / 100] & 0x7f; // Whole volts and decimal point.
  screen[1] = DIGIT[(hundredths / 10) % 10];
  screen[2] = DIGIT[hundredths % 10];
  screen[3] = 0xff; // Fourth position intentionally blank.
}

void readVoltage() {
  unsigned long total = 0;
  atAdcLimit = false;
  for (byte i = 0; i < 8; ++i) {
    unsigned int raw = analogRead(VOLTAGE_PIN);
    if (raw >= 1020) atAdcLimit = true;
    total += raw;
  }
  rawAverage = (total + 4) / 8;
  voltage = (total / 8.0) * ADC_REFERENCE_V / 1023.0 * INPUT_SCALE;
  makeScreen();
}

void setup() {
  Serial.begin(9600);
  pinMode(LATCH_PIN, OUTPUT);
  pinMode(CLOCK_PIN, OUTPUT);
  pinMode(DATA_PIN, OUTPUT);
  pinMode(VOLTAGE_PIN, INPUT); // No internal pull-up on the measuring input.
  blankDisplay();
  readVoltage();
}

void loop() {
  unsigned long now = millis();
  if (now - lastRead >= 100) {
    lastRead = now;
    readVoltage();
  }
  // Scan continuously. Blank between digits and before sampling/printing.
  for (byte i = 0; i < 4; ++i) {
    sendDigit(i, screen[i]);
    delay(1);
    blankDisplay();
  }
  if (now - lastPrint >= 250) {
    lastPrint = now;
    if (atAdcLimit) {
      Serial.println(F("ADC LIMIT: stop and check input voltage"));
    } else {
      Serial.print(F("Voltage: "));
      Serial.print(voltage, 2);
      Serial.print(F(" V; ADC: "));
      Serial.println(rawAverage);
    }
  }
}
