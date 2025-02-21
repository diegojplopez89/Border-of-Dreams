// ✅ Define Google Apps Script Web App URL (Update with your correct URL)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyN2uUzSeZPwA_yjQg9RyfgOsxqjFIUi_egsnCEO-b24DK1JUVSRH1Vm0cHyR4E2tG1/exec";

// ✅ Global player data
let playerName = "";
let playerGender = "";
let playerStats = {
    health: 100,
    money: 50,
    resilience: 50,
    community: 30
};

// ✅ Function to set player details
function setPlayerDetails() {
    console.log("Start Journey button clicked!");

    let nameInput = document.getElementById("player-name").value.trim();
    let genderInput = document.getElementById("player-gender").value;

    if (nameInput === "") {
        alert("Please enter a name before starting your journey.");
        return;
    }

    playerName = nameInput;
    playerGender = genderInput;

    console.log(`Player Name: ${playerName}, Gender: ${playerGender}`);

    document.getElementById("story-text").innerHTML = 
        `Welcome, ${playerName}. You are ${playerGender}. Choose your era of migration:`;

    document.getElementById("era-selection").style.display = "block";
    document.getElementById("player-setup").style.display = "none";
}
function getImageUrl(imageUrl) {
    return imageUrl; // GitHub image links are already direct
}


// ✅ Make function accessible globally
window.setPlayerDetails = setPlayerDetails;

// ✅ Function to fetch game data from Google Apps Script
async function fetchGameData() {
    console.log("Fetching game data...");
    try {
        let response = await fetch(WEB_APP_URL, { method: "GET" });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Game data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching game data:", error);
        alert("Failed to load game data. Check your internet connection or API settings.");
        return [];
    }
}


// ✅ Function to start the game based on era selection
function startGame(era) {
    let storyText = document.getElementById("story-text");
    let buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.innerHTML = ""; // Clear previous buttons

    let genderedTerms = {
        male: "man",
        female: "woman",
        trans: "transgender person",
        nonbinary: "individual"
    };

    let pronouns = {
        male: "he",
        female: "she",
        trans: "they",
        nonbinary: "they"
    };

    let genderLabel = genderedTerms[playerGender] || "person";
    let pronoun = pronouns[playerGender] || "they";

    if (era === "1890s") {
        storyText.innerHTML = `${playerName}, you are a ${genderLabel} arriving at Ellis Island. ${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} is exhausted from the long voyage.`;

        buttonsContainer.innerHTML = `
            <button onclick="ellisIslandChoice('Tell the truth')">Tell the truth</button>
            <button onclick="ellisIslandChoice('Lie about background')">Lie about your background</button>
            <button onclick="ellisIslandChoice('Bribe')">Attempt to bribe the officer</button>
        `;
    }
}

// ✅ Make function accessible globally
window.startGame = startGame;

// ✅ Function to handle choices in 1890s Ellis Island
async function ellisIslandChoice(choice) {
    console.log(`Choice selected: ${choice}`);

    let choices = await fetchGameData();
    if (!choices || !Array.isArray(choices)) {
        console.error("Error: Choices data is missing or not an array.");
        return;
    }

    let selectedChoice = choices.find(c => c.Choice.trim().toLowerCase() === choice.trim().toLowerCase());

    if (!selectedChoice) {
        document.getElementById("story-text").innerHTML = `
            <p>You hesitate, unsure of what to do. The moment passes.</p>
            <button onclick="startGame('1890s')">Try Again</button>
        `;
        return;
    }

    console.log("Selected Choice:", selectedChoice);



    console.log("Image URL:", imageUrl);

    let imageHTML = `<img id="event-image" src="${imageUrl}" width="400" alt="Historical Image" 
                     onerror="this.onerror=null;this.src='https://via.placeholder.com/400';">`;

    // ✅ Update the story and display image
    document.getElementById("story-text").innerHTML = `
        <p>${selectedChoice.Outcome}</p>
        <br>
        ${imageHTML}
        <br><br>
        <button onclick="nextStep()">Continue</button>
    `;

    // ✅ Update stats safely
    playerStats.health += parseInt(selectedChoice.Health) || 0;
    playerStats.money += parseInt(selectedChoice.Money) || 0;
    playerStats.resilience += parseInt(selectedChoice.Resilience) || 0;
    playerStats.community += parseInt(selectedChoice.Community) || 0;

    updateStatsDisplay();
    checkGameOver();
}
function nextStep() {
    document.getElementById("story-text").innerHTML = "What do you want to do next?";
    document.getElementById("buttons-container").innerHTML = `
        <button onclick="ellisIslandChoice('Take factory job')">Take Factory Job</button>
        <button onclick="ellisIslandChoice('Rent apartment')">Find Housing</button>
        <button onclick="ellisIslandChoice('Assimilate quickly')">Try to Assimilate</button>
    `;
}

// ✅ Make function accessible globally
window.ellisIslandChoice = ellisIslandChoice;

// ✅ Function to update stats display
function updateStatsDisplay() {
    document.getElementById("stats").innerHTML = 
        `<strong>❤️ Health:</strong> ${playerStats.health} | 
         <strong>💰 Money:</strong> $${playerStats.money} | 
         <strong>💪 Resilience:</strong> ${playerStats.resilience} | 
         <strong>🤝 Community:</strong> ${playerStats.community}`;
}

// ✅ Function to check game over conditions
function checkGameOver() {
    let storyText = document.getElementById("story-text");
    let buttonsContainer = document.getElementById("buttons-container");

    if (playerStats.health <= 0) {
        storyText.innerHTML = `${playerName}, your body couldn't handle the hardships. Your journey has ended.`;
        buttonsContainer.innerHTML = `<button onclick="restartGame()">Restart Journey</button>`;
        return true;
    }

    if (playerStats.resilience <= 0) {
        storyText.innerHTML = `${playerName}, the struggles have broken your spirit. You have lost the will to continue.`;
        buttonsContainer.innerHTML = `<button onclick="restartGame()">Restart Journey</button>`;
        return true;
    }

    return false;
}

// ✅ Function to restart the game
function restartGame() {
    playerStats = {
        health: 100,
        money: 50,
        resilience: 50,
        community: 30
    };

    document.getElementById("story-text").innerHTML = "You are about to begin your journey. Enter your name and choose your era of migration:";
    document.getElementById("buttons-container").innerHTML = "";
    document.getElementById("player-setup").style.display = "block";
    document.getElementById("era-selection").style.display = "none";

    updateStatsDisplay();
}

function toggleMusic() {
    let music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// ✅ Make function globally accessible
window.toggleMusic = toggleMusic;


// ✅ Make function accessible globally
window.restartGame = restartGame;
window.nextStep = nextStep;
