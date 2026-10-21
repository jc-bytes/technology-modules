// Completed BUTTON REHEARSAL reference, not a student starter.
// Add the official MakeCode Bluetooth extension first.
// Keep the teacher-approved project security/pairing configuration.
// No sensor source, pins, physical measurement, or wiring is supplied here.
// Before merging into the physical project, REMOVE all three button handlers
// AND this rehearsal forever loop. Copy only variables, UART and connection events.
// Set status in its EXISTING checked invalid/near/far sensor branches.
// Add guarded sending and pause500 at the END OF THAT SAME sensor loop.
// Do not keep a separate background sender in the real sensor project.
let status = "UNKNOWN"
let btConnected = false
bluetooth.startUartService()
bluetooth.onBluetoothConnected(function () {
    btConnected = true
})
bluetooth.onBluetoothDisconnected(function () {
    btConnected = false
    status = "UNKNOWN"
})
input.onButtonPressed(Button.A, function () {
    status = "NEAR"
})
input.onButtonPressed(Button.B, function () {
    status = "FAR"
})
input.onButtonPressed(Button.AB, function () {
    status = "UNKNOWN"
})
basic.forever(function () {
    if (btConnected) {
        bluetooth.uartWriteLine(status)
    }
    basic.pause(500)
})
