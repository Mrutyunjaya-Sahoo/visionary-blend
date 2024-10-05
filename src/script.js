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
    .fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.5');

// Navbar

document.addEventListener("DOMContentLoaded", function () {
    let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
    const toggleButton = document.querySelector(".menu-burger");
    const menuItems = document.querySelectorAll(".menu-item p a"); // Select all the menu links
    let isOpen = false;

    gsap.set(".menu-item p", {
        y: 255,
    });

    const timeline = gsap.timeline({
        paused: true,
    });

    timeline
        .to(".overlay", {
            duration: 1.5,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ease: "power4.inOut",
        })
        .to(
            ".menu-item p",
            {
                duration: 1.5,
                y: 0,
                stagger: 0.2,
                ease: "power4.out",
            },
            "-=1"
        )
        .to(
            activeItemIndicator,
            {
                width: "100%",
                duration: 1,
                ease: "power4.out",
                delay: 0.5,
            },
            "<"
        )
        .to(
            ".sub-nav",
            {
                bottom: "10%",
                opacity: 1,
                duration: 0.5,
                delay: 0.5,
            },
            "<"
        );

    // Toggle button functionality
    toggleButton.addEventListener("click", function () {
        if (isOpen) {
            timeline.reverse();
            toggleButton.classList.remove('active'); // Remove the "active" class when closing the menu
        } else {
            timeline.play();
            toggleButton.classList.add('active'); // Add the "active" class when opening the menu
        }
        isOpen = !isOpen;
    });

    // Close menu and hide the close button after clicking any menu item
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior to smoothly handle the animation

            // Play reverse animation to close the menu
            if (isOpen) {
                timeline.reverse();
                toggleButton.classList.remove('active'); // Reset close button to menu button
                isOpen = false;

                // Simulate page redirection after animation ends (optional)
                setTimeout(() => {
                    // Scroll to the section or navigate to the new page
                    window.location.href = item.getAttribute('href');
                }, 1500); // Wait for the animation to complete (adjust timing based on your animation duration)
            }
        });
    });
});



// Overlapping cards Services

let Container = document.querySelectorAll(".service-container");
let Cards = gsap.utils.toArray(".card");

Cards.forEach((card, index) => {
    const last = index === Cards.length - 1;
    console.log(last)
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: "top top",

            scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            snap: true,
        }
    })

    tl.to(card, {
        scale: 0.8,
        filter: "blur(5px)",
        stagger: {
            each: 1,
            from: "start"
        }
    }, "<");
}
)

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



