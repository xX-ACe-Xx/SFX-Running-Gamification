const { MockBinding } = require("@serialport/binding-mock");
const { SerialPortStream } = require("@serialport/stream");
const { ReadlineParser } = require("@serialport/parser-readline");

// mock instance of the arduino uno
// sends a distance update every 2 seconds after the tracking started

let tracking = false;
let counter = 0;
let intervalID;
let timeoutID;

function mockDistance() {
	counter += 3.44;
	mockArduino.port.emitData("DISTANCE " + counter + "\n");
}

const parser = new ReadlineParser();

// mock up serial port
MockBinding.createPort("COM3", { echo: true, record: true });
mockArduino = new SerialPortStream({
	binding: MockBinding,
	path: "COM3",
	baudRate: 9600,
});

mockArduino.on("open", () => {
	mockArduino.port.emitData("Arduino setup complete\n");
	mockArduino.pipe(parser).on("data", (data) => {
		if (data.includes("START")) {
			tracking = true;
			counter = 0;
			mockArduino.port.emitData("received start command\n");
			timeoutID = setTimeout(function () {
				intervalID = setInterval(mockDistance, 1000);
			}, 3000);
		}

		if (tracking) {
			if (data.includes("STOP")) {
				tracking = false;
				mockArduino.port.emitData("received stop command\n");
				mockArduino.port.emitData("END " + counter + "\n");
				clearInterval(intervalID);
				clearTimeout(timeoutID);
			}
		}
		//console.log('CONSOLE MockParser: ' + data);
	});
});

module.exports = { mockArduino };
