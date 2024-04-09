let score = 0;
let multiplier = 1; // Initialize to 1 to ensure the game starts correctly

// Upgrade costs

const passive1Cost = 500;
const passive2Cost = 1000;
const passive3Cost = 15000;
let upgrade1Cost = 50;
let upgrade2Cost = 200;
let upgrade3Cost = 500;
let lvlUpCost = 10000;

function updateScoreDisplay() {
  document.getElementById('score').innerText = score;
}

function updateMultiplierDisplay() {
  document.getElementById('multiplier').innerText = `Clicker Multiplier: x${multiplier}`;
}

function updateUpgradeCosts() {
  document.getElementById('upgrade1').innerText = `Quality Soil (+1 multiplier) - Cost: ${upgrade1Cost}`;
  document.getElementById('upgrade2').innerText = `Enhanced Water (+2 multiplier) - Cost: ${upgrade2Cost}`;
  document.getElementById('upgrade3').innerText = `Gardening Tools (+3 multiplier) - Cost: ${upgrade3Cost}`;
  document.getElementById('lvl_up').innerText = `LVL UP! - Cost: ${lvlUpCost}`;
}

function getCookie(name) {
  let cookieArray = document.cookie.split('; ');
  let cookie = cookieArray.find(row => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Load game state from cookies or initialize to defaults
window.addEventListener('load', function() {
  let savedScore = getCookie('score');
  if (savedScore) {
    score = parseInt(savedScore, 10);
  }

  let savedMultiplier = getCookie('multiplier');
  if (savedMultiplier) {
    multiplier = parseInt(savedMultiplier, 10);
  }
  
  // Load saved upgrade costs
  let savedUpgrade1Cost = getCookie('upgrade1Cost');
  if (savedUpgrade1Cost) {
    upgrade1Cost = parseInt(savedUpgrade1Cost, 10);
  }
  let savedUpgrade2Cost = getCookie('upgrade2Cost');
  if (savedUpgrade2Cost) {
    upgrade2Cost = parseInt(savedUpgrade2Cost, 10);
  }
  let savedUpgrade3Cost = getCookie('upgrade3Cost');
  if (savedUpgrade3Cost) {
    upgrade3Cost = parseInt(savedUpgrade3Cost, 10);
  }

  let savedLvlUpCost = getCookie('lvlUpCost');
  if (savedLvlUpCost) {
    lvlUpCost = parseInt(savedLvlUpCost, 10);
  }

  setInterval(function() {
    document.title = "Plant Clicker - Score: " + score;
  }, 1000)

  updateScoreDisplay();
  updateMultiplierDisplay();
  updateUpgradeCosts();
});

// Event listeners for game interactions
document.getElementById('clicker').addEventListener('click', function() {
  score += multiplier;
  updateScoreDisplay();
  setCookie('score', score, 7); // Save for 7 days
});

document.getElementById('clicker').addEventListener('click', function() {
  this.classList.add('bounceWobble');

  setTimeout(() => {
    this.classList.remove('bounceWobble');
  }, 100); // Match the duration of the bounceWobble animation
});


document.getElementById('reset').addEventListener('click', function() {
  score = 0;
  multiplier = 1;
  upgrade1Cost = 50;
  upgrade2Cost = 200;
  upgrade3Cost = 500;
  lvlUpCost = 10000;
  
  // Update displays
  updateScoreDisplay();
  updateMultiplierDisplay();
  updateUpgradeCosts();

  // Reset and save the state to cookies
  deleteCookie('score');
  setCookie('multiplier', multiplier, 7);
  setCookie('upgrade1Cost', upgrade1Cost, 7);
  setCookie('upgrade2Cost', upgrade2Cost, 7);
  setCookie('upgrade3Cost', upgrade3Cost, 7);
  setCookie('lvlUpCost', lvlUpCost, 7);
});


// Functions to handle purchasing upgrades
function buyUpgrade1() {
  if (score >= upgrade1Cost) {
    score -= upgrade1Cost;
    multiplier += 1;
    upgrade1Cost *= 2; // Increase the cost for the next purchase
    setCookie('multiplier', multiplier, 7); // Save updated multiplier
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade1Cost', upgrade1Cost, 7);
  }
}

function buyUpgrade2() {
  if (score >= upgrade2Cost) {
    score -= upgrade2Cost;
    multiplier += 2;
    upgrade2Cost *= 2;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade2Cost', upgrade2Cost, 7);
  }
}

function buyUpgrade3() {
  if (score >= upgrade3Cost) {
    score -= upgrade3Cost;
    multiplier += 3;
    upgrade3Cost *= 2;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade3Cost', upgrade3Cost, 7);
  }
}



///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// Variables to hold the income rates for passive upgrades
let passiveIncomeRate1 = 0;
let passiveIncomeRate2 = 0;
let passiveIncomeRate3 = 0;

function buyPassive1() {
  if (score >= passive1Cost) {
    score -= passive1Cost;
    passiveIncomeRate1 += 1; // Increase passive income rate
    passive1Cost *= 2; // Increase the cost for the next purchase

    updateScoreDisplay();
    updateUpgradeCosts();
    setCookie('passive1Cost', passive1Cost, 7); // Save updated cost
  }
}

function buyPassive2() {
  if (score >= passive2Cost) {
    score -= passive2Cost;
    passiveIncomeRate2 += 10; // Increase passive income rate more significantly
    passive2Cost *= 2;

    updateScoreDisplay();
    updateUpgradeCosts();
    setCookie('passive2Cost', passive2Cost, 7);
  }
}

function buyPassive3() {
  if (score >= passive3Cost) {
    score -= passive3Cost;
    passiveIncomeRate3 += 50; // Even more significant increase
    passive3Cost *= 2;

    updateScoreDisplay();
    updateUpgradeCosts();
    setCookie('passive3Cost', passive3Cost, 7);
  }
}

// Ensure the passive income rates are applied
function applyPassiveIncome() {
  score += passiveIncomeRate1 + passiveIncomeRate2 + passiveIncomeRate3;
  updateScoreDisplay();
}

// Call this function every second to apply passive income
setInterval(applyPassiveIncome, 1000);

// Ensure to add the new functions to the load event listener to load saved costs
window.addEventListener('load', function() {
  // Existing load code...
  
  let savedPassive1Cost = getCookie('passive1Cost');
  if (savedPassive1Cost) {
    passive1Cost = parseInt(savedPassive1Cost, 10);
  }
  
  let savedPassive2Cost = getCookie('passive2Cost');
  if (savedPassive2Cost) {
    passive2Cost = parseInt(savedPassive2Cost, 10);
  }
  
  let savedPassive3Cost = getCookie('passive3Cost');
  if (savedPassive3Cost) {
    passive3Cost = parseInt(savedPassive3Cost, 10);
  }

  // Don't forget to update the display of costs for these new passive upgrades
  updateUpgradeCosts();
});

function updateUpgradeCosts() {
  // Existing update code...

  // Update passive upgrade costs
  document.getElementById('passive1').innerText = `Better Sunlight - Cost: ${passive1Cost}`;
  document.getElementById('passive2').innerText = `Temperature Control - Cost: ${passive2Cost}`;
  document.getElementById('passive3').innerText = `Humidity Control - Cost: ${passive3Cost}`;
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////



var flag = 1;

function lvl_up() {
  var plantImg = document.getElementById('clicker');
  if (score >= lvlUpCost) {
    flag += 1;
    score -= lvlUpCost;
    lvlUpCost *= 10;
    multiplier *=10;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('lvlUpCost', lvlUpCost, 7);
  }
  if (flag === 2) {
    plantImg.classList.replace('plantLvl1','plantLvl2');
  }
  if (flag === 3) {
    plantImg.classList.replace('plantLvl2','plantLvl3');
    document.getElementById('lvl_up').textContent = 'Next Biome Upgrade: ' + lvlUpCost;
  }
  if (flag === 4) {
    // reset and go to next biome
  }
}

function showPowerUp() {
  const powerUp = document.createElement('img');
  powerUp.src = '/plant-clicker/images/GoldenFlowerCoin.png'; // Update path
  powerUp.className = 'power-up';

  const container = document.getElementById('game-container');
  container.style.position = 'relative';
  container.style.padding = "p-1"
  const { width, height } = container.getBoundingClientRect();

  // Random position within the container
  powerUp.style.left = `${Math.random() * (width +1)}px`; // Adjust 50px if your image size changes
  powerUp.style.top = `${Math.random() * (height +1)}px`; // Adjust 50px if your image size changes

  container.appendChild(powerUp);

  // Click event to apply the multiplier effect
  powerUp.addEventListener('click', () => {
      const originalMultiplier = multiplier;
      multiplier *= 100; // Increase multiplier

      updateMultiplierDisplay();
      
      setTimeout(() => {
          multiplier = originalMultiplier; // Reset multiplier after 10 seconds
          updateMultiplierDisplay();
      }, 10000); // 10 seconds

      powerUp.remove(); // Remove the power-up from the game
  });

  // Automatically remove the power-up after 10 seconds if not clicked
  setTimeout(() => {
      if (document.body.contains(powerUp)) {
          powerUp.remove();
      }
  }, 5000); // 5 seconds
}

// Show the power-up randomly once every 1,000 seconds
setInterval(showPowerUp, 10000);

// script that updates title constantly

