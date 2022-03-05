/*jslint browser */
/*global window */

const LARGE = 992;

const mainTitle = document.querySelector('.main-title');
const navBar = document.querySelector('body > header');
const navBarElems = document.querySelector('body > header > nav');
const scrollToTop = document.querySelector('#scrollToTop');
const contentElems = document.querySelectorAll('#content > section, .main-title');

const backgroundHider = document.querySelector('.background-hider');
const projectsContentList = document.querySelectorAll('.article-content');

const projectsIDs = Array.from(projectsContentList)
    .map((project) => project.id);

let lastScrollTop = window.scrollY;

function loadCSS() {
    "use strict";
    const stylesheet = document.createElement('link');
    stylesheet.href = 'stylesheet-imgs.css';
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    document.querySelector('head').appendChild(stylesheet);
}

loadCSS();

function toAddClass(toClass, inClass) {
    "use strict";

    const elementsToAddClass = document.querySelectorAll(toClass);

    if (elementsToAddClass !== null) {
        elementsToAddClass.forEach(function (elem) {
            const distInView = elem.getBoundingClientRect().top
                    - window.innerHeight + 100;
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
        const distanceToTop = window.scrollY + titlePos.top;
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

    if (elements[index] &&
            !projectsIDs.includes(elements[index].id) &&
            !window.location.href.includes(elements[index].id)) {
        const hash = 'index.html#' + elements[index].id;
        window.history.replaceState(null, null, hash);
    }
}

function switchArticle(article) {
    "use strict";

    if (backgroundHider.classList.contains('bgh-off')) {
        backgroundHider.classList.remove('bgh-off');
    } else {
        backgroundHider.classList.add('bgh-off');
    }

    if (article !== null) {
        article.style.display = 'flex';
    } else {
        projectsContentList.forEach(function (art) {
            art.style.display = 'none';
        });
    }
}

function updateScrollDirectionElems() {
    "user strict";

    const scrollTop = window.scrollY;
    let opacity = "100%";
    let visibility = "visible";

    if (scrollTop > lastScrollTop && window.innerWidth >= LARGE) {
        opacity = "50%";
    }

    if (scrollTop < 100) {
        visibility = "hidden";
    }

    navBar.style.opacity = opacity;
    scrollToTop.style.visibility = visibility;
    lastScrollTop = scrollTop;
}

function scrollHandler() {
    "use strict";

    toAddClass('.to-fade', 'fade-in');
    toAddClass('.to-grow', 'grow-in');
    toAddClass('.to-slide', 'slide-in');

    updateScrollDirectionElems();

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

document.querySelectorAll('.projects-list article').forEach(function (a) {
    "use strict";
    a.onclick = function () {
        switchArticle(document.getElementById(a.classList[0]));
    };
});
