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
  let section = document.querySelector(":not(#notification).displayed");

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

async function get(endpoint) {
  try {
    return await fetch(endpoint).then((response) => response.json());
  } catch {
    return {
      status: "error",
    };
  }
}

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
  if (!registerSection.email.value) {
    notify("Lütfen e-posta adresinizi giriniz.");
    return;
  }

  let response = await post("services/register.php", { phase: "register", email: registerSection.email.value });

  if (DEBUG) console.log(response);

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
      registerSection.phase.classList.remove("first");
      registerSection.phase.classList.add("second");
      break;
  }
}

async function registerSecondPhase(event) {
  if (!registerSection.code.value) {
    notify("Lütfen doğrulama kodunu giriniz.");
    return;
  }

  let response = await post("services/register.php", { phase: "confirm", code: registerSection.code.value });

  if (DEBUG) console.log(response);

  registerSection.secondCode.value = response.code;

  switch (response.status) {
    case "error":
      notify("Bir hata oluştu, lütfen tekrar deneyiniz.");
      break;
    case "timeout":
      notify("Doğrulama kodu zaman aşımına uğradı.");
      registerSection.phase.classList.remove("second");
      registerSection.phase.classList.add("first");
      closePopUp();
      break;
    case "maximum_attempt":
      notify("Deneme hakkınızı doldurdunuz.");
      registerSection.phase.classList.remove("second");
      registerSection.phase.classList.add("first");
      closePopUp();
      break;
    case "code_invalid":
      notify("Hatalı kod girdiniz, lütfen tekrar deneyiniz.");
      break;
    case "success":
      registerSection.phase.classList.remove("second");
      registerSection.phase.classList.add("third");
      break;
  }
}

async function registerThirdPhase(event) {
  if (
    !registerSection.name.value ||
    !registerSection.phone.value ||
    !registerSection.address.value ||
    !registerSection.password.value
  ) {
    notify("Lütfen alanları eksizsiz giriniz.");
    return;
  }

  let response = await post("services/register.php", {
    phase: "create",
    code: registerSection.secondCode.value,
    name: registerSection.name.value,
    address: registerSection.address.value,
    phone: registerSection.phone.value,
    password: registerSection.password.value,
  });

  if (DEBUG) console.log(response);

  switch (response.status) {
    case "error":
      notify("Bir hata oluştu, lütfen tekrar deneyiniz.");
      break;
    case "timeout":
      notify("Üyelik kaydı zaman aşımına uğradı.");
      registerSection.phase.classList.remove("third");
      registerSection.phase.classList.add("first");
      closePopUp();
      break;
    case "maximum_attempt":
      notify("Deneme hakkınızı doldurdunuz.");
      registerSection.phase.classList.remove("third");
      registerSection.phase.classList.add("first");
      closePopUp();
      break;
    case "code_invalid":
      notify("Hatalı kod girdiniz, lütfen tekrar deneyiniz.");
      break;
    case "success":
      notify("Üyelik kaydı başarıyla oluşturuldu.");
      registerSection.phase.classList.remove("third");
      registerSection.phase.classList.add("first");
      closePopUp();
      break;
  }
}

async function getMenus() {
  let menus = await get("services/menus.php");

  if (menus.status == "error") {
    // error mes
    return;
  }

  menus.forEach((menu) => {
    console.log(menu);
  });
}
