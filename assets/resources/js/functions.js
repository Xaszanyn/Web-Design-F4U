/* =========={ General }========================================================================================== */

function assign(element, action, self = false, press = false) {
  element.addEventListener("click", (event) => {
    if (self && event.target != self) return;
    event.preventDefault();
    action(event);
  });

  if (!press)
    element.addEventListener("touchstart", (event) => {
      if (self && event.target != self) return;
      event.preventDefault();
      action(event);
    });
}

/* =========={ UI }========================================================================================== */

function load(button, section) {
  loading.classList.add("loading");

  document.querySelector("main > section.active").classList.remove("active");

  document.querySelector("#navigation-bottom > div.selected").classList.remove("selected");
  button.classList.add("selected");

  section.classList.add("active");

  setTimeout(() => {
    loading.classList.remove("loading");
  }, 200);
}

function openPopUp(section) {
  section.classList.add("displayed");
  popUp.classList.add("active");
}

function closePopUp() {
  let section = document.querySelector(".displayed");

  if (section) section.classList.remove("displayed");

  popUp.classList.remove("active");
}

function openAnotherPopUp(section) {
  closePopUp();
  setTimeout(() => openPopUp(section), 200);
}

function closePopUpThenLoad(button, section) {
  closePopUp();
  load(button, section);
}

function slideGoLeft(event) {
  event.preventDefault();

  slideTime = 0;

  slideLeft.classList.add("active");
  setTimeout(() => slideLeft.classList.remove("active"), 200);

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / 100);

  slide.style.transform = `translateX(-${(current ? current - 1 : parseInt(slide.dataset.slides - 1)) * 100}rem)`;
}

function slideGoRight(event) {
  if (event) event.preventDefault();

  slideTime = 0;

  slideRight.classList.add("active");
  setTimeout(() => slideRight.classList.remove("active"), 200);

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / 100);

  slide.style.transform = `translateX(-${(current == parseInt(slide.dataset.slides - 1) ? 0 : current + 1) * 100}rem)`;
}

function notify(message) {
  notification.textContent = message;
  notification.classList.add("displayed");
  setTimeout(() => notification.classList.remove("displayed"), 2500);
}

/* =========={ Utility }========================================================================================== */

function translate(index) {
  closePopUp();

  switch (index) {
    case 0:
      console.log("Türkçe");
      break;
    case 1:
      console.log("English");
      break;
  }
}

/* =========={ Connection }========================================================================================== */

async function post(endpoint, body) {
  try {
    return await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  } catch {
    return {
      status: "error",
    };
  }
}

async function registerFirstPhase(event) {
  if (!registerEmail.value) {
    notify("Lütfen e-posta adresinizi giriniz.");
    return;
  }

  let response = await post("services/register/register.php", { phase: "register", email: registerEmail.value });

  console.log(response);

  switch (response.status) {
    case "error":
      notify("Bir hata oluştu, lütfen tekrar deneyiniz.");
      break;
    case "email_invalid":
      notify("Lütfen geçerli bir e-posta adresi giriniz.");
      break;
    case "email_used":
      notify("Bu e-posta adresi kullanımda, lütfen yeni bir e-posta adresi giriniz.");
      break;
    case "success":
      registerPhase.classList.remove("first");
      registerPhase.classList.add("second");
      break;
  }
}

function test() {}
