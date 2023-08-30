const loading = document.querySelector("#loading");

const main = document.querySelector("main");

const navigation = document.querySelector("nav");

const popUp = document.querySelector("#pop-up");
const popUpClose = document.querySelectorAll("#pop-up .close");

const [loginButton, menuButton] = document.querySelectorAll("#navigation > div");
const [login, menu] = popUp.querySelectorAll("#pop-up > section");

const [homeButton, menusButton, orderButton, moreButton] = document.querySelectorAll("#navigation-bottom > div");
const [home, menus, order, more] = main.querySelectorAll("main > section");

const slide = document.querySelector("#slide > div");
const [slideLeft, slideRight] = document.querySelectorAll("#slide button");

var slideTime = 0;
