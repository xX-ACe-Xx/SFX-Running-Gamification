export default function EndPage() {
	//appear when time is over
	// thank participant for running and announce next Steps
	const stop_style = {
		border: "2px solid red",
		borderRadius: "10px",
	};
	return (
		<div className='end-page'>
			<h1>Finish</h1>
			<p>
				You made it! 20 minutes are over. You can press{" "}
				<span style={stop_style}>STOP</span> on the treadmill now.
			</p>
			<p>After a short break, we will continue with some questionnaires</p>
		</div>
	);
}
