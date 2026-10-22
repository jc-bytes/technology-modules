// Bluetooth setup reference ONLY, not a complete sensor program.
// Keep the current checked sensor pins, read block, units and validity rule.
// Add these blocks once to that project.
let stickStatus = "UNKNOWN"
let btConnected = false
bluetooth.startUartService()
bluetooth.onBluetoothConnected(function () {
    btConnected = true
})
bluetooth.onBluetoothDisconnected(function () {
    btConnected = false
    stickStatus = "UNKNOWN"
})
// In each EXISTING decision branch, assign exactly one result:
// valid near: stickStatus = "NEAR"
// valid far: stickStatus = "FAR"
// unusable: stickStatus = "UNKNOWN"
// At the end of the SAME fresh sensor loop, after the entire decision:
// if (btConnected) bluetooth.uartWriteLine(stickStatus)
// Keep one checked pause, not an independent background sender.
