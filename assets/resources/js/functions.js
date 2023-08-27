function load(button, section) {
  loading.classList.add("loading");

  document.querySelector("main > section.displayed").classList.remove("displayed");

  document.querySelector("#navigation-bottom > div.selected").classList.remove("selected");
  button.classList.add("selected");

  section.classList.add("displayed");

  setTimeout(() => {
    loading.classList.remove("loading");
  }, 200);
}

function openPopUp(section) {
  section.classList.add("displayed");
  popUp.classList.add("displayed");
}

function closePopUp() {
  try {
    popUp.querySelector(".displayed").classList.remove("displayed");
  } catch {}
  popUp.classList.remove("displayed");
}
