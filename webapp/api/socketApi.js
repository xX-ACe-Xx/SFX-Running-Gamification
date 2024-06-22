const arduino = require("./arduino"); // for the arduino events
const LogFile = require("./logWriter"); // to create the logs

let logFile = null;

const io = require("socket.io")(); // for communication to the frontend

const socketApi = {
	io: io,
};

// Socket.io Logic
io.on("connection", function (socket) {
	console.log("client connected");

	// react to progress in the frontend
	socket.on("change_stage", function (data, condition) {
		this.stage = data;
		socket.emit("change_stage", data); // emit change back, so that the frontend is updated
		console.log("SOCKET SERVER DEBUG - change stage to:" + data);

		// a run has finished:
		if (data === "end") {
			//console.log("SOCKET SERVER DEBUG - stop the arduino");
			arduino.arduinoEvents.emit("stop_arduino");
		}

		// a run has started:
		if (data === "running") {
			arduino.arduinoEvents.emit("start_arduino");
			logFile = new LogFile(condition);
		}
	});

	// handle disconnects by ending the run
	socket.on("disconnect", function () {
		console.log("SOCKET SERVER DEBUG - client disconnected");
		if (logFile != null) {
			logFile.addToLog("DISCONNECT", new Date());
		}
		arduino.arduinoEvents.emit("stop_arduino");
	});
});

// react to progress from the arduino and forward it to the frontend
arduino.arduinoEvents.on("update_progress", function (data) {
	if (Number(data) != 0) {
		console.log("SOCKET SERVER DEBUG - Progress Level " + data);
		logFile.addProgressToLog(data);
	}

	io.emit("update_progress", data);
});

arduino.arduinoEvents.on("update_badge", function (data) {
	console.log("SOCKET SERVER DEBUG - Badge Level " + data);
	io.emit("update_badge", data);
	logFile.addBadgeToLog(data);
});

arduino.arduinoEvents.on("final_distance", function (data) {
	console.log("SOCKET SERVER DEBUG - final Distance " + data);
	logFile.endLog(data);
});

arduino.arduinoEvents.on("treadmill_moving", () => {
	io.emit("treadmill_moving");
	logFile.startLog();
});
module.exports = socketApi;
