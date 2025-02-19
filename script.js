function startGame(era) {
    let storyText = document.getElementById("story-text");

    if (era === "1890s") {
        storyText.innerHTML = "You arrive at Ellis Island, tired from your long voyage. An immigration officer approaches...";
    } else if (era === "1980s") {
        storyText.innerHTML = "You flee political turmoil in Latin America and arrive at the U.S. border. You see a long line of people waiting for asylum...";
    } else if (era === "Present") {
        storyText.innerHTML = "You are escaping a dangerous situation in your home country, trying to navigate the complex immigration system...";
    }
}
