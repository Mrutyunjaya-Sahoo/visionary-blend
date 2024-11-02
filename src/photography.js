//lOGO
//helper
//remove style
function removeStyle(el) {
    document.querySelector(el).removeAttribute("style");
}

//mobile up breakpoints
var viewport = window.innerWidth;
var tablet = 480;
var desktop = 1024;

//timeline variables
var dur = 0.35;
var _tl = new TimelineLite();
var tl1 = new TimelineMax({ ease: Power1.easeOut });

//set starting position
var lines = ["#line_left", "#line_right"];
_tl.set("h1", { autoAlpha: 0, scale: 1.2 });
_tl.set("#tagline", { autoAlpha: 0 });
_tl.set(lines, { autoAlpha: 0, width: "0px" });

//animation timeline
tl1.to("h1", dur * 2.5, { autoAlpha: 1, scale: 1 }, "start");
tl1.to("#tagline", dur * 2.5, { autoAlpha: 1, scale: 1 }, "start");

if (viewport < tablet) {
    tl1.to(
        ["#line_left", "#line_right"],
        dur,
        {
            autoAlpha: 1,
            width: "40px",
            onComplete: function () {
                removeStyle("#line_left");
                removeStyle("#line_right");
            }
        },
        "start+=" + dur
    );
} else if (viewport > tablet && viewport < desktop) {
    tl1.to(
        ["#line_left", "#line_right"],
        dur,
        {
            autoAlpha: 1,
            width: "70px",
            onComplete: function () {
                removeStyle("#line_left");
                removeStyle("#line_right");
            }
        },
        "start+=" + dur
    );
} else if (viewport > desktop) {
    tl1.to(
        ["#line_left", "#line_right"],
        dur,
        {
            autoAlpha: 1,
            width: "100px",
            onComplete: function () {
                removeStyle("#line_left");
                removeStyle("#line_right");
            }
        },
        "start+=" + dur
    );
}


