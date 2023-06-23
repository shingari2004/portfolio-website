const header = document.querySelector("header");

const progress_section = document.querySelector(".circle-container");
const progress_counters = document.querySelectorAll(".inside-content span");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");
const toggleBtn = document.querySelector(".toggle-btn");

let skillsPlayed = false;

window.addEventListener("scroll", () => {
 /*  activeLink(); */
   mlCounter();
  skillCounter();
});

function updateCount(num, maxNum){
  let currentNum = +num.innerText;

  if(currentNum < maxNum){
    num.innerText = currentNum + 1;
    setTimeout(() =>{
      updateCount(num, maxNum);
    }, 20);
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



/* -------------------------------Sticky Navbar-------------------------------- */

function stickyNavbar(){
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
}
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* -------------------------------Reveal Animation-------------------------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px"
});

sr.reveal(".showcase-info", {delay: 200});
sr.reveal(".showcase-img", {origin:"top", delay: 300});

/* -------------------------------skill progress Animation-------------------------------- */



function skillCounter(){
  if(!isElementInViewport(progress_section)) return;
  skillsPlayed = true;
  progress_counters.forEach(ptr => {
    let target = +ptr.dataset.target;

    setTimeout(() => {
      updateCount(ptr, target);
    })
  }

  )
}


/* -------------------------------services count  Animation-------------------------------- */



function mlCounter(){
  if(!isElementInViewport(ml_section)) return;
    ml_counters.forEach(ctr => {
      let target = +ctr.dataset.target;
  
      setTimeout(() => {
        updateCount(ctr, target);
      });
  });
};

/* -------------------------------Portfolio Filter  Animation-------------------------------- */



let mixer = mixitup(".portfolio-gallery", {
    selectors: {
      target: ".prt-card",
  },
  animation: {
      duration: 700,
  },
});

/* -------------------------------Modal Pop Up  Animation-------------------------------- */

let currentIndex = 0;
zoom_icons.forEach((icn, i) =>icn.addEventListener('click' , () =>{
  prt_section.classList.add("open");
  document.body.classList.add("stopScrolling");
  currentIndex = i;
  changeImage(currentIndex);
}));

modal_overlay.addEventListener("click", () =>{
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () =>{
  if(currentIndex ==0){
    currentIndex = 5;
  }
  else
  currentIndex--;
  changeImage(currentIndex);
})
next_btn.addEventListener("click", () =>{
  if(currentIndex ==5){
    currentIndex = 0;
  }
  else
  currentIndex++;
  changeImage(currentIndex);
})

function changeImage(index){
  images.forEach(img => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}


/* -------------------------------Testimonial swiper  Animation-------------------------------- */

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed : 500,
  autoplay: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

/* -------------------------------CHange Active link on Scroll -------------------------------- */

/* function activeLink(){
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections).map((sct, i) =>{
    return  {
    y: sct.getBoundingClientRect().top - header.offsetHeight*18,
    id: i,
};
}).filter((sct) => sct.y <= 0);

let currSectionID = passedSections.at(-1).id;
links.forEach(l => l.classList.remove("active"));
links[currSectionID].classList.add("active");
} */

toggleBtn.addEventListener("click", () => {
  if(!document.body.classList.contains("dark")){
    document.body.classList.add("dark");
    toggleBtn.classList.replace("fa-moon", "fa-sun");
  }
  else{
    document.body.classList.remove("dark");
    toggleBtn.classList.replace("fa-sun", "fa-moon");
  }
});