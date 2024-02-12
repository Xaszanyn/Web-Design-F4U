const loading = document.querySelector("#loading");

const main = document.querySelector("main");

const navigation = document.querySelector("nav");

const popUp = document.querySelector("#pop-up");
const popUpsCloses = document.querySelectorAll("#pop-up .close");

const [userButton, loginButton, menuButton] = document.querySelectorAll("#navigation > div");
const [login, register, menu, language] = popUp.querySelectorAll("#pop-up > section");

const [homeButton, menusButton, orderButton, moreButton] = document.querySelectorAll("#navigation-bottom > div");
const [home, menus, order, more, user] = main.querySelectorAll("main > section");

const slide = document.querySelector("#slide > div");
const [slideLeft, slideRight] = document.querySelectorAll("#slide button");

const [menuLoginButton, menuHomeButton, menuMenusButton, menuOrderButton, menuMoreButton, menuLanguageButton] =
  document.querySelectorAll("#menu button");

const [languageTr, languageEn] = document.querySelectorAll("#language button");

const notification = document.querySelector("#notification");

const registerFromLogin = document.querySelector("#register-from-login");
const loginFromRegister = document.querySelector("#login-from-register");

const registerSection = {
  phase: document.querySelector("#register-phase"),
  email: document.querySelector("#register-phase > :first-of-type input"),
  first: document.querySelector("#register-first"),
  code: document.querySelector("#register-phase > :nth-of-type(2) input"),
  second: document.querySelector("#register-second"),
  secondCode: document.querySelector("#register-phase > :last-of-type > input[type='hidden']"),
  name: document.querySelector("#register-phase > :last-of-type > :first-of-type > input"),
  phone: document.querySelector("#register-phase > :last-of-type > :nth-of-type(2) > input"),
  address: document.querySelector("#register-phase > :last-of-type > :nth-of-type(3) > textarea"),
  password: document.querySelector("#register-phase > :last-of-type > :last-of-type > input"),
  third: document.querySelector("#register-third"),
};

const loginUserButton = document.querySelector("#login button");

const loginSection = {
  email: document.querySelector("#login input[type='text']"),
  password: document.querySelector("#login input[type='password']"),
};

var slideTime = 0;

var slideWidth = window.innerWidth / window.innerHeight > 0.75 ? 30 : 100;

const uploadImageInput = document.querySelector("#upload-image");
const uploadImageCanvas = document.querySelector("#upload-image-canvas");

const userPicture = document.querySelector("#user #user-picture");
const userPictureDefault = document.querySelector("#user #user-picture-default");
const userName = document.querySelector("#user #user-name");
const userEmail = document.querySelector("#user #user-email");
const userPhone = document.querySelector("#user #user-phone");
const userAddress = document.querySelector("#user #user-address");

const edit = document.querySelector("#user #user-edit");
const logout = document.querySelector("#user #user-logout");

var selectedMenu = {};
const orderMenu = document.querySelector("#order #order-menu");
const orderPrice = document.querySelector("#order #order-price");
const orderProvince = document.querySelector("#order #order-province");
const orderDistrict = document.querySelector("#order #order-district");
const orderPromotion = document.querySelector("#order #order-promotion");
const orderPromotionStatus = document.querySelector("#order #order-promotion-status");
const orderDays = document.querySelector("#order #order-days");
