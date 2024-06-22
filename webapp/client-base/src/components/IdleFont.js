import "./IdleFont.css";
import { useEffect, useState } from "react";

export default function IdleFont() {
	const [seconds, setSeconds] = useState(0);

	const dot1 = ".";
	const dot2 = "..";
	const dot3 = "...";

	useEffect(() => {
		let interval = null;

		interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [seconds]);

	const start_style = {
		border: "2px solid green",
		borderRadius: "10px",
	};

	return (
		<div>
			<p>
				Press <span style={start_style}>START</span> on the treadmill. It will
				take about 3 seconds for the treadmill to start moving. The application
				is going to recognize this and start the run.
			</p>
			<h3>
				Waiting for the treadmill to move{" "}
				{seconds % 3 === 0 ? dot1 : seconds % 3 === 1 ? dot2 : dot3}{" "}
			</h3>
		</div>
	);
}
