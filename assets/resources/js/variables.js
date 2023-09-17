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

const registerPhase = document.querySelector("#register-phase");
const registerEmail = document.querySelector("#register-phase > :first-of-type input");
const registerFirst = document.querySelector("#register-first");
const registerCode = document.querySelector("#register-phase > :nth-of-type(2) input");
const registerSecond = document.querySelector("#register-second");
const registerSecondCode = document.querySelector("#register-phase > :last-of-type > input[type='hidden']");
const registerName = document.querySelector("#register-phase > :last-of-type > :first-of-type > input");
const registerAddress = document.querySelector("#register-phase > :last-of-type > :nth-of-type(2) > textarea");
const registerPhone = document.querySelector("#register-phase > :last-of-type > :nth-of-type(3) > input");
const registerPassword = document.querySelector("#register-phase > :last-of-type > :last-of-type > input");
const registerThird = document.querySelector("#register-third");

var slideTime = 0;
