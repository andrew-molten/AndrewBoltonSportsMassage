"use strict";

/* TO DO LIST

*Fix slider for tablet 1080px viewport/smaller viewport

*/

// Navigation
const nav = document.querySelector(".nav");
const btnBookOnline = document.querySelector(".book-online");
const headerLogo = document.querySelector(".header-logo");

function navBarAction() {
  const x = document.getElementById("topNav");
  if (x.className === "nav") {
    x.className += " responsive";
    headerLogo.className += " responsive";
  } else {
    x.className = "nav";
    headerLogo.className = "header-logo";
  }
}

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
