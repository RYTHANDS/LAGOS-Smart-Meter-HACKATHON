let Voltage = 0
let My_Monthly_Average = 0
let VoltReading = 0
radio.setGroup(5)
basic.showNumber(pins.analogReadPin(AnalogPin.P0))
basic.forever(function () {
    VoltReading = pins.analogReadPin(AnalogPin.P0)
    if (pins.analogReadPin(AnalogPin.P0) >= 1) {
        radio.sendNumber(100)
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else {
        radio.sendNumber(0)
    }
})

radio.onReceivedNumber(function (receivedNumber) {
    while (receivedNumber == 100) {
        VoltReading += pins.analogReadPin(AnalogPin.P0)
    }
    while (receivedNumber == 0) {
        VoltReading = pins.analogReadPin(AnalogPin.P0)
    }
})

input.onButtonPressed(Button.A, function () {
    My_Monthly_Average = pins.analogReadPin(AnalogPin.P3)
    if (My_Monthly_Average >= pins.analogReadPin(AnalogPin.P3) - 1000) {
        basic.showIcon(IconNames.No)
    }
})

input.onButtonPressed(Button.B, function () {
    Voltage = VoltReading * (1000 / 340)
    basic.showNumber(Voltage)
})

