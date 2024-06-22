import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../socket";
import IdleFont from "../components/IdleFont";
import ProgressBarVis from "../components/ProgressBarVis";

export default function RunningPage({
	progress,
	badge,
	badgeVisibility,
	isMoving,
}) {
	const [state, setState] = useState("idle");

	let content = <IdleFont />;

	if (state === "idle") {
		if (isMoving) {
			setState("running");
		}
	}

	if (state === "running") {
		content = (
			<ProgressBarVis
				part={progress}
				badge={badge}
				badgeVisibility={badgeVisibility}
			/>
		);
	}

	useEffect(() => {
		if (state === "running") {
			setTimeout(
				() => socket.timeout(5000).emit("change_stage", "end"),
				1200000
			); //1200000
		}
		return () => {};
	}, [state]);
	// Show the current Progress
	// Show badges when earned
	// receive and react to the Data from the Arduino
	return <div className='RunningPage'>{content}</div>;
}
