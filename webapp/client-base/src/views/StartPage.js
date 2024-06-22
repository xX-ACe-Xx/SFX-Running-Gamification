import StartButton from "../components/StartButton.js";

export default function StartPage({ connection }) {
	return (
		<div className='StartPage'>
			<div className='container-intro'>
				<p>
					After pressing start, you have 20 minutes to run at your personal
					comfort speed, similar to going outside for a run.
				</p>
				<p>Press "Continue" when you are ready to start your run.</p>
			</div>

			<StartButton connection={connection} />
		</div>
	);
}
