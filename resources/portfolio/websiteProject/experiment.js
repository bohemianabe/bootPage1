// const hikeExp = document.querySelector('.hike-exp');

//SCROLL EFFECT

// window.addEventListener('scroll', scrollReveal);

// function scrollReveal(){
//     const hikePos = hikeExp.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight / 1.8;
//     if(hikePos < windowHeight){
//         hikeExp.style.color = 'red';
//     }
//     if (hikePos > windowHeight){
//         hikeExp.style.color = 'white';
//     }
// }

// intersection observer

// const slide = document.querySelector('.hike');

// let options = {
//     //how far in view is the threshold? 0.5 is half way
//     threshold: .99
// }

// let observer = new IntersectionObserver(slideAnim, options);

// function slideAnim(entires) {
//     entires.forEach(entry => {
//         if(entry.isIntersecting){
//             slide.style.background = 'white';
//         }
//     })
// }

// observer.observe(slide);

//SCROLL MAGIC

const controller = new ScrollMagic.Controller();

const exploreScene = new ScrollMagic.Scene({
  triggerElement: ".hike-exp",
  triggerHook: 0.5
}).addIndicators({ colorStart: "white", colorTrigger: "white" })
  .setClassToggle(".hike-exp", "active")
  .addTo(controller);
