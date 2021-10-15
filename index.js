"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

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

////////////////////---------- NAVBAR BUTTONS ----------\\\\\\\\\\\\\\\\\\\\

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("nav__link")) return;

  const sectionId = e.target.getAttribute("href");

  if (sectionId === "#") return;
  if (sectionId === "login.html") window.location.href = sectionId;
  else document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
});
