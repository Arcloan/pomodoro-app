import { selectMode } from "./timer.js";

const settingsOpener = document.querySelector(".settings");
const settings = document.querySelector("dialog");
const closeDialog = document.querySelector(".dialogHeader > img");
const timeArrows = document.querySelectorAll(".arrows");
const saveSettings = document.querySelector("dialog button");

settingsOpener.addEventListener("click", e => settings.showModal());
closeDialog.addEventListener("click", e => settings.close());
saveSettings.addEventListener("click", e => {
    setData(collectData());
    settings.close();
    selectMode(document.querySelector("[data-selected]"));
})

Array.from(timeArrows).forEach(el => {
    el.addEventListener("click", e => {
        let minutes = e.target.closest("div").previousElementSibling;
        if (e.target.nextElementSibling) {
            minutes.textContent = Number(minutes.textContent) + 1;
        }
        else {
            if (Number(minutes.textContent) < 2) return;
            minutes.textContent = Number(minutes.textContent) - 1; 
        }
    })
})

function collectData() {
    let pomodoro = document.querySelector(".pomodoroMin > p").textContent;
    let short = document.querySelector(".shortMin > p").textContent;
    let long = document.querySelector(".longMin > p").textContent;
    let currentFont = document.querySelector(".fontSelection :checked").value;
    let currentColor = document.querySelector(".colorSelection :checked").value;
    let customVarsToSet = {
        pomodoro,
        short,
        long,
        currentColor,
        currentFont,
    }
    return customVarsToSet;
}

function setData(customProperties) {
    console.log(customProperties);
    for (let prop of Object.keys(customProperties)) {
        if (prop.startsWith("current")) {
            document.documentElement.style.setProperty("--" + prop, `var(--${customProperties[prop]}`);
            console.log(getComputedStyle(document.documentElement).getPropertyValue("--currentColor"));
        }
        else {
            document.documentElement.style.setProperty("--" + prop, customProperties[prop]);
        }
    }
}
