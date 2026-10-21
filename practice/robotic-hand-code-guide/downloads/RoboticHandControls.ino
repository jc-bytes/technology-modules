#include <Servo.h>

Servo motor1;  // D6, 0 to 57
Servo motor2;  // D7, 0 to 180
Servo motor3;  // D8, 0 to 90
Servo motor4;  // D9, middle, 90 to 160
Servo motor5;  // D10, base, 0 to 176

const int S1 = 2;
const int S2 = 3;
const int S3 = 4;
const int S4 = 5;
int middleAngle = 125;
int baseAngle = 86;

void setup() {
  motor1.attach(6);
  motor2.attach(7);
  motor3.attach(8);
  motor4.attach(9);
  motor5.attach(10);
  pinMode(S1, INPUT_PULLUP);
  pinMode(S2, INPUT_PULLUP);
  pinMode(S3, INPUT_PULLUP);
  pinMode(S4, INPUT_PULLUP);
  motor4.write(middleAngle);
  motor5.write(baseAngle);
}

void loop() {
  int pot1 = analogRead(A1);
  int angle1 = map(pot1, 0, 1023, 0, 57);
  motor1.write(angle1);

  int pot2 = analogRead(A2);
  int angle2 = map(pot2, 0, 1023, 0, 180);
  motor2.write(angle2);

  int pot3 = analogRead(A3);
  int angle3 = map(pot3, 0, 1023, 0, 90);
  motor3.write(angle3);

  if (digitalRead(S3) == LOW) {
    middleAngle++;
    if (middleAngle > 160) {
      middleAngle = 160;
    }
    motor4.write(middleAngle);
    delay(20);
  }
  if (digitalRead(S1) == LOW) {
    middleAngle--;
    if (middleAngle < 90) {
      middleAngle = 90;
    }
    motor4.write(middleAngle);
    delay(20);
  }

  if (digitalRead(S4) == LOW) {
    baseAngle++;
    if (baseAngle > 176) {
      baseAngle = 176;
    }
    motor5.write(baseAngle);
    delay(20);
  }
  if (digitalRead(S2) == LOW) {
    baseAngle--;
    if (baseAngle < 0) {
      baseAngle = 0;
    }
    motor5.write(baseAngle);
    delay(20);
  }

  delay(15);
}
