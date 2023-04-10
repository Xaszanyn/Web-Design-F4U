const slider = document.querySelector("#horizontal");
var position = 0;

function left() {
  position = (((position - 1) % slider.childElementCount) + slider.childElementCount) % slider.childElementCount;
  slider.style.transform = `translateX(${-position * 100}%)`;
}

function right() {
  position = (position + 1) % slider.childElementCount;
  slider.style.transform = `translateX(${-position * 100}%)`;
}
