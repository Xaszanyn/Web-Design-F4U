const loading = document.querySelector("#loading");

const main = document.querySelector("main");

const navigation = document.querySelector("nav");

const popUp = document.querySelector("#pop-up");
const popUpsCloses = document.querySelectorAll("#pop-up .close");

const [loginButton, menuButton] = document.querySelectorAll("#navigation > div");
const [login, menu, language] = popUp.querySelectorAll("#pop-up > section");

const [homeButton, menusButton, orderButton, moreButton] = document.querySelectorAll("#navigation-bottom > div");
const [home, menus, order, more] = main.querySelectorAll("main > section");

const slide = document.querySelector("#slide > div");
const [slideLeft, slideRight] = document.querySelectorAll("#slide button");

const [menuLoginButton, menuHomeButton, menuMenusButton, menuOrderButton, menuMoreButton, menuLanguageButton] =
  document.querySelectorAll("#menu button");

const [languageTr, languageEn] = document.querySelectorAll("#language button");

const menuHeadings = document.querySelectorAll(".menu-heading");

const blogs = document.querySelectorAll(".blog");
const blogsCloses = document.querySelectorAll(".blog .close");

var slideTime = 0;
