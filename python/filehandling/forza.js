const screens = {
    menu: document.getElementById("menu-screen"),
    showroom: document.getElementById("showroom-screen"),
    race: document.getElementById("race-screen"),
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
}

let selectedCarId = "f80";
let raceRunning = false;
let raceTime = 0;
let raceLap = 1;
let raceCheckpoints = 0;
let racePosition = 4;
let speed = 120;
let gear = 4;
let boostActive = false;
let difficultyLevel = 1;

let raceTimerHandle = null;
let rivalTimerHandle = null;

const carCards = document.querySelectorAll(".car-card");
const previewShape = document.getElementById("preview-car-shape");
const playerCar = document.getElementById("player-car");
const rival1 = document.getElementById("rival1");
const rival2 = document.getElementById("rival2");
const rival3 = document.getElementById("rival3");

const countdownOverlay = document.getElementById("countdown-overlay");
const countdownText = document.getElementById("countdown-text");
const resultPanel = document.getElementById("result-panel");
const resultSub = document.getElementById("result-sub");

const hudTimer = document.getElementById("hud-timer");
const hudLap = document.getElementById("hud-lap");
const hudCheckpoints = document.getElementById("hud-checkpoints");
const hudSpeed = document.getElementById("hud-speed");
const hudGear = document.getElementById("hud-gear");
const hudPosition = document.getElementById("hud-position");

carCards.forEach(card => {
    card.addEventListener("click", () => {
        carCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedCarId = card.dataset.carId;
        previewShape.className = "preview-car-shape " + selectedCarId;
    });
});

document.getElementById("btn-enter-showroom").onclick = () => showScreen("showroom");
document.getElementById("btn-back-menu").onclick = () => showScreen("menu");
document.getElementById("btn-start-race").onclick = () => startRace();

function startRace() {
    showScreen("race");

    raceRunning = false;
    raceTime = 0;
    raceLap = 1;
    raceCheckpoints = 0;
    racePosition = 4;
    speed = 120 + difficultyLevel * 5;
    gear = 4;
    boostActive = false;

    playerCar.className = "car-entity car-player car-" + selectedCarId;

    rival1.style.bottom = "20%";
    rival2.style.bottom = "26%";
    rival3.style.bottom = "32%";

    updateHUD();

    countdownOverlay.style.display = "flex";
    countdownText.textContent = "3";

    let count = 3;
    const countdownInterval = setInterval(() => {
        count--;
        if (count <= 0) {
            countdownText.textContent = "Go!";
            setTimeout(() => {
                countdownOverlay.style.display = "none";
                raceRunning = true;
                startRaceTimer();
                startRivalMovement();
            }, 500);
            clearInterval(countdownInterval);
        } else {
            countdownText.textContent = count;
        }
    }, 800);
}

function startRaceTimer() {
    raceTimerHandle = setInterval(() => {
        if (!raceRunning) return;

        raceTime += 0.1;

        if (raceTime > 4) raceCheckpoints = 1;
        if (raceTime > 8) raceCheckpoints = 2;
        if (raceTime > 12) raceCheckpoints = 3;

        if (raceTime > 5) racePosition = 3;
        if (raceTime > 10 && boostActive) racePosition = 2;
        if (raceTime > 20 && difficultyLevel >= 2 && boostActive) racePosition = 1;

        if (raceTime > 15) raceLap = 2;
        if (raceTime > 25) raceLap = 3;

        if (raceTime > 30 - difficultyLevel * 2) finishRace();

        updateHUD();
    }, 100);
}

function startRivalMovement() {
    rivalTimerHandle = setInterval(() => {
        if (!raceRunning) return;

        moveRival(rival1, 0.4);
        moveRival(rival2, 0.5);
        moveRival(rival3, 0.6);
    }, 200);
}

function moveRival(rival, speed) {
    let bottom = parseFloat(rival.style.bottom);
    bottom += speed;
    if (bottom > 40) bottom = 20;
    rival.style.bottom = bottom + "%";
}

function updateHUD() {
    hudTimer.textContent = "Time: " + raceTime.toFixed(1);
    hudLap.textContent = "Event: " + raceLap + " / 3";
    hudCheckpoints.textContent = "Checkpoint: " + raceCheckpoints + " / 3";
    hudSpeed.innerHTML = speed.toFixed(0) + "<span> km/h</span>";
    hudGear.textContent = "Gear " + gear;
    hudPosition.textContent = "Position: " + racePosition + " / 4";
}

function finishRace() {
    raceRunning = false;
    clearInterval(raceTimerHandle);
    clearInterval(rivalTimerHandle);

    const placedTop3 = racePosition <= 3;
    resultPanel.style.display = "flex";

    if (placedTop3) {
        resultSub.textContent = "You placed top 3. Festival prestige rises.";
        difficultyLevel = Math.min(3, difficultyLevel + 1);
    } else {
        resultSub.textContent = "You finished outside the top 3.";
    }
}

document.getElementById("btn-next-race").onclick = () => {
    resultPanel.style.display = "none";
    startRace();
};

document.getElementById("btn-return-showroom").onclick = () => {
    resultPanel.style.display = "none";
    showScreen("showroom");
};

document.addEventListener("keydown", (e) => {
    if (!raceRunning) return;

    const style = window.getComputedStyle(playerCar);
    let left = parseFloat(style.left);
    let bottom = parseFloat(style.bottom);

    if (["ArrowLeft", "a", "A"].includes(e.key)) {
        playerCar.style.left = Math.max(35, left - 2) + "%";
    }

    if (["ArrowRight", "d", "D"].includes(e.key)) {
        playerCar.style.left = Math.min(65, left + 2) + "%";
    }

    if (["ArrowUp", "w", "W"].includes(e.key)) {
        speed = Math.min(320, speed + 4);
        bottom = Math.min(30, bottom + 1);
        playerCar.style.bottom = bottom + "%";
        updateHUD();
    }

    if (["ArrowDown", "s", "S"].includes(e.key)) {
        speed = Math.max(40, speed - 6);
        bottom = Math.max(8, bottom - 1);
        playerCar.style.bottom = bottom + "%";
        updateHUD();
    }

    if (e.code === "Space") {
        boostActive = true;
        speed += 40;
        playerCar.style.bottom = Math.min(35, bottom + 4) + "%";
        updateHUD();
        setTimeout(() => boostActive = false, 1500);
    }
});
