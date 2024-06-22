import "./ProgressBarVis.css";
import BadgeVis from "./BadgeVis";

import part0 from "../images/progress0.svg";
import part1 from "../images/progress1.svg";
import part2 from "../images/progress2.svg";
import part3 from "../images/progress3.svg";
import part4 from "../images/progress4.svg";
import part5 from "../images/progress5.svg";
import part6 from "../images/progress6.svg";
import part7 from "../images/progress7.svg";
import part8 from "../images/progress8.svg";

export default function ProgressBarVis({ part, badge, badgeVisibility }) {
	let src = part0;

	if (part === 1) {
		src = part1;
	} else if (part === 2) {
		src = part2;
	} else if (part === 3) {
		src = part3;
	} else if (part === 4) {
		src = part4;
	} else if (part === 5) {
		src = part5;
	} else if (part === 6) {
		src = part6;
	} else if (part === 7) {
		src = part7;
	} else if (part === 8) {
		src = part8;
	}

	return (
		<div>
			<div className='progress-bar-container'>
				<img src={src} alt='circular progress bar' />
			</div>
			<div className='badge-container'>
				<BadgeVis level={badge} visibility={badgeVisibility} />
			</div>
		</div>
	);
}
