let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlide() {
  //init controller
  controller = new ScrollMagic.Controller();
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //gsap
    // Tl/timeline can be chained together so they can be set to different timers
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=.75");
    // slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");
    //create new scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "Slide",
      // })
      .addTo(controller);
    //new animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   name: "page",
      //   indent: 200,
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const mouseText = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseText.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseText.innerText = "";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(3500px at 100% -10%)" });
    gsap.to("#logo", 1, { color: "black" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to("#logo", 1, { color: "white" });
    document.body.classList.remove("hide");
  }
}

//barba page transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlide();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destory();
        pageScene.destroy();
        controller.destory();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destory();
      },
    },
    {
      namespace: "forest",
      beforeEnter() {
        forestAnimation();
      },
      beforeLeave() {
        controller.destroy();
        forestScene.destroy();
      },
    },
    {
      namespace: "hike",
      beforeEnter() {
        hikeAnimation();
      },
      beforeLeave() {
        controller.destroy();
        hikeScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //create an animation
        // here we grab the current container and fade it out
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        // here all the swipes are grabed and moved from -100% to 0%
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        // scroll to the top
        window.scrollTo(0, 0);
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          0.75,
          { y: "0%" },
          { y: "-100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   name: "detailScene",
      //   indent: 200,
      // })
      .addTo(controller);
  });
}

function forestAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const h1Text2 = slide.querySelector(".forest2 h1");
    const h1Text1 = slide.querySelector(".forest1 h1");
    const forestNr = slide.querySelectorAll(".forest-nr");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "100%" }, { x: "0%" });
    slideTl.fromTo(
      h1Text1,
      { y: "0%" },
      { y: "100%" },
      { opacity: 1 },
      { opacity: 0 }
    );
    slideTl.fromTo(
      h1Text2,
      { y: "0%" },
      { y: "100%" },
      { opacity: 1 },
      { opacity: 0 }
    );
    slideTl.fromTo(forestNr, { opacity: 0 }, { opacity: 1 }, "0");
    //set scene
    forestScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "pink",
      //   colorTrigger: "pink",
      //   name: "forestScene",
      //   indent: 100,
      // })
      .addTo(controller);
  });
}

function hikeAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({
      defaults: { duration: 2.5, ease: "power4.inOut" },
    });
    // checks to see if the slide is second to last index to 'end' logic
    // if not then it moves forward with logic
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const h1Text1 = slide.querySelector(".hike1 h1");
    const h1Text2 = slide.querySelector(".hike2 h1");
    const hikeNr = slide.querySelectorAll(".hike-nr");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { y: "-1100%" }, { y: "0%" }, "3");
    slideTl.fromTo(
      h1Text1,
      { x: "0%" },
      { x: "100%" },
      { opacity: 1 },
      { opacity: 0 },
      "3"
    );
    slideTl.fromTo(
      h1Text2,
      { x: "0%" },
      { x: "100%" },
      { opacity: 1 },
      { opacity: 0 }
    );
    slideTl.fromTo(hikeNr, { opacity: 0 }, { opacity: 1 }, "0");
    // set scene
    hikeScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "90%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "green",
      //   colorTrigger: "green",
      //   name: "hikeScene",
      //   indent: 75,
      // })
      .addTo(controller);
  });
}

burger.addEventListener("click", navToggle);
window.addEventListener("mouseover", activeCursor);
window.addEventListener("mousemove", cursor);
