function convertInSeconds(time) {
    const [minutes, seconds] = time.split(":");
    return (Number(minutes) * 60) + Number(seconds) || totalTime; 
}

function convertInText(seconds) {
    let minutes = (String(Math.trunc(seconds / 60)) != "0") ? (Math.trunc(seconds / 60) < 10) ? "0" + String(Math.trunc(seconds / 60)) : String(Math.trunc(seconds / 60)) : "00" ;
    let sec = (seconds % 60 < 10) ? "0" + String(seconds % 60) : String(seconds % 60);
    return minutes + ":" + sec;
}

function updateTimerState() {
    let state = playPauseButton.textContent;
    if (state == "start" || state == "restart") {
        playPauseButton.textContent = "pause";
        stopped = false;
        requestAnimationFrame(updateTimer);
    }
    else {
        playPauseButton.textContent = "start";
        stopped = true;
        pauseTimer();
    }
}

function pauseTimer() {
    cancelAnimationFrame(timerId);
    stopped = true;
}

function restartTimer() {
    playPauseButton.textContent = "restart";
    timerId = null;
    totalElapsed = 0;
    stopped = false;
    document.documentElement.style.setProperty("--elapsed", "100%");
}

function updateTimer() {
    stopped = false;
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
            if (stopped) return;
            timerId = requestAnimationFrame(updateTimer);
        }, 1000);
    }
}

function selectMode(mode) {
    cancelAnimationFrame(timerId);
    timerId = null;
    stopped = true;
    let selectedMode = mode.textContent.trim().split(" ")[0];
    document.documentElement.style.setProperty("--elapsed", "100%");
    let min = getComputedStyle(document.documentElement).getPropertyValue("--" + selectedMode);
    totalElapsed = 0;
    totalTime = min * 60;
    playPauseButton.textContent = "start";
    timeRemaining.textContent = convertInText(totalTime);
}

const timeRemaining = document.querySelector(".remainingTime > h1");
const playPauseButton = document.querySelector(".remainingTime > button");

let totalTime = 1500;
let totalElapsed = 0;
let timerId = null;
let stopped = false;
playPauseButton.addEventListener("click", e => updateTimerState());

export { selectMode };