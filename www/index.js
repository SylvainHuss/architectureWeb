const player = document.querySelector(".player");
const selector = document.querySelector(".selector");
const input = document.querySelector("input");
const current = document.querySelector(".current");
let radioList;
let audio;
let radios;
let allRadios;
let options;

async function getRadios() {
  const result = await fetch("http://localhost:3000/api/radios");
  return result.json();
}

function fillSelect() {
  while (radioList.firstChild) {
    radioList.firstChild.remove();
  }
  radios.map(radio => {
    const option = document.createElement("option");
    option.value = radio.url;
    option.textContent = radio.title;
    radioList.appendChild(option);
  });
}

async function initSelect() {
  radios = await getRadios();
  allRadios = await getRadios();
  fillSelect(allRadios);
  audio.src = localStorage.getItem("current_radio");
  current.textContent = localStorage.getItem("current_radio_title");
  attachEventListeners();
}

function attachEventListeners() {
  radioList.onchange = ev => {
    audio.src = ev.target.value;
    audio.play();
    current.textContent = options[radioList.selectedIndex].text;
    localStorage.setItem("current_radio_title", options[radioList.selectedIndex].text)
    localStorage.setItem("current_radio", audio.src);
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
