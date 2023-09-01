function assign(element, action, self = false, press = false) {
  element.addEventListener("click", (event) => {
    if (self && event.target != self) return;
    event.preventDefault();
    action(event);
  });

  if (!press)
    element.addEventListener("touchstart", (event) => {
      if (self && event.target != self) return;
      event.preventDefault();
      action(event);
    });
}

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

function slideGoLeft(event) {
  event.preventDefault();

  slideTime = 0;

  slideLeft.classList.add("active");
  setTimeout(() => slideLeft.classList.remove("active"), 200);

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / 100);

  slide.style.transform = `translateX(-${(current ? current - 1 : parseInt(slide.dataset.slides - 1)) * 100}rem)`;
}

function slideGoRight(event) {
  if (event) event.preventDefault();

  slideTime = 0;

  slideRight.classList.add("active");
  setTimeout(() => slideRight.classList.remove("active"), 200);

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / 100);

  slide.style.transform = `translateX(-${(current == parseInt(slide.dataset.slides - 1) ? 0 : current + 1) * 100}rem)`;
}

function translate(index) {
  switch (index) {
    case 0:
      console.log("Türkçe");
      break;
    case 1:
      console.log("English");
      break;
  }
}
