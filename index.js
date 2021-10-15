"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const nav = document.querySelector(".nav");
const header = document.querySelector("header");

////////////////////---------- MODAL WINDOW ----------\\\\\\\\\\\\\\\\\\\\

function openModal(e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////---------- LEARN MORE BUTTON ----------\\\\\\\\\\\\\\\\\\\\

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////---------- NAVBAR ----------\\\\\\\\\\\\\\\\\\\\

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("nav__link")) return;

  const sectionId = e.target.getAttribute("href");

  if (sectionId === "#") return;
  if (sectionId === "login.html") window.location.href = sectionId;
  else document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
});

// HOVER LINKS
function hoverNavLinks(e) {
  if (e.target.classList.contains("nav__link")) {
    const links = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("img");

    links.forEach(link => {
      if (link !== e.target) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener("mouseover", hoverNavLinks.bind(0.5));
nav.addEventListener("mouseout", hoverNavLinks.bind(1));

// STICKY NAV
function stickyNav(entries) {
  if (!entries[0].isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header);
