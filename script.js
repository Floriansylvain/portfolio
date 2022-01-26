/*jslint browser maxlen:80 */
/*global window */

const mainTitle = document.querySelector('.main-title');
const navBarElems = document.querySelector('body > header > nav');

function toMove(toClass, inClass) {
    "use strict";

    const elementsToMove = document.querySelectorAll(toClass);

    if (elementsToMove !== null) {
        elementsToMove.forEach(function (elem) {
            const distInView = (
                elem.getBoundingClientRect().bottom - (elem.offsetHeight) / 2
            ) - window.innerHeight;
            if (distInView < 0) {
                elem.classList.add(inClass);
            } else {
                elem.classList.remove(inClass);
            }
        });
    }
}

function scrollHandler() {
    "use strict";

    toMove('.to-fade', 'fade-in');
    toMove('.to-grow', 'grow-in');
    toMove('.to-slide', 'slide-in');

    const y = window.scrollY;
    const titlePos = mainTitle.getBoundingClientRect();

    if (titlePos.bottom > 0) {
        const distanceToTop = window.pageYOffset + titlePos.top;
        const elementHeight = mainTitle.offsetHeight;
        const opacity = 1 - ((y - distanceToTop) / elementHeight) * 2;

        if (opacity > 0) {
            const pixelsSpacing = (y * 0.005 <= 0.1
                ? 0.1
                : y * 0.005);
            mainTitle.style.letterSpacing = (pixelsSpacing * 2) + 'em';
            mainTitle.style.opacity = opacity;
        }
    }
}

scrollHandler();

window.addEventListener('scroll', scrollHandler);

function switchNavBar() {
    "use strict";
    const header = document.querySelector('.hamburger').parentNode.classList;

    if (header.contains('slide-in') || header.contains('to-cross')) {
        header.remove('slide-in');
        header.remove('to-cross');
        navBarElems.classList.remove('slide-elements');
    } else {
        header.add('slide-in');
        header.add('to-cross');
        navBarElems.classList.add('slide-elements');
    }
}

document.querySelectorAll('nav a').forEach(function (a) {
    "use strict";
    a.onclick = switchNavBar;
});
