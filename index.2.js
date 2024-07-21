"use strict";

// SLIDER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
var x = window.matchMedia("(max-width: 650px)");
const slideOne = document.getElementById("sl1");
const dotsID = document.getElementById("dotsID");
const lastSlide = document.querySelector("#lastSlide");
const dots = adjustForScreenSize();

let curSlide = 0;
let touchstartX = 0;
let touchendX = 0;
let slideInterval;

const moveslides = function (s, i) {
  s.style.visibility = "visible";
  s.style.transition = "transform 1s";
  s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
};

// Trying to fix the slides so they don't fan out when you push a button
const init = function () {
  // Spread slides out
  slides.forEach(function (s, i) {
    if (s.classList.contains("vis")) {
      return;
    }
    s.style.transform = `translateX(${100 * i - curSlide}%)`;
    setTimeout(() => {
      s.style.visibility = "visible";
      // s.style.transition = "transform 1s";
    }, 1000);
  });
  centerButtons();
  addDotListeners();
};

const lastSlideNumber = function () {
  if (x.matches) {
    return 7;
  } else return 5;
};

const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    if (slide > -1 && slide < lastSlideNumber()) {
      moveslides(s, i);
    } else if (slide <= -1) {
      curSlide = lastSlideNumber() - 1;
      moveslides(s, i);
    } else if (slide >= lastSlideNumber()) {
      curSlide = 0;
      moveslides(s, i);
    }
  });
};

const nextSlide = function () {
  deactivateDot();
  curSlide++;
  goToSlide(curSlide);
  activateDot();
};
const prevSlide = function () {
  deactivateDot();
  curSlide--;
  goToSlide(curSlide);
  activateDot();
};

// btnRight.addEventListener("click", nextSlide);
// btnLeft.addEventListener("click", prevSlide);

function handleSliderSwipe() {
  if (touchendX < touchstartX) nextSlide();
  if (touchstartX < touchendX) prevSlide();
}

slider.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});
slider.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleSliderSwipe();
});

//Center slide buttons vertically
let slideHeight;
const calcImgHeight = function () {
  const shortestImageHeight = Array.from(slides).reduce((prev, current) => {
    return prev.clientHeight < current.clientHeight
      ? prev.clientHeight
      : current.clientHeight;
  });
  if (shortestImageHeight === 0 && x.matches) {
    return (slideHeight = 320);
  }
  if (shortestImageHeight === 0) return (slideHeight = 286);
  else {
    slideHeight = shortestImageHeight;
  }
};

const adjustSliderHeight = function () {
  slider.style.height = slideHeight + "px";
};

// const buttonHeight = btnLeft.offsetHeight;
// const centerButton = function (btn) {
//   btn.style.transform = `translateY(${slideHeight / 2 - buttonHeight / 2}px)`;
// };
const centerButtons = function () {
  calcImgHeight();
  adjustSliderHeight();
  // centerButton(btnLeft);
  // centerButton(btnRight);
};

init();

window.addEventListener("resize", centerButtons);

// slideOne.onload = centerButtons;

// DOTS
function addDotListeners() {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setSlide(index);
    });
  });
}
const setSlide = function (slideNumber) {
  deactivateDot();
  curSlide = slideNumber;
  goToSlide(curSlide);
  activateDot();
};

function deactivateDot() {
  slides[curSlide].classList.remove("active");
  dots[curSlide].classList.remove("active");
}

function activateDot() {
  // curSlide = (n + slides.length) % slides.length;
  slides[curSlide].classList.add("active");
  dots[curSlide].classList.add("active");
}

function adjustForScreenSize() {
  if (x.matches) {
    dotsID.insertAdjacentHTML(
      "beforeend",
      `<span class="dot" data-slide="6"></span>
    <span class="dot" data-slide="7"></span>`
    );
  }
  const dots = document.querySelectorAll(".dot");
  return dots;
}

lastSlide.addEventListener("load", () => {
  centerButtons();
});
