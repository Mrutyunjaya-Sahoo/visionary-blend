
import StudioFreightLenis from "https://cdn.skypack.dev/@studio-freight/lenis@1.0.17";

const setup = () => {
	const tl = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".scroll-container",
				start: "top top",
				end: "60% center",
				scrub: true,
				markers: true
			}
		})
		.add("0");

	tl
		.from(
			".wrapper",
			{
				rotationX: 16,
				rotationY: -32,
				rotationZ: 16,
				xPercent: 8,
				yPercent: -10,
				z: "24rem"
			},
			"0"
		)
		.from(
			".column:nth-child(even)",
			{
				yPercent: -8
			},
			"0"
		)
		.from(
			".column:nth-child(odd)",
			{
				yPercent: 8
			},
			"0"
		);
};

window.onload = function () {
	// const tl = gsap.timeline();
	// tl.set(".wrapper", { opacity: 0 })
	// tl.to(".wrapper", {
	// 	rotationX: 16,
	// 	rotationY: -32,
	// 	rotationZ: 16,
	// 	xPercent: 8,
	// 	yPercent: -10,
	// 	z: "24rem",
	// 	opacity: 1,
	// 	duration: 1,
	// 	onComplete: setup
	// });
	setup();
};

const lenis = new StudioFreightLenis();

// lenis.on("scroll", (e) => {
// 	console.log(e);
// });

// function raf(time) {
// 	lenis.raf(time);
// 	requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
