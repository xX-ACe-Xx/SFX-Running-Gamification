# Arduino Distance-Tracker

An Arduino Uno is attached to the treadmill (Taurus T10.3 Pro), which is equipped with a QRE1113 IR reflection sensor. For serial communication, the Arduino is connected with a USB cable. The baud rate used is `9600`.
The sensor is connected to the `A0` pin on the board.

The sensor detects when the white mark on the treadmill belt passes. A counter goes up for each run and is multiplied by the length of the treadmill belt (3.44 m) to calculate the distance covered.

## Usage

On connecting, the Arduino outputs the following:

```arduino
Arduino is starting ...
Sensor is over the mark: [true/false]
Arduino setup complete
```

All incoming serial communication is output once again by the Arduino. Each command must end with an `\n`.

To avoid continuous tracking, you must first send a `START\n` to the Arduino:

```arduino
> START
START
received START command
```

During tracking, the current distance is transmitted in the following form:

```arduino
DISTANCE [distance in meters]
```

When reading out the values, the distance can be determined reliably by waiting for the keyword `DISTANCE` and then parsing the number of meters as `float`. If required, debug information can also be printed without interfering with the distance readout.

To stop tracking, send `STOP\n` to the Arduino:

```arduino
> STOP
STOP
received STOP command
END [finale distance]
```

The total distance traveled is displayed again at the end with `END` as a keyword at the front.
