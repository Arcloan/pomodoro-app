const modeButtonsContainer = document.querySelector(".mode");
modeButtonsContainer.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    Array.from(modeButtonsContainer.children).forEach(element => {
        element.removeAttribute("data-selected");
    });
    e.target.setAttribute("data-selected", "");
})

const timeRemaining = document.querySelector(".remainingTime > h1");
const playPauseButton = document.querySelector(".remainingTime > button");

let totalTime = 1500;
let totalElapsed = 0;
let timerId = null;

function convertInSeconds(time) {
    const [minutes, seconds] = time.split(":");
    return (Number(minutes) * 60) + Number(seconds) || totalTime; 
}

function convertInText(seconds) {
    let minutes = (String(Math.trunc(seconds / 60)) != "0") ? String(Math.trunc(seconds / 60)) : "00" ;
    let sec = (seconds % 60 < 10) ? "0" + String(seconds % 60) : String(seconds % 60);
    return minutes + ":" + sec;
}

function updateTimerState() {
    let state = playPauseButton.textContent;
    if (state == "start" || state == "restart") {
        playPauseButton.textContent = "pause";
        requestAnimationFrame(updateTimer);
    }
    else {
        playPauseButton.textContent = "start";
        pauseTimer();
    }
}

function pauseTimer() {
    cancelAnimationFrame(timerId);
}

function restartTimer() {
    playPauseButton.textContent = "restart";
    timerId = null;
    totalElapsed = 0;
    started = true;
    document.documentElement.style.setProperty("--elapsed", "100%");
}

function updateTimer() {
    timeRemaining.textContent = convertInText(convertInSeconds(timeRemaining.textContent) - 1);
    totalElapsed += 1;
    let percentElapsed = Number(((totalElapsed / totalTime) * 100).toFixed(2));
    let percentRemaining = Math.trunc(100 - percentElapsed);
    document.documentElement.style.setProperty("--elapsed", String(percentRemaining) + "%");
    if (percentRemaining == 0) {
        restartTimer();
        return;
    }
    if (playPauseButton.textContent == "pause") {
        setTimeout(() => {
            timerId = requestAnimationFrame(updateTimer);
        }, 1000);
    }
}

playPauseButton.addEventListener("click", e => updateTimerState());