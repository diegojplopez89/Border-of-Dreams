
function startGame(era) {
    let storyText = document.getElementById("story-text");
    let buttonsContainer = document.getElementById("buttons-container");

    if (era === "1890s") {
        storyText.innerHTML = "You arrive at Ellis Island, tired from your long voyage. An immigration officer approaches you and asks for your paperwork. What do you do?";
        buttonsContainer.innerHTML = `
            <button onclick="ellisIslandChoice('truth')">Tell the truth</button>
            <button onclick="ellisIslandChoice('lie')">Lie about your background</button>
            <button onclick="ellisIslandChoice('bribe')">Attempt to bribe the officer</button>
        `;
    } else if (era === "1980s") {
        storyText.innerHTML = "You flee political turmoil in Latin America and arrive at the U.S. border. You see a long line of people waiting for asylum. What do you do?";
        buttonsContainer.innerHTML = `
            <button onclick="latinAmericaChoice('wait')">Wait in line for asylum</button>
            <button onclick="latinAmericaChoice('cross')">Attempt to cross illegally</button>
            <button onclick="latinAmericaChoice('fake_docs')">Use fake documents</button>
        `;
    } else if (era === "Present") {
        storyText.innerHTML = "You are escaping a dangerous situation in your home country, trying to navigate the complex immigration system. What is your first step?";
        buttonsContainer.innerHTML = `
            <button onclick="modernChoice('apply_visa')">Apply for a visa</button>
            <button onclick="modernChoice('seek_asylum')">Seek asylum</button>
            <button onclick="modernChoice('cross_border')">Cross the border illegally</button>
        `;
    }
}

// 1890s Ellis Island Choices
function ellisIslandChoice(choice) {
    let storyText = document.getElementById("story-text");

    if (choice === "truth") {
        storyText.innerHTML = "The officer nods and sends you to the next checkpoint. You are lucky today!";
    } else if (choice === "lie") {
        storyText.innerHTML = "The officer catches your lie and sends you to secondary inspection. You may be deported!";
    } else if (choice === "bribe") {
        storyText.innerHTML = "The officer looks insulted and immediately denies your entry. You are put on the next ship back!";
    }
}

// 1980s Latin America Choices
function latinAmericaChoice(choice) {
    let storyText = document.getElementById("story-text");

    if (choice === "wait") {
        storyText.innerHTML = "You wait for months. Your asylum claim is finally reviewed, but there are no guarantees.";
    } else if (choice === "cross") {
        storyText.innerHTML = "You sneak across the border at night. The journey is dangerous, but you make it.";
    } else if (choice === "fake_docs") {
        storyText.innerHTML = "Your documents are checked, but an officer notices something suspicious. You are detained!";
    }
}

// Present Day Choices
function modernChoice(choice) {
    let storyText = document.getElementById("story-text");

    if (choice === "apply_visa") {
        storyText.innerHTML = "You apply for a visa, but the wait time is years. You must decide if you can wait that long.";
    } else if (choice === "seek_asylum") {
        storyText.innerHTML = "You are placed in a detention center while your case is processed.";
    } else if (choice === "cross_border") {
        storyText.innerHTML = "You decide to cross the border on foot, facing great risks along the way.";
    }
}
