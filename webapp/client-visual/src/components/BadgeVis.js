import badge5 from "../images/badge5.svg";

export default function BadgeVis({ level, visibility }) {
	let src = badge5;
	let opacity;
	if (visibility) {
		opacity = 1;
	} else {
		opacity = 0;
	}

	return (
		<img
			class='badge'
			src={src}
			alt={"Badge Level " + level}
			style={{ opacity: opacity, transition: "opacity 1s" }}
		/>
	);
}
