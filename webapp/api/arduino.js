const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const ArduinoEventEmitter = require("node:events");
const mockArduino = require("./mockArduino");

let currentProgressBar = 0;
let currentBadge = 0;

// handles all events for the serial communication, that have to be synced with the socket io communication
const arduinoEvents = new ArduinoEventEmitter();

// mock Arduino for testing
/*const port = mockArduino.mockArduino;*/

// Serial Port Set-up
const port = new SerialPort({
	path: "COM3",
	baudRate: 9600,
});

// Newline Parser Set-Up
const parser = new ReadlineParser();
port.pipe(parser);
let parsing = false;
let running = false;

// calculates in what progress section the current distance falls
// meter: numerical value
function checkForProgress(meter) {
	let kilometerProgress = meter % 1000;
	let progressBar = 0;
	if (kilometerProgress > 995) {
		progressBar = 8;
	} else if (kilometerProgress > 875) {
		progressBar = 7;
	} else if (kilometerProgress > 750) {
		progressBar = 6;
	} else if (kilometerProgress > 625) {
		progressBar = 5;
	} else if (kilometerProgress > 500) {
		progressBar = 4;
	} else if (kilometerProgress > 375) {
		progressBar = 3;
	} else if (kilometerProgress > 250) {
		progressBar = 2;
	} else if (kilometerProgress > 125) {
		progressBar = 1;
	}

	// check if there is a change in the current progress section
	if (progressBar != currentProgressBar) {
		console.log(
			"ARDUINO SERVER DEBUG - ProgressCheck: " +
				progressBar +
				", current Progress Level: " +
				currentProgressBar
		);
		// check if we have completed a full kilometer
		if (progressBar < currentProgressBar && currentProgressBar === 8) {
			currentBadge += 1;
			arduinoEvents.emit("update_badge", currentBadge);
		}
		// update the current progress section
		currentProgressBar = progressBar;
		arduinoEvents.emit("update_progress", currentProgressBar);
	}
}

// Serial Port Communication with Arduino Uno

// send START Command over Serial and reset Badge and ProgressBar count
arduinoEvents.on("start_arduino", () => {
	port.write("START\n", function (err) {
		if (err) {
			return console.log("Error on write: ", err.message);
		}
		console.log("ARDUINO SERVER DEBUG - start an arduino");
		currentBadge = 0;
		currentProgressBar = 0;
	});
});

// send STOP Command over Serial
arduinoEvents.on("stop_arduino", () => {
	port.write("STOP\n", function (err) {
		if (err) {
			return console.log("Error on write: ", err.message);
		}
		console.log("ARDUINO SERVER DEBUG - stop an Arduino");
	});
});

port.on("error", function (err) {
	console.log("Error: ", err.message);
});

// parsing incoming data from the arduino
parser.on("data", function (data) {
	// only start checking for other keywords after the START command
	if (data.includes("START")) {
		parsing = true;
	}

	if (parsing) {
		if (data.includes("DISTANCE")) {
			// detect the movement of the treadmill to start the run, by waiting for the first distance update
			if (!running) {
				running = true;
				arduinoEvents.emit("treadmill_moving");
			}
			console.log(data);
			// take the actual distance value following the DISTANCE keyword
			let value = data.split(" ")[1];
			checkForProgress(value);
		} else if (data.includes("END")) {
			// take the total final distance following the END keyword
			let value = data.split(" ")[1];
			arduinoEvents.emit("final_distance", value);
			parsing = false;
			running = false;
		} else {
			console.log("ARDUINO DEBUG: " + data);
		}
	} else {
		console.log("ARDUINO DEBUG: " + data);
	}
});

module.exports = { arduinoEvents };
