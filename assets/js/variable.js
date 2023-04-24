const navigation = document.querySelector("nav");

const city = document.querySelector("select[name='city']");
const district = document.querySelector("select[name='district']");
const districts = district.querySelectorAll("option:not([disabled][selected][hidden])");

const modal = document.querySelector("#modal");
const modals = modal.querySelectorAll("#modal > div");
