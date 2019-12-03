const user = document.querySelector(".user");
const player = document.querySelector(".player");
const selector = document.querySelector(".selector");
const input = document.querySelector("input");
const current = document.querySelector(".current");
const ratios = document.querySelector(".ratios");
const like = document.querySelector("button");
let radioList;
let audio;
let radios;
let allRadios;
let options;

const currentUserId = "2";
let currentUser;

async function getRadios() {
  const result = await fetch("http://localhost:3000/api/radios");
  return result.json();
}

async function addFavorite(id) {
  const favorite = await fetch(
    `http://localhost:3000/api/users/${currentUserId}?fav=${id}`
  );
  return favorite.json();
}

async function getUser() {
  const user = await fetch(`http://localhost:3000/api/users/${currentUserId}`);
  return user.json();
}

function fillSelect() {
  while (radioList.firstChild) {
    radioList.firstChild.remove();
  }
  radios.map(radio => {
    const option = document.createElement("option");
    option.value = radio.url;
    option.setAttribute("id", radio._id);
    option.textContent = `${radio.title} -- ${radio.n} / ${radio.N}`;
    radioList.appendChild(option);
  });
}

async function initSelect() {
  radios = await getRadios();
  allRadios = await getRadios();
  currentUser = await getUser();
  fillSelect(allRadios);
  audio.src = localStorage.getItem("current_radio");
  current.textContent = localStorage.getItem("current_radio_title");
  user.textContent = currentUser.name;
  attachEventListeners();
}

function attachEventListeners() {
  radioList.onchange = ev => {
    audio.src = ev.target.value;
    audio.play();
    current.textContent = options[radioList.selectedIndex].text;
    localStorage.setItem(
      "current_radio_title",
      options[radioList.selectedIndex].text
    );
    localStorage.setItem("current_radio", audio.src);
  };

  like.onclick = ev => {
    addFavorite()
  };

  input.oninput = ev => {
    if (!ev.target.value) {
      // if text is empty reset filterable array
      radios = [...allRadios];
    }
    radios = allRadios.filter(({ title }) =>
      title.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    options = document.querySelectorAll("option");
    fillSelect();
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  radioList = document.createElement("select");
  input.value = "";
  audio = document.createElement("audio");
  audio.controls = true;
  selector.appendChild(radioList);
  player.appendChild(audio);
  await initSelect();
  options = document.querySelectorAll("option");
});
