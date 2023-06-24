/* header menu */
function headerMenu() {
  const menu = document.querySelector(".header-menu");
  const backDrop = document.querySelector(".header-backdrop");
  const breakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backDrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }

  document.querySelectorAll(".menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  backDrop.addEventListener("click", toggleMenu);

  function collapse() {
    menu.querySelector(".active .sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;

    if (
      target.classList.contains("toggle-sub-menu") &&
      window.innerWidth <= breakpoint
    ) {
      event.preventDefault();

      // if menu-item already expanded, collapse it and exit
      if (target.parentElement.classList.contains("active")) {
        collapse();
        return;
      }

      // if not already expanded run below code
      if (menu.querySelector(".active")) {
        collapse();
      }

      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + "px";
    }
  });

  // when resizing window

  window.addEventListener("resize", function () {
    if (this.innerWidth > breakpoint && menu.classList.contains("open")) {
      toggleMenu();
    }
  });
}
headerMenu();

/* numbers */

const updateCount = (el) => {
  const value = parseInt(el.dataset.value);
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;
  const increaseCount = setInterval(() => {
    initialValue += increment;
    if (initialValue > value) {
      el.textContent = `${value}+`;
      clearInterval(increaseCount);
      return;
    }
    el.textContent = `${initialValue} +`;
  }, 1);
};

const items = [...document.querySelectorAll(".num")];

items.forEach((item) => {
  updateCount(item);
});

/* testimonial slider */

function testimonialSlider() {
  const carousel = document.getElementById("carouselOne");

  if (carousel) {
    carousel.addEventListener("slid.bs.carousel", function () {
      const activeItem = this.querySelector(".active");
      document.querySelector(".img-testimonial").src = activeItem.getAttribute(
        "data-testimonial-img"
      );
    });
  }
}

testimonialSlider();

/*  modal video */

function coursePreview() {
  const coursePreviewModal = document.querySelector(".video-modal");
  if (coursePreviewModal) {
    coursePreviewModal.addEventListener("shown.bs.modal", function () {
      this.querySelector(".video-course-preview").play();
      this.querySelector(".video-course-preview").currentTime = 0;
    });
    coursePreviewModal.addEventListener("hide.bs.modal", function () {
      this.querySelector(".video-course-preview").pause();
    });
  }
}
coursePreview();

/*  style switcher */

function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector(".switcher");
  const switcherToggle = document.querySelector(".switcher-toggle");
  switcherToggle.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("i").classList.toggle("fa-gear");
    this.querySelector("i").classList.toggle("fa-xmark");
  });
}
styleSwitcherToggle();

/*  Theme color */

function themeColor() {
  const colorStyle = document.querySelector(".theme-color-style");
  const themeColor = document.querySelector(".theme-colors");

  themeColor.addEventListener("click", ({ target }) => {
    if (target.classList.contains("theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-theme-color"));
      setColor();
    }
  });

  function setColor() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );
    if (document.querySelector(".theme-color-item.active")) {
      document
        .querySelector(".theme-color-item.active")
        .classList.remove("active");
    }
    document
      .querySelector("[data-theme-color=" + localStorage.getItem("color") + "]")
      .classList.add("active");
  }

  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-theme-color=" + defaultColor + "]")
      .classList.add("active");
  }
}

themeColor();

/* light & dark mode */

function themeLightDark() {
  const darkMode = document.querySelector("#dark-mode");

  darkMode.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme-dark", "true");
    } else {
      localStorage.setItem("theme-dark", "false");
    }
    themeMode();
  });

  function themeMode() {
    if (localStorage.getItem("theme-dark") === "false") {
      document.body.classList.remove("t-dark");
    } else {
      document.body.classList.add("t-dark");
    }
  }

  if (localStorage.getItem("theme-dark") !== null) {
    themeMode();
  }

  if (document.body.classList.contains("t-dark")) {
    darkMode.checked = true;
  }
}

themeLightDark();

/* theme glass */

function themeGlass() {
  const glassEffectCheck = document.querySelector("#glass-effect");
  const glassStyle = document.querySelector(".glass");

  glassEffectCheck.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });

  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }
  if (localStorage.getItem("glass-effect") !== "null") {
    glass();
  }
  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheck.checked = true;
  }
}
themeGlass();
