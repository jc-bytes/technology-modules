// Based on your HC-SR04 code, with your corrected pins: Trig P0, Echo P1.
// Add the Bluetooth extension before pasting.
let trigPin = DigitalPin.P0
let echoPin = DigitalPin.P1
let echoTime = 0
let distanceCm = 0
let stickStatus = "UNKNOWN"
let btConnected = false

function readUltrasonicDistance() {
    pins.digitalWritePin(trigPin, 0)
    control.waitMicros(2)
    pins.digitalWritePin(trigPin, 1)
    control.waitMicros(10)
    pins.digitalWritePin(trigPin, 0)
    return pins.pulseIn(echoPin, PulseValue.High, 25000)
}

bluetooth.onBluetoothConnected(function () {
    btConnected = true
})

bluetooth.onBluetoothDisconnected(function () {
    btConnected = false
    stickStatus = "UNKNOWN"
})

bluetooth.startUartService()

basic.forever(function () {
    echoTime = readUltrasonicDistance()

    // Reject missing echoes and readings outside about 2–400 cm.
    if (echoTime < 116 || echoTime > 23200) {
        distanceCm = 0
        stickStatus = "UNKNOWN"
        basic.showString("?")
    } else {
        // The original sensor code returns microseconds, not centimetres.
        distanceCm = echoTime / 58

        if (distanceCm <= 30) {
            stickStatus = "NEAR"
            basic.showIcon(IconNames.No)
        } else {
            stickStatus = "FAR"
            basic.clearScreen()
        }
    }

    // Send only the result of the fresh reading above.
    if (btConnected) {
        bluetooth.uartWriteLine(stickStatus)
    }

    basic.pause(500)
})
