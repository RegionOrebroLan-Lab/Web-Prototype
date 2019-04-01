import events from "./Events";

class Viewport {
	breakpoint = "desktop";

	constructor() {
		this.bindEvents();
		this.setBreakpoint();
	}

	bindEvents() {
		window.addEventListener("resize", this.setBreakpoint.bind(this));
	}

	setBreakpoint() {
		const newBreakpoint = window
			.getComputedStyle(document.body, ":after")
			.getPropertyValue("content")
			.replace(/['"]+/g, "");

		if (this.breakpoint !== newBreakpoint) {
			this.breakpoint = newBreakpoint;
			events.emit("breakpoint", this.breakpoint);
		}
	}
}

export default new Viewport();