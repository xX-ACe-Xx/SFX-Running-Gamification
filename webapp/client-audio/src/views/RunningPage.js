import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../socket";
import IdleFont from "../components/IdleFont";

export default function RunningPage({ isMoving }) {
	const [state, setState] = useState("idle");

	let content = <p>no valid state</p>;

	if (state === "idle") {
		content = <IdleFont />;
		if (isMoving) {
			setState("running");
		}
	}

	if (state === "running") {
		content = (
			<div>
				<h2>Run in progress</h2>
			</div>
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

	return <div className='RunningPage'>{content}</div>;
}
