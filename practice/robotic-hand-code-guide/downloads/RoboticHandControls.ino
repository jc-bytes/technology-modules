#include <Servo.h>

Servo motor1;  // D6, 0 to 57
Servo motor2;  // D7, 0 to 180
// Motor 3 on D8 is broken and disabled. A3 is unused.
Servo motor4;  // D9, middle, 90 to 160
Servo motor5;  // D10, base, 0 to 176

const int S1 = 2;
const int S2 = 3;
const int S3 = 4;
const int S4 = 5;
int middleAngle = 125;
int baseAngle = 86;

void setup() {
  pinMode(S1, INPUT_PULLUP);
  pinMode(S2, INPUT_PULLUP);
  pinMode(S3, INPUT_PULLUP);
  pinMode(S4, INPUT_PULLUP);

  // Load every working motor target before enabling any servo signals.
  // The two active knobs choose their own bounded starting targets.
  int startPot1 = analogRead(A1);
  int startAngle1 = map(startPot1, 0, 1023, 0, 57);
  motor1.write(startAngle1);

  int startPot2 = analogRead(A2);
  int startAngle2 = map(startPot2, 0, 1023, 0, 180);
  motor2.write(startAngle2);

  motor4.write(middleAngle);
  motor5.write(baseAngle);

  // Attaching can move the model toward the loaded targets.
  // The teacher must still check power, starting pose and safe travel.
  motor1.attach(6);
  motor2.attach(7);
  motor4.attach(9);
  motor5.attach(10);
}

void loop() {
  int pot1 = analogRead(A1);
  int angle1 = map(pot1, 0, 1023, 0, 57);
  motor1.write(angle1);

  int pot2 = analogRead(A2);
  int angle2 = map(pot2, 0, 1023, 0, 180);
  motor2.write(angle2);

  // Read each button once. Opposing buttons cancel for this joint.
  bool s3Pressed = digitalRead(S3) == LOW;
  bool s1Pressed = digitalRead(S1) == LOW;
  if (s3Pressed && !s1Pressed) {
    middleAngle++;
    if (middleAngle > 160) {
      middleAngle = 160;
    }
    motor4.write(middleAngle);
    delay(20);
  }
  if (s1Pressed && !s3Pressed) {
    middleAngle--;
    if (middleAngle < 90) {
      middleAngle = 90;
    }
    motor4.write(middleAngle);
    delay(20);
  }

  bool s4Pressed = digitalRead(S4) == LOW;
  bool s2Pressed = digitalRead(S2) == LOW;
  if (s4Pressed && !s2Pressed) {
    baseAngle++;
    if (baseAngle > 176) {
      baseAngle = 176;
    }
    motor5.write(baseAngle);
    delay(20);
  }
  if (s2Pressed && !s4Pressed) {
    baseAngle--;
    if (baseAngle < 0) {
      baseAngle = 0;
    }
    motor5.write(baseAngle);
    delay(20);
  }

  delay(15);
}
