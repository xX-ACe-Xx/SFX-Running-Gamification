import { useRef, useEffect } from "react";

import part1 from "../sounds/p1.mp3";
import part2 from "../sounds/p2.mp3";
import part3 from "../sounds/p3.mp3";
import part4 from "../sounds/p4.mp3";
import part5 from "../sounds/p5.mp3";
import part6 from "../sounds/p6.mp3";
import part7 from "../sounds/p7.mp3";
import part8 from "../sounds/p8_b.mp3";
import endSound from "../sounds/end.wav";

export default function AudioPlayerController({ nextTrack }) {
	const srcArray = [
		part1,
		part2,
		part3,
		part4,
		part5,
		part6,
		part7,
		part8,
		endSound,
	];

	let currentTrack = null;
	let audioRef = useRef();
	let audioQueue = useRef([]);

	if (nextTrack > 0) {
		currentTrack = srcArray[nextTrack - 1];
	}

	useEffect(() => {
		if (currentTrack !== null) {
			audioQueue.current.push(currentTrack);
			//console.log("added track: " + currentTrack);
		}

		if (audioQueue.current.length === 1) {
			audioRef.current.src = audioQueue.current[0];
			audioRef.current.play().catch((e) => console.log(e));
			console.log("play only Element in Queue");
		}
	}, [currentTrack, nextTrack]);

	function handleEnded() {
		if (
			audioQueue.current.indexOf(audioRef.current.currentSrc.substr(21)) === 0
		) {
			audioQueue.current.shift();
			//console.log("removed played element");
		}
		if (audioQueue.current.length > 0) {
			audioRef.current.src = audioQueue.current[0];
			audioRef.current.play().catch((e) => console.log(e));
			//console.log("played next Element in Queue");
		}
	}

	return <audio src={null} ref={audioRef} onEnded={handleEnded}></audio>;
}
