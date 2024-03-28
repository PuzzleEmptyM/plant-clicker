let score = 0;
let multiplier = 1; // Initialize to 1 to ensure the game starts correctly

// Upgrade costs
let upgrade1Cost = 50;
let upgrade2Cost = 200;
let upgrade3Cost = 500;

function updateScoreDisplay() {
  document.getElementById('score').innerText = score;
}

function updateMultiplierDisplay() {
  document.getElementById('multiplier').innerText = `Multiplier: x${multiplier}`;
}

function updateUpgradeCosts() {
  document.getElementById('upgrade1').innerText = `Quality Soil - Cost: ${upgrade1Cost}`;
  document.getElementById('upgrade2').innerText = `Enhanced Water - Cost: ${upgrade2Cost}`;
  document.getElementById('upgrade3').innerText = `Gardening Tools - Cost: ${upgrade3Cost}`;
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
