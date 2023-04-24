window.addEventListener("scroll", (event) => {
  let y = window.scrollY;

  if (y == 0) {
    navigation.classList.remove("small");
  } else {
    navigation.classList.add("small");
  }
});

city.addEventListener("change", (event) => {
  district.disabled = false;
  district.selectedIndex = 0;

  districts.forEach((option) => {
    if (option.classList.contains(city.value)) option.hidden = false;
    else option.hidden = true;
  });
});
