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

  let currentSelectedButton = document.querySelector("#navigation-bottom > div.selected");
  if (currentSelectedButton) currentSelectedButton.classList.remove("selected");

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

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / slideWidth);

  slide.style.transform = `translateX(-${
    (current ? current - 1 : parseInt(slide.dataset.slides - 1)) * slideWidth
  }rem)`;
}

function slideGoRight(event) {
  if (event) event.preventDefault();

  slideTime = 0;

  slideRight.classList.add("active");
  setTimeout(() => slideRight.classList.remove("active"), 200);

  let current = Math.abs(parseInt(slide.style.transform.split("(")[1]) / slideWidth);

  slide.style.transform = `translateX(-${
    (current == parseInt(slide.dataset.slides - 1) ? 0 : current + 1) * slideWidth
  }rem)`;
}

function notify(message = "Bir hata oluştu, lütfen tekrar deneyiniz.") {
  notification.textContent = message;
  notification.classList.add("displayed");
  setTimeout(() => notification.classList.remove("displayed"), 4000);
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

function uploadImage() {
  if (!uploadImageInput.files[0]) {
    notify();
    return;
  }

  let fileReader = new FileReader();

  fileReader.onload = (event) => {
    let image = new Image();

    image.onload = () => {
      let context = uploadImageCanvas.getContext("2d");

      uploadImageCanvas.width = 256;
      uploadImageCanvas.height = 256;

      let ratio = Math.min(256 / image.width, 256 / image.height);

      let width = image.width * ratio;
      let height = image.height * ratio;

      ratio = 1;

      if (width < 256) ratio = 256 / width;
      if (Math.abs(ratio - 1) < 1e-14 && height < 256) ratio = 256 / height;

      width = Math.min(image.width, image.width / ((width * ratio) / 256));
      height = Math.min(image.height, image.height / ((height * ratio) / 256));

      context.drawImage(
        image,
        Math.max(0, (image.width - width) * 0.5),
        Math.max(0, (image.height - height) * 0.5),
        width,
        height,
        0,
        0,
        256,
        256
      );

      const base64 = uploadImageCanvas.toDataURL("image/png");

      console.log(base64); // GOT BASE64
    };

    image.src = event.target.result;
  };

  fileReader.readAsDataURL(uploadImageInput.files[0]);
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

/* =========={ Register }======================================== */

async function registerFirstPhase(event) {
  if (!registerSection.email.value) {
    notify("Lütfen e-posta adresinizi giriniz.");
    return;
  }

  let response = await post("services/register.php", { phase: "register", email: registerSection.email.value });

  console.log("notify sil");
  notify(JSON.stringify(response));

  switch (response.status) {
    case "error":
      notify();
      break;
    case "email_invalid":
      notify("Lütfen geçerli bir e-posta adresi giriniz.");
      break;
    case "email_used":
      notify("Bu e-posta adresi kullanımda, lütfen yeni bir e-posta adresi giriniz.");
      break;
    case "success":
      localStorage.register = registerSection.email.value;
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

  registerSection.secondCode.value = response.code;

  switch (response.status) {
    case "error":
      notify();
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
    notify("Lütfen alanları eksiksiz giriniz.");
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

  switch (response.status) {
    case "error":
      notify();
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
      let email = localStorage.register;
      localStorage.clear();
      loginDirect(email, registerSection.password.value);
      break;
  }
}

/* =========={ Login }======================================== */

function loginUser() {
  if (!loginSection.email.value) {
    notify("Lütfen e-posta adresinizi giriniz.");
    return;
  } else if (!loginSection.password.value) {
    notify("Lütfen şifrenizi giriniz.");
    return;
  }

  loginDirect(loginSection.email.value, loginSection.password.value);
}

async function loginDirect(email, password, remembered = false) {
  let response = await post("services/login.php", {
    email,
    password,
  });

  switch (response.status) {
    case "error":
      notify();
      break;
    case "user_invalid":
      notify("E-posta veya şifre hatalı, lütfen tekrar deneyiniz.");
      break;
    case "success":
      userButton.style.display = "flex";
      loginButton.style.display = "none";
      menuLoginButton.style.display = "none";
      document.querySelector("#menu hr").style.display = "none";

      userName.innerHTML = response.information.name;
      userEmail.innerHTML = response.information.email;
      userPhone.innerHTML = response.information.phone;
      userAddress.innerHTML = response.information.address;

      if (response.information.picture == "-") {
        userPicture.style.display = "none";
      } else {
        userPictureDefault.style.display = "none";
        userPicture.src = response.information.picture;
      }

      if (!remembered) {
        localStorage.email = email;
        localStorage.password = password;
        localStorage.time = new Date().getTime();

        notify("Başarıyla giriş yapıldı.");
        load(userButton, user);
        closePopUp();
      }
      break;
  }
}

function loginRememberedUser() {
  if (!localStorage.time) return;

  if ((new Date().getTime() - parseInt(localStorage.time)) / (1000 * 60 * 60 * 24) > 30) {
    localStorage.clear();
    return;
  }

  loginDirect(localStorage.email, localStorage.password, true);
}

function logoutUser() {
  localStorage.clear();
  location.reload();
}

/* =========={ Public }======================================== */

async function getMenus() {
  menus.innerHTML = `<h2>Menüler</h2>`;

  let data = await get("services/menus.php");

  if (data.status == "error") {
    let error = document.createElement("p");

    error.className = "fetch-error";

    error.innerHTML = "Menüler getirilirken bir problem oluştu. Lütfen sayfayı yenileyiniz";

    menus.appendChild(error);

    return;
  }

  data.forEach((menu) => {
    let content = document.createElement("div");

    content.className = "menu";

    content.innerHTML = `<i class="fa-solid fa-caret-left expand"></i><div class="menu-heading"><img src="./assets/images/temporary/${menu.picture}" alt="Menü" /><div><h4>${menu.name}</h4><p>${menu.description}</p><button data-id="${menu.id}" data-name="${menu.name}" data-picture="${menu.picture}"><i class="fa-solid fa-cart-shopping"></i> Menüyü Seç</button></div></div><div class="menu-body"><hr />${menu.content}</div>`;

    menus.appendChild(content);
  });

  document.querySelectorAll(".menu").forEach((menu) => {
    assign(menu.children[0], () => menu.classList.toggle("expanded"), false, true);
    assign(menu.children[1].children[0], () => menu.classList.toggle("expanded"), false, true);
    assign(menu.children[1].children[1].children[0], () => menu.classList.toggle("expanded"), false, true);
    assign(menu.children[1].children[1].children[1], () => menu.classList.toggle("expanded"), false, true);
    assign(
      menu.children[1].children[1].children[2],
      (event) => {
        selectedMenu = { ...event.target.dataset };
        selectMenu();
      },
      false,
      true
    );
  });
}

async function selectMenu() {
  if (!selectedMenu.id) return;

  let response = await post("services/price.php", {
    id: selectedMenu.id,
    promotion: selectedMenu.promotion ? selectedMenu.promotion : "-",
    days: selectedMenu.days ? selectedMenu.days : 1,
  });

  switch (response.status) {
    case "error":
      notify("Fiyat getirilirken bir problem oluştu, lütfen tekrar deneyiniz.");
      break;
    case "success":
      orderMenu.innerHTML = `<img src="./assets/images/temporary/${selectedMenu.picture}"> ${selectedMenu.name}`;
      orderPrice.innerHTML =
        response.price == response.original
          ? `${response.price}₺`
          : `${response.price}₺ <span>${response.original}₺</span>`;
      load(orderButton, order);
      break;
  }
}

async function getContents() {
  more.innerHTML = `<h2>Daha Fazla</h2>`;

  let data = await get("services/contents.php");

  if (data.status == "error") {
    let error = document.createElement("p");

    error.className = "fetch-error";

    error.innerHTML = "İçerikler getirilirken bir problem oluştu. Lütfen sayfayı yenileyiniz.";

    more.appendChild(error);

    return;
  }

  data.forEach((content) => {
    let blog = document.createElement("div");

    blog.className = "blog";

    blog.innerHTML = `<h4>${content.title}</h4><img src="./assets/images/temporary/${content.picture}" /><p>${content.description}</p><i class="fa-solid fa-xmark close"></i><div class="blog-content">${content.content}</div>`;

    more.appendChild(blog);
  });

  document.querySelectorAll(".blog").forEach((blog) => assign(blog, (event) => openPopUp(blog), false, true));

  document.querySelectorAll(".blog .close").forEach((close) => assign(close, closePopUp));
}

async function getLocations() {
  let data = await get("services/locations.php");

  if (data.status == "error") {
    notify("Konumlar getirilirken bir problem oluştu. Lütfen sayfayı yenileyiniz.");
    return;
  }

  orderProvince.innerHTML = `<option hidden selected>İl</option>`;
  orderDistrict.innerHTML = `<option hidden selected>İlçe</option>`;

  data.provinces.forEach((province) => {
    orderProvince.innerHTML += `<option value="${province.id}">${province.name}</option>`;
  });

  data.districts.forEach((district) => {
    orderDistrict.innerHTML += `<option value="${district.id}" data-province="${district.provinceId}">${district.name}</option>`;
  });
}

/* =========={ Order }======================================== */

async function payment() {
  let response = await post("services/payment", {
    phase: "create",
    code: registerSection.secondCode.value,
    name: registerSection.name.value,
    address: registerSection.address.value,
    phone: registerSection.phone.value,
    password: registerSection.password.value,
  });

  console.log(response);
}
