import { useState } from "react";

import StartButton from "../components/StartButton.js";
import Explanation from "./Explanation.js";

export default function StartPage({ connection }) {
	const [page, setPage] = useState("Explanation");
	let content = <p>no valid state</p>;

	if (page === "Explanation") {
		content = (
			<div>
				<Explanation></Explanation>
				<button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						setPage("Start");
					}}>
					Continue
				</button>
			</div>
		);
	} else if (page === "Start") {
		content = (
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
		);
	}

	return <div className='StartPage'>{content}</div>;
}
