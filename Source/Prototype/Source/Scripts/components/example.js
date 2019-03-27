import { viewport, events } from "../utils";

const example = () => {
	// Get viewport
	console.log("🖥", viewport.breakpoint);

	// Event subscription
	events.on("breakpoint", (bp) => {
		console.log("🖥", bp);
	});
};

export default example();