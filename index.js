/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);
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
  // const games = JSON.parse(GAMES_DAT÷A);
  // const gameDataAllDiv = document.createElement("div");
  // const gamesContainer = document.getElementById("games-container");
  // gameDataAllDiv.classList.add("all-games");
  // gamesContainer.classList.add("all-games");

  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const gameDataDiv = document.createElement("div");
    // add the class game-card to the list
    gameDataDiv.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game:
    gameDataDiv.innerHTML = `
    <img src="${game.img}" class="game-img"alt= "${game.name} picture"> 
    <div class = "${game.name}">
    <h1>${game.name}</h1>
    <p>Game Description: ${game.description}</p>
    <p>Our Goal: Let's reach ${game.goal} pledges! Currently we have ${game.pledged} pledges from ${game.backers} backers!!</p>
    </div>
    `;

    // append the game to the games-container
    gamesContainer?.appendChild(gameDataDiv);
    // gameDataAllDiv?.appendChild(gameDataDiv);
    // document.body.append(gameDataAllDiv);
  });
}

// Testing purposes:
// function tester() {
//   const working = document.createElement("h1");
//   working.innerHTML = "Hey does this work?";
//   showGamesButton?.appendChild(working);
// }
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// // addGamesToPage();
// showGamesButton?.addEventListener()
// const showGamesButton = document.getElementById("all-btn");
// showGamesButton.addEventListener("click", () => addGamesToPage(GAMES_JSON));

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
console.log("tolocal is: ", totalContributions);
const toLocal = totalContributions.toLocaleString("en-US");
contributionsCard.innerHTML = `${toLocal}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
// set inner HTML using template literal
const toLocalRaised = totalRaised.toLocaleString("en-US");
console.log("toLocalRaised is: ", toLocalRaised);
raisedCard.innerHTML = `${toLocalRaised}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  console.log("unfunded games are: ", unfundedGames);

  addGamesToPage(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
}

const showUnfundedButton = document.getElementById("unfunded-btn");
showUnfundedButton.addEventListener("click", () => filterUnfundedOnly());

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  console.log("funded games are: ", fundedGames);

  addGamesToPage(fundedGames);
}

const showFundedButton = document.getElementById("funded-btn");
showFundedButton.addEventListener("click", () => filterFundedOnly());

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  // use filter() to get a list of games that have not yet met their goal
  const allGames = GAMES_JSON.filter((game) => {
    return game == game;
  });
  console.log("allGames games are: ", allGames);

  addGamesToPage(allGames);
}

const showGamesButton = document.getElementById("all-btn");
showGamesButton.addEventListener("click", () => showAllGames());

// select each button in the "Our Games" section
// const unfundedBtn = document.getElementById("unfunded-btn");
// const fundedBtn = document.getElementById("funded-btn");
// const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games:
function totalUnfundedGames() {
  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  return unfundedGames.length;
}
function totalFundedGames() {
  // use filter() to get a list of games that have not yet met their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  return fundedGames.length;
}

console.log(
  "total unfunded and funded, :",
  totalUnfundedGames(),
  totalFundedGames()
);
function totalMoneyFundedGames() {
  const totalFundedRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
  }, 0);
  // console.log("totalFundedRaised is : ", totalFundedRaised);
  return totalFundedRaised.toLocaleString("en-US");
}

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesAmount = totalUnfundedGames();
const fundedGamesAmount = totalFundedGames();
const totalFundedAmount = totalMoneyFundedGames();
// let unfundedGames = 1; // Test for singular
let unfundedGames = unfundedGamesAmount; // Test for plural

// Backup:
// const headerDescriptionSingular = `A total of $${totalMoneyFundedGamesAmount} has been raised for ${fundedGamesAmount} games.
// Currently, ${unfundedGames} game remains unfunded. We need your help to fund these amazing games!`;
// const headerDescriptionPlural = `A total of $${totalMoneyFundedGamesAmount} has been raised for ${fundedGamesAmount} games.
// Currently, ${unfundedGames} games remain unfunded. We need your help to fund these amazing games!`;
const lineOne =
  "The purpose of our company is to fund independent games. We've been in operation for 12 years.";
const headerDescription = `A total of $${totalFundedAmount} has been raised for ${
  GAMES_JSON.length
} games. 
Currently, ${
  unfundedGames > 1
    ? `${unfundedGames} games remain unfunded`
    : ` ${unfundedGames} game remains unfunded`
}. We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container

descriptionContainer.innerHTML = lineOne;
descriptionContainer.innerHTML += "<br /><br />";
descriptionContainer.innerHTML += headerDescription;
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;
console.log("first ,sec: ", first, second);
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement("p");
const secondTopGame = document.createElement("p");
topGame.innerHTML = first.name;
secondTopGame.innerHTML = second.name;
firstGameContainer?.appendChild(topGame);
secondGameContainer?.appendChild(secondTopGame);
// topGame.innerHTML = `
// <img src="${topGame.img}" class="game-img"alt= "${topGame.name} picture">
// <div class = "${topGame.name}">
// <h1>${topGame.name}</h1>
// <p>Game Description: ${topGame.description}</p>
// <p>Our Goal: Let's reach ${topGame.goal} pledges! Currently we have ${topGame.pledged} pledges from ${topGame.backers} backers!!</p>
// </div>
// `;
// secondTopGame.innerHTML = `
// <img src="${secondTopGame.img}" class="game-img"alt= "${secondTopGame.name} picture">
// <div class = "${secondTopGame.name}">
// <h1>${secondTopGame.name}</h1>
// <p>Game Description: ${secondTopGame.description}</p>
// <p>Our Goal: Let's reach ${secondTopGame.goal} pledges! Currently we have ${secondTopGame.pledged} pledges from ${secondTopGame.backers} backers!!</p>
// </div>
// `;

// const showGamesButton = document.getElementById("all-btn");
// showGamesButton.addEventListener("click", () => showAllGames());
// do the same for the runner up item
