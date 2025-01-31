/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/
console.log("Test log");
// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = GAMES_DATA;



// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    deleteChildElements(gamesContainer);  
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new card for each game
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Use template literals to structure the card's content
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img"/>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Raised: $${game.pledged.toLocaleString()}</p>
        `;

        // Add the card to the container
        gamesContainer.appendChild(gameCard);
    }
}

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total Contributions: ${totalBackers.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `Total Raised: $${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `Total Number of Games: ${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

/// Step 1: Filter unfunded games
function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Number of unfunded games:", unfundedGames.length); // Secret Key Component 1: Log the number of unfunded games
    addGamesToPage(unfundedGames);
}

// Step 2: Filter funded games
function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
     console.log("Number of funded games:", fundedGames.length);// Secret Key Component 2: Log the number of funded games
    addGamesToPage(fundedGames);
}

// Step 3: Show all games
function showAllGames() {
    console.log("Total number of games:", GAMES_JSON.length); // Log the total number of games
    addGamesToPage(GAMES_JSON);
}

// Step 4: Add event listeners to buttons
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

// Initially show all games
showAllGames();

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedMessage = unfundedGamesCount > 0 ? 
    `We have ${unfundedGamesCount} games that are still looking for funding.` : 
    "All of our games are fully funded!";

// create a new DOM element containing the template string and append it to the description container
const unfundedMessageElement = document.createElement("p");
unfundedMessageElement.textContent = unfundedMessage;
descriptionContainer.appendChild(unfundedMessageElement);


/*************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by pledged amount in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Extract the first word of the most funded game (firstGame)
const firstWordFirstGame = firstGame.name.split(" ")[0];

// Extract the first word of the second most funded game (secondGame)
const firstWordSecondGame = secondGame.name.split(" ")[0];

// Log the first words (or use them for the Secret Key)
console.log(firstWordFirstGame);  // Logs the first word of the most funded game
console.log(firstWordSecondGame); // Logs the first word of the second most funded game

// Create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.innerHTML = `
    <h3>${firstGame.name}</h3>
    <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
`;

// Do the same for the runner-up item
secondGameContainer.innerHTML = `
    <h3>${secondGame.name}</h3>
    <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
`;

// Add all games to the page
addGamesToPage(GAMES_JSON);