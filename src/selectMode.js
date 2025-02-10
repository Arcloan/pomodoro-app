import { selectMode } from "./timer.js";

const modeButtonsContainer = document.querySelector(".mode");
modeButtonsContainer.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    Array.from(modeButtonsContainer.children).forEach(element => {
        element.removeAttribute("data-selected");
    });
    e.target.setAttribute("data-selected", "");
    selectMode(e.target);
})