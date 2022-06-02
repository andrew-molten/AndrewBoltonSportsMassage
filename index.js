"use strict";

// SLIDER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
var x = window.matchMedia("(max-width: 1080px)");
const slideOne = document.getElementById("sl1");

let curSlide = 0;

const moveslides = function (s, i) {
  s.style.visibility = "visible";
  s.style.transition = "transform 1s";
  s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
};

// Trying to fix the slides so they don't fan out when you push a button
const init = function () {
  centerButtons();
  // Spread slides out
  slides.forEach(function (s, i) {
    if (s.classList.contains("vis")) {
      return;
    }
    s.style.transform = `translateX(${100 * i - curSlide}%)`;
    setTimeout(() => {
      s.style.visibility = "visible";
      s.style.transition = "transform 1s";
    }, 1000);
  });
};

const lastSlideNumber = function () {
  if (x.matches) {
    return 7;
  } else return 5;
};

const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    if (curSlide > -1 && curSlide < lastSlideNumber()) {
      moveslides(s, i);
    } else if (curSlide <= -1) {
      curSlide = lastSlideNumber() - 1;
      moveslides(s, i);
    } else if (curSlide >= lastSlideNumber()) {
      curSlide = 0;
      moveslides(s, i);
    }
  });
};

const nextSlide = function () {
  curSlide++;
  goToSlide(curSlide);
};

const prevSlide = function () {
  curSlide--;
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//Center slide buttons verically
var sliderHeight;

const calcImgHeight = function () {
  sliderHeight = slider.offsetHeight;
};

const buttonHeight = btnLeft.offsetHeight;

const centerButton = function (btn) {
  btn.style.transform = `translateY(${sliderHeight / 2 - buttonHeight / 2}px)`;
};
const centerButtons = function () {
  centerButton(btnLeft);
  centerButton(btnRight);
};
window.onload = function () {
  init();
};
window.addEventListener("resize", centerButtons());
