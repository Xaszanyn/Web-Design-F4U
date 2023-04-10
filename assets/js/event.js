window.addEventListener("scroll", (event) => {
  let y = window.scrollY;

  if (y == 0) {
    navigation.classList.remove("small");
  } else {
    navigation.classList.add("small");
  }
});
