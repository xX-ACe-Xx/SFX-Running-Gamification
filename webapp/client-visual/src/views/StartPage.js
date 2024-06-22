import { useState } from "react";
import StartButton from "../components/StartButton.js";
import Explanation from "./Explanation.js";

export default function StartPage({ connection }) {
	const [page, setPage] = useState("Explanation");

	function changePage() {
		setPage("Start");
	}
	return (
		<div className='StartPage'>
			{page === "Explanation" ? (
				<div>
					<Explanation></Explanation>
					<button type='button' onClick={changePage}>
						Continue
					</button>
				</div>
			) : (
				<div>
					<div className='container-intro'>
						<p>
							After pressing start, you have 20 minutes to run at your personal
							comfort speed, similar to going outside for a run.
						</p>
						<p>Press "Continue" when you are ready to start your run.</p>
					</div>
					<StartButton connection={connection} />
				</div>
			)}
		</div>
	);
}
