// --- SCREEN HANDLING ---
const screens = {
    menu: document.getElementById("menu-screen"),
    showroom: document.getElementById("showroom-screen"),
    race: document.getElementById("race-screen"),
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
}

// --- ELEMENTS ---
const carCards = document.querySelectorAll(".car-card");
const previewShape = document.getElementById("preview-car-shape");
const playerCar = document.getElementById("player-car");
const rival1 = document.getElementById("rival1");
const rival2 = document.getElementById("rival2");
const rival3 = document.getElementById("rival3");

const countdownOverlay = document.getElementById("countdown-overlay");
const countdownText = document.getElementById("countdown-text");
const resultPanel = document.getElementById("result-panel");
const resultCard = document.getElementById("result-card");
const resultSub = document.getElementById("result-sub");

const hudTimer = document.getElementById("hud-timer");
const hudLap = document.getElementById("hud-lap");
const hudCheckpoints = document.getElementById("hud-checkpoints");
const hudSpeed = document.getElementById("hud-speed");
const hudGear = document.getElementById("hud-gear");
const hudPosition = document.querySelector("#hud-position .hud-pill");

// --- GAME STATE ---
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

// --- SHOWROOM LOGIC ---
carCards.forEach(card => {
    card.addEventListener("click", () => {
        carCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedCarId = card.dataset.carId;
        previewShape.className = "preview-car-shape " + selectedCarId;
    });
});

carCards[0].classList.add("selected");

document.getElementById("btn-enter-showroom").addEventListener("click", () => {
    showScreen("showroom");
});

document.getElementById("btn-back-menu").addEventListener("click", () => {
    showScreen("menu");
});

document.getElementById("btn-start-race").addEventListener("click", () => {
    startRace();
});

// --- RACE LOGIC ---
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
            countdownText.textContent = count.toString();
        }
    }, 800);
}

function startRaceTimer() {
    if (raceTimerHandle) clearInterval(raceTimerHandle);

    raceTimerHandle = setInterval(() => {
        if (!raceRunning) return;

        raceTime += 0.1;

        if (raceTime > 4 && raceCheckpoints < 1) raceCheckpoints = 1;
        if (raceTime > 8 && raceCheckpoints < 2) raceCheckpoints = 2;
        if (raceTime > 12 && raceCheckpoints < 3) raceCheckpoints = 3;

        if (raceTime > 5 && racePosition > 3) racePosition = 3;
        if (raceTime > 10 && racePosition > 2 && boostActive) racePosition = 2;
        if (raceTime > 20 && difficultyLevel >= 2 && racePosition > 1 && boostActive) racePosition = 1;

        if (raceTime > 15 && raceLap < 2) raceLap = 2;
        if (raceTime > 25 && raceLap < 3) raceLap = 3;

        if (raceTime > 30 - difficultyLevel * 2) {
            finishRace();
        }

        updateHUD();
    }, 100);
}

function startRivalMovement() {
    if (rivalTimerHandle) clearInterval(rivalTimerHandle);

    rivalTimerHandle = setInterval(() => {
        if (!raceRunning) return;

        moveRival(rival1, 0.4 + difficultyLevel * 0.02);
        moveRival(rival2, 0.5 + difficultyLevel * 0.02);
        moveRival(rival3, 0.6 + difficultyLevel * 0.02);
    }, 200);
}

function moveRival(rival, baseSpeed) {
    const style = window.getComputedStyle(rival);
    let bottomPercent = parseFloat(style.bottom);
    bottomPercent += baseSpeed;
    if (bottomPercent > 40) bottomPercent = 20;
    rival.style.bottom = bottomPercent + "%";
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
    resultCard.classList.remove("result-win", "result-lose");

    if (placedTop3) {
        resultCard.classList.add("result-win");
        resultSub.textContent =
            "You placed top 3. Festival prestige rises. Next house marque unlocks.";
        difficultyLevel = Math.min(3, difficultyLevel + 1);
    } else {
        resultCard.classList.add("result-lose");
        resultSub.textContent =
            "You finished outside the top 3. Championship run stalls until you redeem yourself.";
    }
}

