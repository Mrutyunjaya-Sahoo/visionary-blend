
window.onload = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    // Photography

    var items = document.querySelectorAll(".list__item");

    items.forEach((item) => {
        var itemTitle = item.querySelector(".list__item__title");
        var itemTitleOutline = item.querySelector(".list__item__titleOutline");
        var itemImg = item.querySelector(".list__item img");

        var itemTL = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "0% 75%",
                end: "25% 50%",
                scrub: 3
            }
        });

        itemTL.fromTo(
            itemTitle,
            { scale: 2, y: "100%" },
            { scale: 1, y: "0%", ease: "power2.inOut" },
            0
        );
        itemTL.fromTo(
            itemTitleOutline,
            { scale: 2, y: "100%" },
            { scale: 1, y: "0%", ease: "power2.inOut" },
            0
        );

        gsap.fromTo(
            itemImg,
            { x: "60vw", y: "60vh", rotate: -30 },
            {
                x: "-60vw",
                y: "-60vh",
                rotate: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "50% 100%",
                    end: "100% 50%",
                    scrub: 3
                }
            }
        );

    });


};

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