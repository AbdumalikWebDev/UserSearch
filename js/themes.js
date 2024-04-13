let body = document.body;
let c = console.log.bind(this);
let themeButton = document.querySelector(".theme-button");
let moonIcon = document.querySelector(".moon-icon");

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeButton.innerHTML = `LIGHT<i class="fa-solid fa-sun moon-icon"></i>`;
    localStorage.setItem("darkMode", true);
  } else {
    themeButton.innerHTML = `DARK <i class="fa-solid fa-moon moon-icon"></i>`;
    localStorage.removeItem("darkMode");
    localStorage.setItem("darkMode", false);
  }
});

window.onload = function () {
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    themeButton.innerHTML = `LIGHT<i class="fa-solid fa-sun moon-icon"></i>`;
    body.classList.add("dark");
    console.log("Dark Mode On");
  } else {
    console.log("Dark Mode Off");
    themeButton.innerHTML = `DARK <i class="fa-solid fa-moon moon-icon"></i>`;
    body.classList.remove("dark");
  }
};
