const fs = require("fs");

// create LogFile class for saving all statistics
// condition: string which represents the test condition (base/audio/visual)
class LogFile {
	constructor(condition) {
		this.statistics = {
			condition: condition, // base, audio, visual
			startTimestamp: null, // for calculating the time it took to reach progress milestones
			progressTimestamps: [], // collection of all progress timestamps
			badgeTimestamps: [], // collection of all badge timestamps
			totalDistance: 0,
		};

		// set timestamp on object creation
		let d = new Date();

		// construct path for log file
		this.date =
			d.getDate() +
			"-" +
			(d.getMonth() + 1) +
			"-" +
			d.getFullYear() +
			"_" +
			d.getHours() +
			"-" +
			d.getMinutes();
		this.path = "./logs/" + this.date + ".txt";

		// create log file
		fs.writeFile(this.path, "Log of " + this.date + "\r\n", (err) => {
			// In case of a error throw err.
			if (err) throw err;
		});
	}

	// base function for adding to the log file with a timestamp
	// data: data that should be appended to the log file as text
	// date: Date Object timestamp
	addToLog(data, date) {
		//console.log(date);
		let timestamp = date;
		//console.log(timestamp);
		// format Date object to [hh:mm:ss] timestamp
		timestamp =
			"[" +
			timestamp.getHours() +
			":" +
			timestamp.getMinutes() +
			":" +
			timestamp.getSeconds() +
			"] ";
		fs.appendFile(this.path, timestamp + data + "\r\n", (err) => {
			// In case of a error throw err.
			if (err) throw err;
		});
	}

	startLog() {
		let timestamp = new Date();
		this.statistics.startTimestamp = timestamp;
		this.addToLog("START", timestamp);
	}

	// specific function to add a progress level
	// data: progress level (1-8)
	addProgressToLog(data) {
		let timestamp = new Date();
		// add timestamp to the collection
		this.statistics.progressTimestamps.push(timestamp);
		this.addToLog("PROGRESS reached Progress Level " + data, timestamp);
	}
	// specific function to add a new badge
	// data: badge level (1-6)
	addBadgeToLog(data) {
		let timestamp = new Date();
		// add timestamp to the collection
		this.statistics.badgeTimestamps.push(timestamp);
		this.addToLog("BADGE reached Badge for kilometer " + data, timestamp);
	}

	// ends the written log file with the final distance and creates a csv from the final statistics
	// data: final distance in meters
	endLog(data) {
		let timestamp = new Date();
		// add timestamp to the collection
		this.statistics.totalDistance = data.trim();
		this.addToLog("END final distance: " + data, timestamp);

		/*console.log(
			"LOG WRITER DEBUG - statistics for this run:\n" + this.statistics
		);*/
		this.createCSV();
	}

	// turns the statistics object into an csv entry
	// output follows this scheme:
	// participant_id,trial_nr,condition,distance_total_m,p0_1, ... ,p0_8,p1_1, ... ,p5_8,b1, ... ,b6
	createCSV() {
		// Participant ID and trial nr. have to be added by hand
		let output = "PARTICIPANT_ID,TRIAL_NR,GROUP," + this.statistics.condition;
		output = output.concat("," + this.statistics.totalDistance.toString());
		// add the time in seconds, it took to reach that progress level
		this.statistics.progressTimestamps.forEach((value) => {
			output = output.concat(
				"," +
					(
						(value.getTime() - this.statistics.startTimestamp.getTime()) /
						1000
					).toString()
			);
		});

		// add NA for all not reached progress levels up to 6 km
		for (let i = 0; i < 48 - this.statistics.progressTimestamps.length; i++) {
			output = output.concat(",NA");
		}

		// add the time in seconds, it took to reach that badge level
		this.statistics.badgeTimestamps.forEach((value) => {
			output = output.concat(
				"," +
					(
						(value.getTime() - this.statistics.startTimestamp.getTime()) /
						1000
					).toString()
			);
		});
		// add NA for all not reached badge levels up to 6 km
		for (let i = 0; i < 6 - this.statistics.badgeTimestamps.length; i++) {
			output = output.concat(",NA");
		}
		console.log("LOG WRITER DEBUG - CSV Entry for this run:\n" + output);
		// save the entry in the "csv/entries" folder
		fs.writeFile("./csv/entries/" + this.date + ".txt", output, (err) => {
			// In case of a error throw err.
			if (err) throw err;
		});
	}
}

module.exports = LogFile;
