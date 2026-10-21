// Warning logic reference only. This file does not read any sensor or select pins.
// Keep the existing hardware-specific MakeCode extension and reading code.
// Call this function AFTER that code provides a centimetre value and its checked
// true/false validity result. Do not replace a project with this function alone.
// showWarning(distanceCm, readingValid)
function showWarning(distanceCm: number, readingValid: boolean) {
    if (readingValid) {
        if (distanceCm <= 30) {
            basic.showIcon(IconNames.No)
        } else {
            basic.clearScreen()
        }
    } else {
        basic.showString("?")
    }
}
