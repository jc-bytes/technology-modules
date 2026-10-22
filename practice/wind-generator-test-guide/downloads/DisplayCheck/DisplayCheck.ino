// Display-only check for Freenove Projects Board FNK0059. No turbine connected.
// Pin map and digit protocol: Freenove Chapter 16, 4-digit 7-segment Display.
#include <Arduino.h>
const byte DATA_PIN = 11, LATCH_PIN = 12, CLOCK_PIN = 13;
const byte DIGITS[4] = {0xc0, 0xf9, 0xa4, 0xb0}; // 0, 1, 2, 3
void send(byte position, byte segments) {
 digitalWrite(LATCH_PIN, LOW);
 shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, byte(1U << position));
 shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, segments);
 digitalWrite(LATCH_PIN, HIGH);
}
void setup() {
 pinMode(DATA_PIN, OUTPUT);
 pinMode(LATCH_PIN, OUTPUT);
 pinMode(CLOCK_PIN, OUTPUT);
}
void loop() {
 for (byte position = 0; position < 4; ++position) {
  send(position, DIGITS[position]);
  delay(1);
 }
}
