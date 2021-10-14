"use strict";

////////////////////---------- MODAL WINDOW ----------\\\\\\\\\\\\\\\\\\\\

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

function toggleModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

btnsOpenModal.forEach(btn => btn.addEventListener("click", toggleModal));

btnCloseModal.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    toggleModal();
  }
});
