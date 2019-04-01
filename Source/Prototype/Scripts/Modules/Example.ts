import { viewport, events } from "../Utils/Index";

const example = () => {
	// Get viewport
	console.log("🖥", viewport.breakpoint);

	// Event subscription
	events.on("breakpoint", bp => {
		console.log("🖥", bp);
	});
};

export default example();