//CARDS PHOTOS
const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: [
                {
                    id: 1,
                    title: "Ring Ceremony",
                    desc:
                        "In this precious moment, two hearts unite, pledging a forever promise that marks the beginning of an endless love story.",
                    photo:
                        "https://i.postimg.cc/YSqbbXYt/ring.jpg"
                },
                {
                    id: 2,
                    title: "Pre-Wedding",
                    desc:
                        "Capturing the anticipation, laughter, and love that radiates from two souls on the brink of a lifetime together.",
                    photo:
                        "https://i.postimg.cc/25cTJ47h/DSC7739.jpg"
                },
                {
                    id: 3,
                    title: "Wedding",
                    desc:
                        "The most unforgettable day, filled with vows, laughter, and cherished moments that will forever be treasured in our hearts.",
                    photo:
                        "https://i.postimg.cc/sXMKRvT8/IMG-20240715-200140-909.jpg"
                },
                {
                    id: 4,
                    title: "Post-Wedding",
                    desc:
                        "Reliving the magic of your wedding day, one beautiful moment at a time, as the love only grows stronger.",
                    photo:
                        "https://i.postimg.cc/sXMKRvT8/IMG-20240715-200140-909.jpg"
                },
                {
                    id: 5,
                    title: "Maternity Shoot",
                    desc:
                        "Embracing the journey of motherhood, capturing the beauty of love and life as a new story begins to bloom.",
                    photo:
                        "https://i.pinimg.com/564x/32/d7/c1/32d7c1ceee566574fa12d2733744a4d6.jpg"
                },
                {
                    id: 6,
                    title: "Birthday",
                    desc:
                        "Every birthday is a beautiful chapter, celebrated with joy, laughter, and a heart full of gratitude for the gift of life.",
                    photo:
                        "https://i.postimg.cc/cJbMTddc/DSC5351.jpg"
                },
                {
                    id: 7,
                    title: "Product Shoot",
                    desc:
                        "Showcasing products with elegance and creativity, highlighting the unique details that make every item stand out beautifully.",
                    photo:
                        "https://img.freepik.com/free-photo/medium-shot-photographer-taking-fruit-photos_23-2150506081.jpg?t=st=1730501397~exp=1730504997~hmac=ce704f2879e9b00f01530edefc281ae7055502059e935728cf0c85dc82d67662&w=1060"
                },
                {
                    id: 8,
                    title: "Corporate Event",
                    desc:
                        "A professional day filled with milestones and achievements, capturing the heart of your corporate success story.",
                    photo:
                        "https://i.postimg.cc/ZYQ3rL3j/IMG-20240923-200814-997.jpg"
                },
                {
                    id: 9,
                    title: "Album Design (All Types)",
                    desc:
                        "Each album page tells a timeless story, designed with care to hold memories that will forever warm your heart.",
                    photo:
                        "https://img.freepik.com/free-vector/hand-drawn-wedding-youtube-channel-art_23-2149156970.jpg?t=st=1730501522~exp=1730505122~hmac=ae359ce8f4e4bdd3b4884a01d91512d07dc06400e35c71e0caf201d5146503aa&w=1060"
                },
                {
                    id: 10,
                    title: "Baby Shower",
                    desc:
                        "Celebrating a little one’s journey, surrounded by love, joy, and anticipation for all the precious moments ahead.",
                    photo:
                        "https://img.freepik.com/free-psd/baby-shower-template-design_23-2151200736.jpg?t=st=1730501586~exp=1730505186~hmac=d005cafa4ec119836ea7d59e6622ff93f24e1c6c2b134cd44ccdc70075ab5676&w=740"
                },
                {
                    id: 11,
                    title: "Fashion Shoot",
                    desc:
                        "Capturing style and grace in every frame, showcasing the essence of fashion through creative and inspiring imagery.",
                    photo:
                        "https://i.postimg.cc/J0hjq644/IMG-20240923-212212-187.jpg"
                }

            ],
            currentNum: 0,
            isAnimating: false
        };
    },
    computed: {
        currentCard() {
            return this.cards[this.currentNum];
        }
    },
    methods: {
        playFoward() {
            this.isAnimating = true;
            let tl = gsap.timeline({
                defaults: {
                    duration: 0.7,
                    ease: "sine.out"
                },
                onComplete: () => {
                    this.playReverse();
                    if (this.currentNum >= this.cards.length - 1) {
                        this.currentNum = 0;
                    } else {
                        this.currentNum++;
                    }
                    this.isAnimating = false; // Set to false when animation completes
                }
            });
            tl.to("#mask-1", {
                yPercent: 100,
                scaleY: 1.4
            })
                .to(
                    "#mask-2",
                    {
                        yPercent: -100,
                        scaleY: 1.4
                    },
                    "<"
                )
                .to(
                    "#card-info-title",
                    {
                        clipPath: `polygon(0 0, 100% 0, 100% 0%, 0% 0%)`
                    },
                    "<0.4"
                )
                .to(
                    "#card-info-desc",
                    {
                        clipPath: `polygon(0 0, 100% 0, 100% 0%, 0% 0%)`
                    },
                    "<0.3"
                );
        },
        playReverse() {
            let tl = gsap.timeline({
                defaults: {
                    duration: 0.7,
                    ease: "sine.in"
                }
            });
            tl.to("#mask-1", {
                yPercent: -100,
                scaleY: 1.4
            })
                .to(
                    "#mask-2",
                    {
                        yPercent: 100,
                        scaleY: 1.4
                    },
                    "<"
                )
                .to(
                    "#card-info-title",
                    {
                        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`
                    },
                    "<0.2"
                )
                .to(
                    "#card-info-desc",
                    {
                        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`
                    },
                    "<0.3"
                );
        },
        nextCard() {
            this.playFoward();
        },
        prevCard() {
            if (!this.isAnimating) { // Check if not animating before moving back
                this.isAnimating = true;

                let tl = gsap.timeline({
                    defaults: { duration: 0.7, ease: "sine.out" },
                    onComplete: () => {
                        this.playReverse();
                        if (this.currentNum === 0) {
                            this.currentNum = this.cards.length - 1;
                        } else {
                            this.currentNum--;
                        }
                        this.isAnimating = false;
                    }
                });

                tl.to("#mask-1", { yPercent: 100, scaleY: 1.4 })
                    .to("#mask-2", { yPercent: -100, scaleY: 1.4 }, "<")
                    .to("#card-info-title", { clipPath: `polygon(0 0, 100% 0, 100% 0%, 0% 0%)` }, "<0.4")
                    .to("#card-info-desc", { clipPath: `polygon(0 0, 100% 0, 100% 0%, 0% 0%)` }, "<0.3");
            }
        }
    }
}).mount("#app");

