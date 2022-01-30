/*jslint browser maxlen:80 */
/*global window */

const mainTitle = document.querySelector('.main-title');
const navBarElems = document.querySelector('body > header > nav');
const contentElems = document.querySelectorAll('#content > div, .main-title');

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
            }
            // else {
            //     elem.classList.remove(inClass);
            // }
        });
    }
}

function updateTitle() {
    "use strict";

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

function updateUrl() {
    "use strict";

    const elements = [];
    let max = null;
    let index = null;

    contentElems.forEach(function (elem) {
        const pos = elem.getBoundingClientRect().top;
        if (pos <= 50) {
            if (max === null || pos > max) {
                max = pos;
                index = Array.from(contentElems).indexOf(elem);
            }
            elements.push(elem);
        }
    });

    if (elements[index] && !window.location.href.includes(elements[index].id)) {
        const hash = 'index.html#' + elements[index].id;
        window.history.replaceState(null, null, hash);
    }
}

function scrollHandler() {
    "use strict";

    toMove('.to-fade', 'fade-in');
    toMove('.to-grow', 'grow-in');
    toMove('.to-slide', 'slide-in');

    updateTitle();

    updateUrl();
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
