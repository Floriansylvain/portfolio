const mainTitle = document.querySelector('.main-title')
const navBarElems = document.querySelector('body > header > nav')

const mainContent = document.querySelectorAll('#content')

function fadeIn() {
    const elementsToFade = document.querySelectorAll(".to-fade")
    if (elementsToFade !== null) {
        elementsToFade.forEach(elem => {
            const distInView = (elem.getBoundingClientRect().bottom - (elem.offsetHeight) / 2) - window.innerHeight
            if (distInView < 0) {
                elem.classList.add("fade-in")
            } else {
                elem.classList.remove("fade-in")
            }
        })
    }
}

function scrollHandler() {
    fadeIn()
    const y = window.scrollY
    const titlePos = mainTitle.getBoundingClientRect()

    if (titlePos.bottom > 0) {
        const distanceToTop = window.pageYOffset + titlePos.top
        const elementHeight = mainTitle.offsetHeight
        const opacity = 1 - ((y - distanceToTop) / elementHeight) * 2

        if (opacity > 0) {
            mainTitle.style.letterSpacing = (y * 0.005 <= 0.1 ? 0.1 : y * 0.005) * 2 + 'em'
            mainTitle.style.opacity = opacity
        }
    }
}

scrollHandler()

window.addEventListener('scroll', scrollHandler)

function switchNavBar() {
    const header = document.querySelector('.hamburger').parentNode.classList

    if (header.contains('slide-in') || header.contains('to-cross')) {
        header.remove('slide-in')
        header.remove('to-cross')
        navBarElems.classList.remove('slide-elements')
    } else {
        header.add('slide-in')
        header.add('to-cross')
        navBarElems.classList.add('slide-elements')
    }
}

document.querySelectorAll('nav a').forEach(a => {
    a.onclick = switchNavBar
})
