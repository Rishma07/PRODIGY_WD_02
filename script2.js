// script.js

let running = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let lapStartTime = 0; // Added for tracking lap time
let lapTimes = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lap-list");

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap); // Lap button functionality

function start() {
    if (!running) {
        running = true;
        startTime = startTime === 0 ? Date.now() : Date.now() - elapsedTime;
        lapStartTime = Date.now(); // Start lap tracking from now
        intervalId = setInterval(updateDisplay, 1000);
    }
}

function pause() {
    if (running) {
        running = false;
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
    }
}

function reset() {
    running = false;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    lapStartTime = 0;
    lapTimes = [];
    display.textContent = "00:00:00";
    lapList.innerHTML = "";
}

function updateDisplay() {
    const currentTime = running ? Date.now() - startTime : elapsedTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    display.textContent = formattedTime;
}

function addLap() {
    if (running) {
        const lapTime = Date.now() - lapStartTime; // Calculate lap time from last start
        lapStartTime = Date.now(); // Reset lap start time for next lap

        const hours = Math.floor(lapTime / 3600000);
        const minutes = Math.floor((lapTime % 3600000) / 60000);
        const seconds = Math.floor((lapTime % 60000) / 1000);

        const formattedLapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        lapTimes.push(formattedLapTime);

        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapTimes.length}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
    }
}

function padZero(num) {
    return num.toString().padStart(2, "0");
}

