
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
    const sectionName = allSections[i].getAttribute('data-nav');

    const li = document.createElement('li');
    li.textContent = sectionName;
    // giving each item in the nav menu an ID so it can be accessed properly
    li.id = `list__item--${i}`
    // adding an event listener so that when the li is clicked the window is smoothly scrolled to the specified section
    li.addEventListener('click',function(ev){
        smoothScroll(allSections[i])
    })
    navList.appendChild(li);
}

// Set sections as active

navList.firstChild.classList.add("active")

function activate(sectionRef,section){
    // activating the section in the nav menu
    for (let i=0; i<navList.childElementCount;i++) {
        let sectionInNav = navList.children[i];
        if (sectionInNav.id === sectionRef){
            sectionInNav.classList.add("active")
        } else {
            sectionInNav.classList.remove("active")
        }
    }
    // activating the section in the body
    for (let sec of allSections){
        sec.classList.remove('active')
    }
    section.classList.add('active')
}

document.addEventListener('scroll',function checkAndActivate(evt){
    for (let i=0;i<secN;i++) {
        let secRef = navList.children[i]
        let section = allSections[i]
        if ((section.getBoundingClientRect().top <= 350) && (section.getBoundingClientRect().top > 0)) {
            activate(secRef.id, section)
        }
    }
})


const nav = document.querySelector(".header__nav")
nav.appendChild(navList)


// Making a responsive nav menu
const header = document.querySelector(".page__header")
const navBtn = document.querySelector(".nav__btn")

navBtn.addEventListener('click',function (evt) {
    navBtn.classList.toggle('clicked')
    if (navBtn.classList.contains('clicked')) {
        header.classList.add("aside")
        nav.classList.add("aside")
        navBtn.innerHTML = `<i class="fa-solid fa-angles-left"></i>`
    } else {
        header.classList.remove("aside")
        nav.classList.remove("aside")
        navBtn.innerHTML = `<i class="fa-solid fa-bars"></i> topics`
    }
})

// fixing the resizing bug 
window.onresize = (evt) => {
    if (window.innerWidth > 850 && navBtn.classList.contains('clicked')) {
        header.classList.remove("aside")
        nav.classList.remove("aside")
        navBtn.innerHTML = `<i class="fa-solid fa-bars"></i> topics`
    }
}