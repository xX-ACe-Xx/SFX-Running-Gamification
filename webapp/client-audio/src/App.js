import { useState } from "react";
import { useEffect } from "react";
import { socket } from "./socket";

import "./App.css";
import StartPage from "./views/StartPage.js";
import RunningPage from "./views/RunningPage.js";
import EndPage from "./views/EndPage.js";
import AudioPlayerController from "./components/AudioPlayerController.js";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [currentStage, setStage] = useState("start");
	const [currentProgress, setProgress] = useState(0);
	const [isMoving, setIsMoving] = useState(false);

	let currentPage = <StartPage connection={isConnected} />;

	let audioPlayerNextTrack = 0;

	if (currentStage === "start") {
		currentPage = <StartPage connection={isConnected} />;
	} else if (currentStage === "running") {
		audioPlayerNextTrack = currentProgress;
		currentPage = (
			<div>
				<RunningPage isMoving={isMoving}></RunningPage>
			</div>
		);
	} else if (currentStage === "end") {
		audioPlayerNextTrack = 9;
		currentPage = (
			<div>
				<EndPage></EndPage>
			</div>
		);
	} else {
		currentPage = <p> No valid State </p>;
	}

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
			setProgress(0);
		}

		function onChangeStage(value) {
			setStage(value);
		}

		function onUpdateProgress(value) {
			if (value !== 0) {
				setProgress(value);
			}
		}

		function onTreadmillMoving() {
			setIsMoving(true);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("change_stage", onChangeStage);
		socket.on("update_progress", onUpdateProgress);
		socket.on("treadmill_moving", onTreadmillMoving);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("change_stage", onChangeStage);
			socket.off("update_progress", onUpdateProgress);
			socket.off("treadmill_moving", onTreadmillMoving);
		};
	}, []);

	return (
		<div className='App'>
			<div className='grid-container'>
				{currentPage}
				<AudioPlayerController nextTrack={audioPlayerNextTrack} />
			</div>
		</div>
	);
}

export default App;
