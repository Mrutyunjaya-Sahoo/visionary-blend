// Cursor
console.clear();

const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function initCursor() {
    for (let i = 0; i < TAIL_LENGTH; i++) {
        let div = document.createElement('div');
        div.classList.add('cursor-circle');
        cursor.append(div);
    }
    cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {
    cursorHistory.shift();
    cursorHistory.push({ x: mouseX, y: mouseY });

    for (let i = 0; i < TAIL_LENGTH; i++) {
        let current = cursorHistory[i];
        let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];

        let xDiff = next.x - current.x;
        let yDiff = next.y - current.y;

        current.x += xDiff * 0.35;
        current.y += yDiff * 0.35;
        cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
    }
    requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();





const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const logo = document.querySelector('.logo'); // Fixed selector from #logo to .logo
const hamburger = document.querySelector('.menu-burger'); // Fixed selector to .menu-burger
const headline = document.querySelector('.headline');

const tl = new TimelineMax();

tl.fromTo(hero, 1, { height: '0%' }, { height: '80%', ease: Power2.easeInOut })
    .fromTo(hero, 1.2, { width: '100%' }, { width: '80%', ease: Power2.easeInOut })
    .fromTo(slider, 1.2, { x: '-100%' }, { x: '0%', ease: Power2.easeInOut }, '-=1.2')
    .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5')
    .fromTo(hamburger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5')
// .fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5');

headline.innerHTML = headline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
tl.staggerFrom('.headline .letter', 1.5, {
    opacity: 0,
    ease: Power4.easeInOut
}, 0.15, 0.2);


// Navbar

document.addEventListener("DOMContentLoaded", function () {
    let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
    const toggleButton = document.querySelector(".menu-burger");
    const menuItems = document.querySelectorAll(".menu-item p a");
    const navBar = document.querySelector("nav");
    const navLinks = document.querySelector(".nav-links");
    let lastScrollY = window.scrollY; // Track previous scroll position
    let isOpen = false;

    gsap.set(".menu-item p", { y: 255 });

    const timeline = gsap.timeline({ paused: true });

    timeline
        .to(".overlay", {
            duration: 1.5,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ease: "power4.inOut",
        })
        .to(".menu-item p", {
            duration: 1.5,
            y: 0,
            stagger: 0.2,
            ease: "power4.out",
        }, "-=1")
        .to(activeItemIndicator, {
            width: "100%",
            duration: 1,
            ease: "power4.out",
            delay: 0.5,
        }, "<")
        .to(".sub-nav", {
            bottom: "10%",
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
        }, "<");

    // Toggle menu functionality
    toggleButton.addEventListener("click", function () {
        if (isOpen) {
            timeline.reverse();
            toggleButton.classList.remove('active');
        } else {
            timeline.play();
            toggleButton.classList.add('active');
        }
        isOpen = !isOpen;
    });

    // Close menu on clicking any menu item
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            if (isOpen) {
                timeline.reverse();
                toggleButton.classList.remove('active');
                isOpen = false;
                setTimeout(() => {
                    window.location.href = item.getAttribute('href');
                }, 1500);
            }
        });
    });

    // Navbar hide on scroll down and show on scroll up
    let isScrollingDown = false; // Track scroll direction

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // Detect scroll direction
        if (currentScrollY > lastScrollY && !isScrollingDown) {
            // Scrolling down, hide navbar
            navBar.classList.remove("navbar-visible");
            navBar.classList.add("navbar-hidden");
            isScrollingDown = true;
            navBar.style.background = "rgba(255, 255, 255, 0.8)";
            navBar.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
        } else if (currentScrollY < lastScrollY && isScrollingDown) {
            // Scrolling up, show navbar
            navBar.classList.remove("navbar-hidden");
            navBar.classList.add("navbar-visible");
            isScrollingDown = false;
        }
        else {
            navBar.style.background = "rgba(255, 255, 255, 0.2)";
            navBar.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
        }
        lastScrollY = currentScrollY; // Update the last scroll position
    });
});

// About section text reveal
gsap.registerPlugin(ScrollTrigger);


// Function to split text into spans
function splitTextToSpans() {
    const elements = document.querySelectorAll('.intro h2, .intro p');

    elements.forEach((el) => {
        const text = el.textContent;
        el.innerHTML = ''; // Clear existing content
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char; // Add each character to span
            el.appendChild(span);
        });
    });
}

// Function to animate characters
function animateCharacters() {
    const elements = document.querySelectorAll('.intro h2, .intro p');

    elements.forEach((el) => {
        const chars = el.querySelectorAll('span');
        let tl = gsap.timeline();
        gsap.fromTo(chars,
            {
                opacity: 0.3,
                stagger: 0.5,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,  // Decrease duration for faster animation
                stagger: 0.03,  // Decrease stagger time for quicker reveal
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    scrub: 0.3,
                    start: "top 50%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse", // Play animation on enter, reverse on exit
                },

            });
    });
}

// Function to animate elements on scroll
function animateAboutSection() {
    const heading = document.querySelector('.section-heading');
    const image = document.querySelector('.about_img');

    // Animate the heading
    gsap.fromTo(heading,
        {
            opacity: 0,
            x: -100, // Start from the left
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 80%", // Start the animation when the top of the element hits 80% of the viewport height
                toggleActions: "play none none reverse", // Play animation on enter, reverse on exit
            }
        }
    );

    // Animate the image
    gsap.fromTo(image,
        {
            opacity: 0,
            y: 100, // Start from the bottom
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: {
                trigger: image,
                scrub: 0.3,
                start: "top 80%", // Start the animation when the top of the element hits 80% of the viewport height
                toggleActions: "play none none reverse", // Play animation on enter, reverse on exit
            }
        }
    );
}

// Call the functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    splitTextToSpans();
    animateCharacters();
    animateAboutSection();
});



// Overlapping cards Services

// let Container = document.querySelectorAll(".service-container");
// let Cards = gsap.utils.toArray(".card");

// Cards.forEach((card, index) => {
//     const last = index === Cards.length - 1;
//     console.log(last)
//     let tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: card,
//             start: "top top",

//             scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//             snap: true,
//         }
//     })

//     tl.to(card, {
//         scale: 0.8,
//         filter: "blur(5px)",
//         stagger: {
//             each: 1,
//             from: "start"
//         }
//     }, "<");
// }
// )


//Services

gsap.to(".img_slider", {
    scrollTrigger: {
        trigger: ".img_slider",
        start: "top bottom",
        scrub: true,
        toggleActions: "restart pause reverse pause"
    },
    x: -300,
    duration: 1
});

gsap.to(".img_sliderr", {
    scrollTrigger: {
        trigger: ".img_sliderr",
        start: "top bottom",
        scrub: true,
        toggleActions: "restart pause reverse pause"
    },
    x: 300,
    duration: 1
});



// Contact 


var see_content = document.querySelector('.see_content');
var contact_details = document.querySelector('.contact_details');

see_content.addEventListener('click', () => {
    var container = document.querySelector('#contact .contact-container');
    var content_container = document.querySelector('.content_container');
    if (container.style.maxHeight) {
        container.style.maxHeight = null;
        contact_details.classList.remove('active');


    } else {
        container.style.maxHeight = container.scrollHeight + "px";
        contact_details.classList.add('active');

    }

})



