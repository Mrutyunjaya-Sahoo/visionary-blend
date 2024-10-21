gsap.set('.container img.swipeimage', { yPercent: -50, xPercent: -50 });

let activeImage;
gsap.utils.toArray(".container").forEach((el) => {
    let image = el.querySelector('img.swipeimage'),
        setX, setY,
        align = e => {
            setX(e.clientX);
            setY(e.clientY);
        },
        startFollow = () => document.addEventListener("mousemove", align),
        stopFollow = () => document.removeEventListener("mousemove", align),
        fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow });

    el.addEventListener('mouseenter', (e) => {
        fade.play(false);
        startFollow();
        if (activeImage) { // if there's an actively-animating one, we should match its position here
            gsap.set(image, { x: gsap.getProperty(activeImage, "x"), y: gsap.getProperty(activeImage, "y") });
        }
        activeImage = image;
        setX = gsap.quickTo(image, "x", { duration: 0.2, ease: "power3" }),
            setY = gsap.quickTo(image, "y", { duration: 0.2, ease: "power3" })
        align(e);
    });

    el.addEventListener('mouseleave', () => fade.reverse());

});
gsap.utils.toArray(".container-text").forEach((text) => {
    gsap.fromTo(
        text,
        {
            x: -300,  // Start 300px to the left (off-screen)
            opacity: 0,  // Start invisible
        },
        {
            x: 0,  // Slide to its original position
            opacity: 1,  // Fade in as it slides in
            duration: 0.5,  // Fast animation (0.5 seconds)
            ease: "power4.out",  // Smooth easing effect
            scrollTrigger: {
                trigger: text,
                start: "top 80%",  // Start the animation when the element is 80% into the viewport
                end: "top 10%",  // End when it reaches the top 10%
                toggleActions: "play reverse play reverse",  // Play on scroll down, reverse on scroll up
            },
        }
    );
});
gsap.registerPlugin(ScrollTrigger);

// Sliding animation for the "Digital Marketing" title words
gsap.fromTo(
    ".word",
    {
        y: 100,  // Start below the viewport
        opacity: 0,  // Start invisible
    },
    {
        y: 0,  // Slide into the original position
        opacity: 1,  // Fade in
        duration: 0.8,  // Smooth animation over 0.8 seconds
        ease: "power4.out",  // Smooth easing
        stagger: 0.2,  // Stagger animation between words by 0.2s
        scrollTrigger: {
            trigger: ".title-row",
            start: "top 80%",  // Trigger animation when 80% into the viewport
            end: "top 30%",  // End when it reaches 30%
            toggleActions: "play none none reverse",  // Play on scroll down, reverse on scroll up
        },
    }
);

function modeToggle() {
    const root = document.documentElement;

    // Check current background color to determine the mode
    if (getComputedStyle(root).getPropertyValue('--background-color').trim() === 'black') {
        // Switch to light mode
        root.style.setProperty('--background-color', 'white');
        root.style.setProperty('--foreground-color', 'black');
    } else {
        // Switch to dark mode
        root.style.setProperty('--background-color', 'black');
        root.style.setProperty('--foreground-color', 'white');
    }
}
