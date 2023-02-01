"use strict";

/* TO DO LIST

*Fix slider for tablet 1080px viewport/smaller viewport

*/

// Navigation
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const btnBookOnline = document.querySelector(".book-online");
const headerLogo = document.querySelector(".header-logo");
const topNav = document.getElementById("topNav");

const minimizeNavBar = function () {
  topNav.className = "nav__links";
  headerLogo.className = "header-logo";
  nav.style.minHeight = "0px";
  nav.style.height = "0px";
  nav.style.transition = "all 0.9s ease-out";
  navLinks.style.transition = "transform 0.9s ease-out, visibility 0.9s";
};

const expandNavBar = function () {
  topNav.className += " responsive";
  headerLogo.className += " responsive";
  nav.style.maxHeight = "20em";
  nav.style.minHeight = "18.1em";
  nav.style.transition = "all 1s ease";
  navLinks.style.transition = "transform 1s ease, visibility 1s";
};

function navBarAction() {
  if (topNav.className === "nav__links") {
    expandNavBar();
  } else {
    minimizeNavBar();
  }
}

window.addEventListener("resize", function (e) {
  const viewWidth = e.currentTarget.innerWidth;
  if (viewWidth > 950) {
    nav.style.height = "auto";
    nav.style.transition = "none";
    navLinks.style.transition = "none";
  }
  if (viewWidth <= 950) {
    minimizeNavBar();
  }
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
