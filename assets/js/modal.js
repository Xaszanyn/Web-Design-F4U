function openModal(index) {
  modal.classList.remove("disabled");

  modals.forEach((element, i) => {
    if (index == i) element.style.display = "block";
    else element.style.display = "none";
  });
}

function closeModal() {
  modal.classList.add("disabled");

  setTimeout(() => modals.forEach((element) => (element.style.display = "block")), 500);
}

function setLanguage() {
  closeModal();
}
