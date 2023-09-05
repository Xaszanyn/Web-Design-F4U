window.addEventListener("scroll", (event) => {
  if (window.scrollY == 0) document.body.classList.add("initial");
  else document.body.classList.remove("initial");
});

popUpsCloses.forEach((close) => {
  assign(close, closePopUp);
});

assign(popUp, closePopUp, popUp);

assign(loginButton, (event) => openPopUp(login));
assign(menuButton, (event) => openPopUp(menu));

assign(homeButton, (event) => load(homeButton, home));
assign(menusButton, (event) => load(menusButton, menus));
assign(orderButton, (event) => load(orderButton, order));
assign(moreButton, (event) => load(moreButton, more));

assign(slideLeft, slideGoLeft);
assign(slideRight, slideGoRight);

assign(menuHomeButton, (event) => {
  closePopUp();
  load(homeButton, home);
});
assign(menuMenusButton, (event) => {
  closePopUp();
  load(menusButton, menus);
});
assign(menuOrderButton, (event) => {
  closePopUp();
  load(orderButton, order);
});
assign(menuMoreButton, (event) => {
  closePopUp();
  load(moreButton, more);
});

assign(menuLoginButton, (event) => {
  closePopUp();
  setTimeout(() => openPopUp(login), 200);
});

assign(menuLanguageButton, (event) => {
  closePopUp();
  setTimeout(() => openPopUp(language), 200);
});

assign(languageTr, (event) => {
  closePopUp();
  translate(0);
});
assign(languageEn, (event) => {
  closePopUp();
  translate(1);
});

menuHeadings.forEach((menuHeading) =>
  assign(menuHeading, (event) => menuHeading.parentElement.classList.toggle("expanded"), false, true)
);

blogs.forEach((blog) => assign(blog, (event) => openPopUp(blog), false, true));

blogsCloses.forEach((close) => {
  assign(close, closePopUp);
});
