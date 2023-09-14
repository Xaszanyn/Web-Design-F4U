const loading = document.querySelector("#loading");

const main = document.querySelector("main");

const navigation = document.querySelector("nav");

const popUp = document.querySelector("#pop-up");
const popUpsCloses = document.querySelectorAll("#pop-up .close");

const [loginButton, menuButton] = document.querySelectorAll("#navigation > div");
const [login, register, menu, language] = popUp.querySelectorAll("#pop-up > section");

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

const notification = document.querySelector("#notification");

const registerFromLogin = document.querySelector("#register-from-login");
const loginFromRegister = document.querySelector("#login-from-register");

const registerEmail = document.querySelector("#register-first-phase input");
const registerFirst = document.querySelector("#register-first");

var slideTime = 0;
