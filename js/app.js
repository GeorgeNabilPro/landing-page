/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

var allSections = document.querySelectorAll("section")
const secN = allSections.length

const navList = document.createElement('ul')
navList.id = "nav__list"


function smoothScroll(target) {
    let topOffset = target.getBoundingClientRect().top;
    topOffset -= 60;
    window.scrollBy({
        top: topOffset,
        left: 0,
        behavior: 'smooth'
      });
}

for (let i=0; i<secN; i++) {
    const sectionName = allSections[i].id;

    const li = document.createElement('li');
    li.textContent = sectionName;
    li.id = `list__item--${i}`
    li.addEventListener('click',function(ev){
        smoothScroll(allSections[i])
    })
    navList.appendChild(li);
}

// Set sections as active

navList.firstChild.classList.add("active")

function activate(sectionId){
    for (let i=0; i<navList.childElementCount;i++) {
        let section = navList.children[i];
        if (section.id === sectionId){
            section.classList.add("active")
        } else {
            section.classList.remove("active")
        }
    }
}

document.addEventListener('scroll',function checkAndActivate(evt){
    for (let i=0;i<secN;i++) {
        let secRef = navList.children[i]
        let section = allSections[i]
        console.log(section.getBoundingClientRect().top)
        if ((section.getBoundingClientRect().top <= 350) && (section.getBoundingClientRect().top > 0)) {
            activate(secRef.id)
        }
    }
})


const nav = document.querySelector(".header__nav")
nav.appendChild(navList)
