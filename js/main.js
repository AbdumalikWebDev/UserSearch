let searchInput = document.querySelector("#input_search");
let searchBtn = document.querySelector(".search-btn");
let inputResultChecker = document.querySelector(".no-results");
const URL = "https://api.github.com/users/";

function userInfo(user) {
  let userImage = document.querySelector("#user-image");
  let userNickname = document.querySelector("#user");
  let date = document.querySelector("#date");
  let username = document.querySelector("#username");
  let userBio = document.querySelector(".user-bio");
  let repos = document.querySelector(".repos");
  let followers = document.querySelector(".followers");
  let following = document.querySelector(".following");
  const locationUser = document.querySelector(".location");
  let blog = document.querySelector(".blog");
  let twitter = document.querySelector(".twitter");
  const githubUsername = document.querySelector(".github-username");
  
  userImage.setAttribute("src", `${user.avatar_url}`);
  userNickname.textContent = `${user.login}`;
  date.innerHTML = `Joined ${new Date(user.created_at).toDateString()}`;
  username.textContent = `${user.login}`;
  userBio.textContent = user.bio ? `${user.bio}` : "This profile has no bio";
  repos.textContent = `${user.public_repos}`;
  followers.textContent = `${user.followers}`;
  following.textContent = `${user.following}`;
  locationUser.innerHTML = user.location
    ? `<a href="#" class="location"><i class="fa-solid fa-location-dot"></i> ${user.location}</a>`
    : `<a href="#" class="location not-available"><i class="fa-solid fa-location-dot"></i> Not Available</a>`;
  blog.innerHTML = user.blog
    ? `<a href="${user.blog}" target="_blank"><i class="fa-solid fa-link"></i> ${user.blog}</a>`
    : `<a href="" target="_blank" class="not-available github-blog"><i class="fa-solid fa-link"></i> Not Available</a>`;
  twitter.innerHTML = user.twitter_username
    ? `<a href="https://twitter.com/${user.twitter_username}" target="_blank" class="twitter"><i class="fa-brands fa-twitter"></i> ${user.twitter_username}</a>`
    : `<a href="" target="_blank" class="not-available twitter"><i class="fa-brands fa-twitter"></i> Not Available</a>`;
  githubUsername.innerHTML = user.html_url
    ? `<a href="${user.html_url}" target="_blank"><i class="fa-solid fa-building"></i> ${user.login}<a>`
    : `<a href="" target="_blank" class="not-available"><i class="fa-solid fa-building"></i> Not Available<a>`;
}

searchBtn.addEventListener("click", () => {
  let inputValue = searchInput.value.trim();
  if (inputValue) {
    fetch(URL + inputValue)
      .then((response) => response.json())
      .then((data) => {
        if (data.name === undefined || data.login === undefined) {
          inputResultChecker.style.opacity = 1;
          searchInput.value = "";
          setTimeout(function () {
            inputResultChecker.style.opacity = 0;
          }, 2000);
        } else {
          userInfo(data);
          inputResultChecker.style.opacity = 0;
        }
      })
      .catch((error) => {
        alert("Error fetching data. Please check the username and try again.");
        console.error("Error fetching data:", error);
      })
      .then(inputValue = "");
  } else {
    alert("Please enter a GitHub username.");
  }
});
searchInput.addEventListener("input", (e) => {
  if (searchInput === "") {
    inputResultChecker.style.opacity = 0;
  }
});
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
    searchInput.value = "";
  }
});