// --- CONTROLS ---
document.addEventListener("keydown", (e) => {
    if (!raceRunning) return;

    const style = window.getComputedStyle(playerCar);
    const leftPercent = parseFloat(style.left);
    const bottomPercent = parseFloat(style.bottom);

    if (e.key === "ArrowLeft") {
        playerCar.style.left = Math.max(35, leftPercent - 2) + "%";
    }
    if (e.key === "ArrowRight") {
        playerCar.style.left = Math.min(65, leftPercent + 2) + "%";
    }
    if (e.key === "ArrowUp") {
        speed = Math.min(320, speed + 4);
        if (speed > 260) gear = 6;
        else if (speed > 220) gear = 5;
        else if (speed > 180) gear = 4;
        else if (speed > 140) gear = 3;
        else if (speed > 100) gear = 2;
        else gear = 1;

        playerCar.style.bottom = Math.min(30, bottomPercent + 1) + "%";
        updateHUD();
    }
    if (e.key === "ArrowDown") {
        speed = Math.max(40, speed - 6);
        if (speed < 80) gear = 2;
        if (speed < 50) gear = 1;

        playerCar.style.bottom = Math.max(8, bottomPercent - 1) + "%";
        updateHUD();
    }
    if (e.code === "Space") {
        boostActive = true;
        speed = Math.min(340, speed + 40);
        playerCar.style.bottom = Math.min(35, bottomPercent + 4) + "%";
        updateHUD();
        setTimeout(() => {
            boostActive = false;
        }, 1500);
    }
});

// --- RESULT BUTTONS ---
document.getElementById("btn-next-race").addEventListener("click", () => {
    resultPanel.style.display = "none";
    startRace();
});

document.getElementById("btn-return-showroom").addEventListener("click", () => {
    resultPanel.style.display = "none";
    showScreen("showroom");
});

document.addEventListener("keydown", (e) => {
    if (!raceRunning) return;

    const style = window.getComputedStyle(playerCar);
    const leftPercent = parseFloat(style.left);
    const bottomPercent = parseFloat(style.bottom);

    // A = left
    if (e.key === "a" || e.key === "A") {
        playerCar.style.left = Math.max(35, leftPercent - 2) + "%";
    }

    // D = right
    if (e.key === "d" || e.key === "D") {
        playerCar.style.left = Math.min(65, leftPercent + 2) + "%";
    }

    // W = accelerate
    if (e.key === "w" || e.key === "W") {
        speed = Math.min(320, speed + 4);

        if (speed > 260) gear = 6;
        else if (speed > 220) gear = 5;
        else if (speed > 180) gear = 4;
        else if (speed > 140) gear = 3;
        else if (speed > 100) gear = 2;
        else gear = 1;

        playerCar.style.bottom = Math.min(30, bottomPercent + 1) + "%";
        updateHUD();
    }

    // S = brake
    if (e.key === "s" || e.key === "S") {
        speed = Math.max(40, speed - 6);

        if (speed < 80) gear = 2;
        if (speed < 50) gear = 1;

        playerCar.style.bottom = Math.max(8, bottomPercent - 1) + "%";
        updateHUD();
    }

    // SHIFT = nitrous
    if (e.key === "Shift") {
        boostActive = true;
        speed = Math.min(360, speed + 50);
        playerCar.style.bottom = Math.min(35, bottomPercent + 4) + "%";
        updateHUD();

        setTimeout(() => {
            boostActive = false;
        }, 1500);
    }
});
document.getElementById("btn-next-race").addEventListener("click", () => {
    resultPanel.style.display = "none";
    setTimeout(() => {
        startRace();
    }, 300);
});
