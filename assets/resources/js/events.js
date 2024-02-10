window.addEventListener("scroll", (event) => {
  if (window.scrollY == 0) document.body.classList.add("initial");
  else document.body.classList.remove("initial");
});

window.addEventListener("resize", (event) => {
  slide.style.transform = "translateX(0rem)";
  slideWidth = window.innerWidth / window.innerHeight > 0.75 ? 30 : 100;
});

popUpsCloses.forEach((close) => {
  assign(close, closePopUp);
});

assign(popUp, closePopUp, popUp);

assign(userButton, (event) => load(userButton, user));
assign(loginButton, (event) => openPopUp(login));
assign(menuButton, (event) => openPopUp(menu));

assign(homeButton, (event) => load(homeButton, home));
assign(menusButton, (event) => {
  getMenus();
  load(menusButton, menus);
});
assign(orderButton, (event) => load(orderButton, order));
assign(moreButton, (event) => {
  getContents();
  load(moreButton, more);
});

assign(slideLeft, slideGoLeft);
assign(slideRight, slideGoRight);

assign(menuHomeButton, (event) => closePopUpThenLoad(homeButton, home));
assign(menuMenusButton, (event) => {
  getMenus();
  closePopUpThenLoad(menusButton, menus);
});
assign(menuOrderButton, (event) => closePopUpThenLoad(orderButton, order));
assign(menuMoreButton, (event) => {
  getContents();
  closePopUpThenLoad(moreButton, more);
});
assign(menuLoginButton, (event) => openAnotherPopUp(login));
assign(menuLanguageButton, (event) => openAnotherPopUp(language));

assign(languageTr, (event) => translate(0));
assign(languageEn, (event) => translate(1));

assign(registerFromLogin, (event) => openAnotherPopUp(register));
assign(loginFromRegister, (event) => openAnotherPopUp(login));

assign(registerSection.first, registerFirstPhase);
assign(registerSection.second, registerSecondPhase);
assign(registerSection.third, registerThirdPhase);

assign(loginUserButton, loginUser);

uploadImageInput.addEventListener("change", uploadImage);

assign(logout, logoutUser);

assign(
  orderMenu,
  (event) => {
    getMenus();
    load(menusButton, menus);
  },
  false,
  true
);
