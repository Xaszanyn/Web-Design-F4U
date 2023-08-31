window.addEventListener("scroll", (event) => {
  if (window.scrollY == 0) document.body.classList.add("initial");
  else document.body.classList.remove("initial");
});

popUpClose.forEach((close) => {
  close.addEventListener("click", (event) => {
    event.preventDefault();
    closePopUp();
  });
  close.addEventListener("touchstart", (event) => {
    event.preventDefault();
    closePopUp();
  });
});

popUp.addEventListener("click", (event) => {
  if (event.target != popUp) return;
  event.preventDefault();
  closePopUp();
});
popUp.addEventListener("touchstart", (event) => {
  if (event.target != popUp) return;
  event.preventDefault();
  closePopUp();
});

[
  [loginButton, login],
  [menuButton, menu],
].forEach(([button, popUp]) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openPopUp(popUp);
  });
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    openPopUp(popUp);
  });
});

[
  [homeButton, home],
  [menusButton, menus],
  [orderButton, order],
  [moreButton, more],
].forEach(([button, section]) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    load(button, section);
  });
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    load(button, section);
  });
});

slideLeft.addEventListener("click", slideGoLeft);
slideLeft.addEventListener("touchstart", slideGoLeft);

slideRight.addEventListener("click", slideGoRight);
slideRight.addEventListener("touchstart", slideGoRight);

[
  [menuHomeButton, home, homeButton],
  [menuMenusButton, menus, menusButton],
  [menuOrderButton, order, orderButton],
  [menuMoreButton, more, moreButton],
].forEach(([button, section, buttonDisplay]) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closePopUp();
    load(buttonDisplay, section);
  });
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    closePopUp();
    load(buttonDisplay, section);
  });
});

[[loginButton, login]].forEach(([button, popUp]) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openPopUp(popUp);
  });
  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    openPopUp(popUp);
  });
});

menuLoginButton.addEventListener("click", (event) => {
  event.preventDefault();
  closePopUp();
  setTimeout(() => openPopUp(login), 200);
});
menuLoginButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  closePopUp();
  setTimeout(() => openPopUp(login), 200);
});
