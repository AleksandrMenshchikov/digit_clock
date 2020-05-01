let h = document.querySelector(".digit-clock__hours");
let m = document.querySelector(".digit-clock__minutes");
let s = document.querySelector(".digit-clock__seconds");
let week = document.querySelectorAll(".digit-clock__item");
let am = document.querySelector(".digit-clock__am");
let pm = document.querySelector(".digit-clock__pm");
let btnOn = document.querySelector(".digit-clock__btn-toggle-on");
let btnOff = document.querySelector(".digit-clock__btn-toggle-off");
let digitClock = document.querySelector(".digit-clock");
let btnHPlus = document.querySelector(".digit-clock__btn-h-plus");
let btnHMinus = document.querySelector(".digit-clock__btn-h-minus");
let btnMPlus = document.querySelector(".digit-clock__btn-m-plus");
let btnMMinus = document.querySelector(".digit-clock__btn-m-minus");
let inputH = document.querySelector(".digit-clock__input-h");
let inputM = document.querySelector(".digit-clock__input-m");
let inputAm = document.querySelector(".digit-clock__input-am");
let inputPm = document.querySelector(".digit-clock__input-pm");
let radioList = document.querySelectorAll('input[type="radio"]');



function runMusic() {
  if (localStorage.music == +inputM.textContent) {
    window.open("https://www.youtube.com/watch?v=-NMph943tsw");
  }
  localStorage.music = 1000;
} 

inputH.textContent = +localStorage.h || 0;
inputM.textContent = +localStorage.m || 0;

if (+inputH.textContent === 0) {
  btnHMinus.disabled = true;
}

if (+inputH.textContent === 11) {
  btnHPlus.disabled = true;
}

if (+inputM.textContent === 0) {
  btnMMinus.disabled = true;
}

if (+inputM.textContent === 59) {
  btnMPlus.disabled = true;
}

if (localStorage.pm) {
  inputPm.checked = true;
  inputAm.removeAttribute("checked");
}

if (localStorage.am) {
  inputAm.checked = true;
  inputPm.removeAttribute("checked");
}

if (localStorage.on === "true") {
  btnOff.style.backgroundColor = "transparent";
  btnOn.style.backgroundColor = "green";
}
if (localStorage.off === "true") {
  btnOn.style.backgroundColor = "transparent";
  btnOff.style.backgroundColor = "red";
}

digitClock.addEventListener("click", (e) => {
  if (e.target.classList.contains("digit-clock__btn-toggle-on")) {
    localStorage.on = true;
    localStorage.off = false;
    btnOff.style.backgroundColor = "transparent";
    btnOn.style.backgroundColor = "green";
  }
  if (e.target.classList.contains("digit-clock__btn-toggle-off")) {
    localStorage.on = false;
    localStorage.off = true;
    btnOn.style.backgroundColor = "transparent";
    btnOff.style.backgroundColor = "red";
  }
  if (e.target.classList.contains("digit-clock__btn-h-plus")) {
    inputH.textContent = +inputH.textContent + 1;
    localStorage.h = +inputH.textContent;
    if (+inputH.textContent > 10) {
      btnHPlus.disabled = true;
    }
    if (+inputH.textContent >= 0) {
      btnHMinus.disabled = false;
    }

    inputH.textContent = localStorage.h;
  }
  if (e.target.classList.contains("digit-clock__btn-h-minus")) {
    inputH.textContent = +inputH.textContent - 1;
    localStorage.h = +inputH.textContent;
    if (+inputH.textContent < 11) {
      btnHPlus.disabled = false;
    }
    if (+inputH.textContent < 1) {
      btnHMinus.disabled = true;
    }
    inputH.textContent = localStorage.h;
  }
  if (e.target.classList.contains("digit-clock__btn-m-plus")) {
    inputM.textContent = +inputM.textContent + 1;
    localStorage.m = +inputM.textContent;
    localStorage.music = +inputM.textContent;
    if (+inputM.textContent > 58) {
      btnMPlus.disabled = true;
    }
    if (+inputH.textContent >= 0) {
      btnMMinus.disabled = false;
    }
    inputM.textContent = localStorage.m;
  }
  if (e.target.classList.contains("digit-clock__btn-m-minus")) {
    inputM.textContent = +inputM.textContent - 1;
    localStorage.m = +inputM.textContent;
    localStorage.music = +inputM.textContent;
    if (+inputM.textContent < 59) {
      btnMPlus.disabled = false;
    }
    if (+inputM.textContent < 1) {
      btnMMinus.disabled = true;
    }
    inputM.textContent = localStorage.m;
  }
  if (e.target.classList.contains("digit-clock__input-am")) {
    localStorage.am = inputAm.value;
    delete localStorage.pm;
    inputAm.checked = true;
    inputPm.removeAttribute("checked");
  }
  if (e.target.classList.contains("digit-clock__input-pm")) {
    localStorage.pm = inputPm.value;
    delete localStorage.am;
    inputPm.checked = true;
    inputAm.removeAttribute("checked");
  }
});

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  d = date.getDay();

  if (hours >= 12) {
    hours = hours - 12;
    pm.classList.add("digit-clock__item_color");
    am.classList.remove("digit-clock__item_color");
  } else {
    hours = hours;
    am.classList.add("digit-clock__item_color");
    pm.classList.remove("digit-clock__item_color");
  }

  if (hours < 10) {
    h.textContent = "0" + hours;
  } else {
    h.textContent = hours;
  }

  if (minutes < 10) {
    m.textContent = "0" + minutes;
  } else {
    m.textContent = minutes;
  }

  if (seconds < 10) {
    s.textContent = "0" + seconds;
  } else {
    s.textContent = seconds;
  }

  for (let i of week) {
    i.classList.remove("digit-clock__item_color");
  }
  week[d - 1].classList.add("digit-clock__item_color");

  if (localStorage.on === "true") {
    if (hours === +inputH && minutes === +inputM && localStorage.am) {
      runMusic();
    }
  }

  if (localStorage.on === "true") {
    if (
      hours === +inputH.textContent &&
      minutes === +inputM.textContent &&
      localStorage.pm
    ) {
      runMusic(); 
    }
  }
});

console.log(localStorage);
