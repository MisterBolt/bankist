"use strict";

////////////////////---------- SELECTING ELEMENTS ----------\\\\\\\\\\\\\\\\\\\\

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const nav = document.querySelector(".nav");
const header = document.querySelector("header");
const allSections = document.querySelectorAll(".section");
const imagesSection1 = document.querySelectorAll("img[data-src]");

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

////////////////////---------- SECTIONS ----------\\\\\\\\\\\\\\\\\\\\

// REVEAL
function revealSection(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  sectionsObserver.unobserve(entry.target);
}

const sectionsObserver = new IntersectionObserver(revealSection, { threshold: 0.2 });

allSections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

// LAZY LOADING IMAGES
function lazyLoadImage(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  imagesObserver.unobserve(entry.target);
}

const imagesObserver = new IntersectionObserver(lazyLoadImage, { rootMargin: "200px" });

imagesSection1.forEach(img => imagesObserver.observe(img));
