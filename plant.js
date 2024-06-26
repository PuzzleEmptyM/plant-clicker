///////////////////////////////////////////////////////////////////////////////////
////////////////////////////// INITIAL GAME SETUP /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

let score = 0;
let multiplier = 1; // Initialize to 1 to ensure the game starts correctly

// Variables that hold passive upgrade costs
let passive1Cost = 500;
let passive2Cost = 1000;
let passive3Cost = 15000;
let passive4Cost = 50000;
let passive5Cost = 100000;
let passive6Cost = 250000;
let passive7Cost = 1000000;
let passive8Cost = 15000000;
let passive9Cost = 50000000;
let passive10Cost = 100000000;
// Variables to hold the income rates for passive upgrades
let passiveIncomeRate1 = 0;
let passiveIncomeRate2 = 0;
let passiveIncomeRate3 = 0;
let passiveIncomeRate4 = 0;
let passiveIncomeRate5 = 0;
let passiveIncomeRate6 = 0;
let passiveIncomeRate7 = 0;
let passiveIncomeRate8 = 0;
let passiveIncomeRate9 = 0;
let passiveIncomeRate10 = 0;
// variables that hold clicker upgrade costs
let upgrade1Cost = 50;
let upgrade2Cost = 200;
let upgrade3Cost = 500;
let upgrade4Cost = 1500;
let upgrade5Cost = 5000;
// variable that holds plant lvl cost
let lvlUpCost = 10000;

// Function to format numbers
function formatNumber(number) {
  if (number >= 1000000000000000) {
    return (number / 1000000000000000).toFixed(1) + 'q';
  } else if (number >= 1000000000000) {
    return (number / 1000000000000).toFixed(1) + 'T';
  } else if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    return Math.trunc(number).toLocaleString();
  }
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////// EVENT LISTENERS & DISPLAY UPDATES ///////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function updateScoreDisplay() {
  document.getElementById('score').innerText = formatNumber(score);
}

function updateMultiplierDisplay() {
  document.getElementById('multiplier').innerText = `Clicker: x${formatNumber(multiplier)}`;
}

function updatePassiveCPS() {
  var currentCPS = passiveIncomeRate1 + passiveIncomeRate2 + passiveIncomeRate3 + passiveIncomeRate4 + passiveIncomeRate5 + passiveIncomeRate6 + passiveIncomeRate7 + passiveIncomeRate8 +passiveIncomeRate9 + passiveIncomeRate10;
  document.getElementById('passive').innerText = `Passive IPS: ${formatNumber(currentCPS)}`;
}

function updateUpgradeCosts() {
  document.getElementById('upgrade1').innerText = `Quality Soil (+1 multiplier) - Cost: ${formatNumber(upgrade1Cost)}`;
  document.getElementById('upgrade2').innerText = `Enhanced Water (+2 multiplier) - Cost: ${formatNumber(upgrade2Cost)}`;
  document.getElementById('upgrade3').innerText = `Gardening Tools (+3 multiplier) - Cost: ${formatNumber(upgrade3Cost)}`;
  document.getElementById('upgrade4').innerText = `Fertilizer (+5 multiplier) - Cost: ${formatNumber(upgrade4Cost)}`;
  document.getElementById('upgrade5').innerText = `Carbon Dose (+25 multiplier) - Cost: ${formatNumber(upgrade5Cost)}`;
  document.getElementById('lvl_up').innerText = `LVL UP! - Cost: ${formatNumber(lvlUpCost)}`;
  // Passive Income <->
  document.getElementById('passive1').innerText = `Better Sunlight - Cost: ${formatNumber(passive1Cost)}`;
  document.getElementById('passive2').innerText = `Temperature Control - Cost: ${formatNumber(passive2Cost)}`;
  document.getElementById('passive3').innerText = `Humidity Control - Cost: ${formatNumber(passive3Cost)}`;
  document.getElementById('passive4').innerText = `Irrigation System - Cost: ${formatNumber(passive4Cost)}`;
  document.getElementById('passive5').innerText = `UV Lamp - Cost: ${formatNumber(passive5Cost)}`;
  document.getElementById('passive6').innerText = `Clearer Windows - Cost: ${formatNumber(passive6Cost)}`;
  document.getElementById('passive7').innerText = `Photosynthesis Plus - Cost: ${formatNumber(passive7Cost)}`;
  document.getElementById('passive8').innerText = `Bee Pheromones - Cost: ${formatNumber(passive8Cost)}`;
  document.getElementById('passive9').innerText = `Greenhouse - Cost: ${formatNumber(passive9Cost)}`;
  document.getElementById('passive10').innerText = `Carbon Converter - Cost: ${formatNumber(passive10Cost)}`;
}

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////// COOKIE MANAGEMENT //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// GAME STATE MANAGEMENT ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// Load game state from cookies or initialize to defaults
window.addEventListener('load', function() {

  let savedFlag = getCookie('flag');
  console.log('Loaded flag from cookie:', savedFlag);
  if (savedFlag) {
    let flag = parseInt(savedFlag, 10);
    if (flag > 5) {
      flag = 5;
    }
    updateImageBasedOnFlag(flag);  // Ensure image updates on load
  }
  

  let savedScore = getCookie('score');
  if (savedScore) {
    score = parseInt(savedScore, 10);
  }

  let savedMultiplier = getCookie('multiplier');
  if (savedMultiplier) {
    multiplier = parseInt(savedMultiplier, 10);
  }

  let savedPassiveIncomeRate1 = getCookie('passiveIncomeRate1');
    if (savedPassiveIncomeRate1) {
        passiveIncomeRate1 = parseInt(savedPassiveIncomeRate1, 10);
  }
  
  let savedPassiveIncomeRate2 = getCookie('passiveIncomeRate2');
  if (savedPassiveIncomeRate2) {
      passiveIncomeRate2 = parseInt(savedPassiveIncomeRate2, 10);
  }

  let savedPassiveIncomeRate3 = getCookie('passiveIncomeRate3');
  if (savedPassiveIncomeRate3) {
      passiveIncomeRate3 = parseInt(savedPassiveIncomeRate3, 10);
}

  let savedPassiveIncomeRate4 = getCookie('passiveIncomeRate4');
    if (savedPassiveIncomeRate4) {
        passiveIncomeRate4 = parseInt(savedPassiveIncomeRate4, 10);
  }
  
  let savedPassiveIncomeRate5 = getCookie('passiveIncomeRate5');
  if (savedPassiveIncomeRate5) {
      passiveIncomeRate5 = parseInt(savedPassiveIncomeRate5, 10);
  }

  let savedPassiveIncomeRate6 = getCookie('passiveIncomeRate6');
  if (savedPassiveIncomeRate6) {
      passiveIncomeRate6 = parseInt(savedPassiveIncomeRate6, 10);
  }

  let savedPassiveIncomeRate7 = getCookie('passiveIncomeRate7');
  if (savedPassiveIncomeRate7) {
      passiveIncomeRate7 = parseInt(savedPassiveIncomeRate7, 10);
  }

  let savedPassiveIncomeRate8 = getCookie('passiveIncomeRate8');
  if (savedPassiveIncomeRate8) {
      passiveIncomeRate8 = parseInt(savedPassiveIncomeRate8, 10);
  }

  let savedPassiveIncomeRate9 = getCookie('passiveIncomeRate9');
  if (savedPassiveIncomeRate9) {
      passiveIncomeRate9 = parseInt(savedPassiveIncomeRate9, 10);
  }

  let savedPassiveIncomeRate10 = getCookie('passiveIncomeRate10');
  if (savedPassiveIncomeRate10) {
      passiveIncomeRate10 = parseInt(savedPassiveIncomeRate10, 10);
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
  let savedUpgrade4Cost = getCookie('upgrade4Cost');
  if (savedUpgrade4Cost) {
    upgrade4Cost = parseInt(savedUpgrade4Cost, 10);
  }
  let savedUpgrade5Cost = getCookie('upgrade5Cost');
  if (savedUpgrade5Cost) {
    upgrade5Cost = parseInt(savedUpgrade5Cost, 10);
  }

  let savedLvlUpCost = getCookie('lvlUpCost');
  if (savedLvlUpCost) {
    lvlUpCost = parseInt(savedLvlUpCost, 10);
  }

  setInterval(function() {
    document.title = "Plant Clicker - Score: " + formatNumber(score);
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

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// RESET COOKIES ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

document.getElementById('reset').addEventListener('click', function() {
  score = 0;
  multiplier = 1;
  upgrade1Cost = 50;
  upgrade2Cost = 200;
  upgrade3Cost = 500;
  upgrade4Cost = 1500;
  upgrade5Cost = 5000;
  lvlUpCost = 10000;
  passive1Cost = 500;
  passive2Cost = 1000;
  passive3Cost = 15000;
  passive4Cost = 50000;
  passive5Cost = 100000;
  passive6Cost = 250000;
  passive7Cost = 1000000;
  passive8Cost = 15000000;
  passive9Cost = 50000000;
  passive10Cost = 100000000;
  passiveIncomeRate1 = 0;
  passiveIncomeRate2 = 0;
  passiveIncomeRate3 = 0;
  passiveIncomeRate4 = 0;
  passiveIncomeRate5 = 0;
  passiveIncomeRate6 = 0;
  passiveIncomeRate7 = 0;
  passiveIncomeRate8 = 0;
  passiveIncomeRate9 = 0;
  passiveIncomeRate10 = 0;
  flag = 1;

  var plantImg = document.getElementById('clicker');
  plantImg.classList.remove('plantLvl2', 'plantLvl3', 'plantLvl4', 'plantLvl5');
  plantImg.classList.add('plantLvl1');
  
  // Update displays
  updateScoreDisplay();
  updateMultiplierDisplay();
  updateUpgradeCosts();
  applyPassiveIncome();

  // Reset and save the state to cookies
  deleteCookie('score');
  deleteCookie('multiplier');
  deleteCookie('upgrade1Cost');
  deleteCookie('upgrade2Cost');
  deleteCookie('upgrade3Cost');
  deleteCookie('upgrade4Cost');
  deleteCookie('upgrade5Cost');
  deleteCookie('lvlUpCost');
  deleteCookie('passive1Cost');
  deleteCookie('passive2Cost');
  deleteCookie('passive3Cost');
  deleteCookie('passive4Cost');
  deleteCookie('passive5Cost');
  deleteCookie('passive6Cost');
  deleteCookie('passive7Cost');
  deleteCookie('passive8Cost');
  deleteCookie('passive9Cost');
  deleteCookie('passive10Cost');
  deleteCookie('passive11Cost');
  deleteCookie('passive12Cost');
  deleteCookie('passiveIncomeRate1');
  deleteCookie('passiveIncomeRate2');
  deleteCookie('passiveIncomeRate3');
  deleteCookie('passiveIncomeRate4');
  deleteCookie('passiveIncomeRate5');
  deleteCookie('passiveIncomeRate6');
  deleteCookie('passiveIncomeRate7');
  deleteCookie('passiveIncomeRate8');
  deleteCookie('passiveIncomeRate9');
  deleteCookie('passiveIncomeRate10');
  deleteCookie('flag');
  setCookie('multiplier', multiplier, 7);
  setCookie('upgrade1Cost', upgrade1Cost, 7);
  setCookie('upgrade2Cost', upgrade2Cost, 7);
  setCookie('upgrade3Cost', upgrade3Cost, 7);
  setCookie('upgrade4Cost', upgrade4Cost, 7);
  setCookie('upgrade5Cost', upgrade5Cost, 7);
  setCookie('lvlUpCost', lvlUpCost, 7);
  setCookie('passive1Cost', passive1Cost, 7);
  setCookie('passive2Cost', passive2Cost, 7);
  setCookie('passive3Cost', passive3Cost, 7);
  setCookie('passive4Cost', passive4Cost, 7);
  setCookie('passive5Cost', passive5Cost, 7);
  setCookie('passive6Cost', passive6Cost, 7);
  setCookie('passive7Cost', passive7Cost, 7);
  setCookie('passive8Cost', passive8Cost, 7);
  setCookie('passive9Cost', passive9Cost, 7);
  setCookie('passive10Cost', passive10Cost, 7);
  setCookie('passiveIncomeRate1', passiveIncomeRate1, 7);
  setCookie('passiveIncomeRate2', passiveIncomeRate2, 7);
  setCookie('passiveIncomeRate3', passiveIncomeRate3, 7);
  setCookie('passiveIncomeRate4', passiveIncomeRate4, 7);
  setCookie('passiveIncomeRate5', passiveIncomeRate5, 7);
  setCookie('passiveIncomeRate6', passiveIncomeRate6, 7);
  setCookie('passiveIncomeRate7', passiveIncomeRate7, 7);
  setCookie('passiveIncomeRate8', passiveIncomeRate8, 7);
  setCookie('passiveIncomeRate9', passiveIncomeRate9, 7);
  setCookie('passiveIncomeRate10', passiveIncomeRate10, 7);
  setCookie('flag', flag, 7);
  location.reload();
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// AUDIO FUNCTION //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

function randomClickSound() {
  const sounds = [
    'sfx/click1.mp3',
    'sfx/click2.mp3',
    'sfx/click3.mp3',
    'sfx/click4.mp3',
    'sfx/click5.mp3'
  ];
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const audio = new Audio(sounds[randomIndex]);
  audio.play();
}

var bgMusic = new Audio('sfx/bgMusic.mp3');
function bgMusicOn() {
  bgMusic.play();
}

function bgMusicOff() {
  bgMusic.pause();
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// BUY UPGRADES ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


function buyUpgrade1() {
  if (score >= upgrade1Cost) {
    playAudio('sfx/purchase.mp3');
    score -= upgrade1Cost;
    multiplier += 1;
    upgrade1Cost *= 1.3; // Increase the cost for the next purchase
    setCookie('multiplier', multiplier, 7); // Save updated multiplier
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade1Cost', upgrade1Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('upgrade1').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('upgrade1').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyUpgrade2() {
  if (score >= upgrade2Cost) {
    playAudio('sfx/purchase.mp3');
    score -= upgrade2Cost;
    multiplier += 2;
    upgrade2Cost *= 2;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade2Cost', upgrade2Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('upgrade2').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('upgrade2').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyUpgrade3() {
  if (score >= upgrade3Cost) {
    playAudio('sfx/purchase.mp3');
    score -= upgrade3Cost;
    multiplier += 3;
    upgrade3Cost *= 2.5;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade3Cost', upgrade3Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('upgrade3').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('upgrade3').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyUpgrade4() {
  if (score >= upgrade4Cost) {
    playAudio('sfx/purchase.mp3');
    score -= upgrade4Cost;
    multiplier += 5;
    upgrade4Cost *= 2.5;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade4Cost', upgrade4Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('upgrade4').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('upgrade4').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyUpgrade5() {
  if (score >= upgrade5Cost) {
    playAudio('sfx/purchase.mp3');
    score -= upgrade5Cost;
    multiplier += 25;
    upgrade5Cost *= 2.5;
    setCookie('multiplier', multiplier, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
    setCookie('upgrade5Cost', upgrade5Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('upgrade5').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('upgrade5').classList.remove('bounceWobble');
    }, 100);
  }
}

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PASSIVE INCOME ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function buyPassive1() {
  if (score >= passive1Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive1Cost;
    passiveIncomeRate1 += 5; // Increase passive income rate
    passive1Cost *= 1.2; // Increase the cost for the next purchase

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate1', passiveIncomeRate1, 7);
    setCookie('passive1Cost', passive1Cost, 7); // Save updated cost
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive1').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive1').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive2() {
  if (score >= passive2Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive2Cost;
    passiveIncomeRate2 += 75; // Increase passive income rate more significantly
    passive2Cost *= 1.5;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate2', passiveIncomeRate2, 7);
    setCookie('passive2Cost', passive2Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive2').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive2').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive3() {
  if (score >= passive3Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive3Cost;
    passiveIncomeRate3 += 250; // Even more significant increase
    passive3Cost *= 2;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate3', passiveIncomeRate3, 7);
    setCookie('passive3Cost', passive3Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive3').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive3').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive4() {
  if (score >= passive4Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive4Cost;
    passiveIncomeRate4 += 1000; // Even more significant increase
    passive4Cost *= 2.2;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate4', passiveIncomeRate4, 7);
    setCookie('passive4Cost', passive4Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive4').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive4').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive5() {
  if (score >= passive5Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive5Cost;
    passiveIncomeRate5 += 5000; // Even more significant increase
    passive5Cost *= 2.5;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate5', passiveIncomeRate5, 7);
    setCookie('passive5Cost', passive5Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive5').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive5').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive6() {
  if (score >= passive6Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive6Cost;
    passiveIncomeRate6 += 75000; // Even more significant increase
    passive6Cost *= 3;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate6', passiveIncomeRate6, 7);
    setCookie('passive6Cost', passive6Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive6').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive6').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive7() {
  if (score >= passive7Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive7Cost;
    passiveIncomeRate7 += 250000; // Even more significant increase
    passive7Cost *= 3.2;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate7', passiveIncomeRate7, 7);
    setCookie('passive7Cost', passive7Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive7').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive7').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive8() {
  if (score >= passive8Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive8Cost;
    passiveIncomeRate8 += 500000; // Even more significant increase
    passive8Cost *= 3.5;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate8', passiveIncomeRate8, 7);
    setCookie('passive8Cost', passive8Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive8').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive8').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive9() {
  if (score >= passive9Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive9Cost;
    passiveIncomeRate9 += 1000000; // Even more significant increase
    passive9Cost *= 4;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate9', passiveIncomeRate9, 7);
    setCookie('passive9Cost', passive9Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive9').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive9').classList.remove('bounceWobble');
    }, 100);
  }
}

function buyPassive10() {
  if (score >= passive10Cost) {
    playAudio('sfx/purchase.mp3');
    score -= passive10Cost;
    passiveIncomeRate10 += 10000000; // Even more significant increase
    passive10Cost *= 4.2;

    updateScoreDisplay();
    updateUpgradeCosts();
    updatePassiveCPS();
    setCookie('passiveIncomeRate10', passiveIncomeRate10, 7);
    setCookie('passive10Cost', passive10Cost, 7);
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('passive10').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('passive10').classList.remove('bounceWobble');
    }, 100);
  }
}

// Ensure the passive income rates are applied
function applyPassiveIncome() {
  if (passiveIncomeRate1 + passiveIncomeRate2 + passiveIncomeRate3 + passiveIncomeRate4 + passiveIncomeRate5 + passiveIncomeRate6 + passiveIncomeRate7 + passiveIncomeRate8 + passiveIncomeRate9 + passiveIncomeRate10 > 0) {
    playAudio('sfx/click1.mp3');
    score += passiveIncomeRate1 + passiveIncomeRate2 + passiveIncomeRate3 + passiveIncomeRate4 + passiveIncomeRate5 + passiveIncomeRate6 + passiveIncomeRate7 + passiveIncomeRate8 + passiveIncomeRate9 + passiveIncomeRate10;
    updateScoreDisplay();
    updatePassiveCPS();
  }
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

  let savedPassive4Cost = getCookie('passive4Cost');
  if (savedPassive4Cost) {
    passive4Cost = parseInt(savedPassive4Cost, 10);
  }
  let savedPassive5Cost = getCookie('passive5Cost');
  if (savedPassive5Cost) {
    passive5Cost = parseInt(savedPassive5Cost, 10);
  }
  let savedPassive6Cost = getCookie('passive6Cost');
  if (savedPassive6Cost) {
    passive6Cost = parseInt(savedPassive6Cost, 10);
  }
  let savedPassive7Cost = getCookie('passive7Cost');
  if (savedPassive7Cost) {
    passive7Cost = parseInt(savedPassive7Cost, 10);
  }
  let savedPassive8Cost = getCookie('passive8Cost');
  if (savedPassive8Cost) {
    passive8Cost = parseInt(savedPassive8Cost, 10);
  }
  let savedPassive9Cost = getCookie('passive9Cost');
  if (savedPassive9Cost) {
    passive9Cost = parseInt(savedPassive9Cost, 10);
  }
  let savedPassive10Cost = getCookie('passive10Cost');
  if (savedPassive10Cost) {
    passive10Cost = parseInt(savedPassive10Cost, 10);
  }

  // Don't forget to update the display of costs for these new passive upgrades
  updateUpgradeCosts();
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// LEVEL UP ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

var flag = 1;

function lvl_up() {
  var plantImg = document.getElementById('clicker');
  if (score >= lvlUpCost) {
    flag += 1;
    score -= lvlUpCost;
    lvlUpCost *= 10;
    multiplier *=5;
    playAudio('sfx/levelUp.wav');
    setCookie('multiplier', multiplier, 7);
    setCookie('lvlUpCost', lvlUpCost, 7);
    setCookie('flag', flag, 7);
    updateScoreDisplay();
    updateUpgradeCosts();
    updateMultiplierDisplay();
  } else {
    playAudio('sfx/nope.wav');
    document.getElementById('lvl_up').classList.add('bounceWobble');

    setTimeout(() => {
      document.getElementById('lvl_up').classList.remove('bounceWobble');
    }, 100);
  }
  if (flag === 2) {
    plantImg.classList.replace('plantLvl1','plantLvl2');
  }
  if (flag === 3) {
    plantImg.classList.replace('plantLvl2','plantLvl3');
  }
  if (flag === 4) {
    plantImg.classList.replace('plantLvl3','plantLvl4');
  }
  if (flag >= 5) {
    plantImg.classList.replace('plantLvl4','plantLvl5');
    document.getElementById('lvl_up').textContent = "5x Clicker Multiplier " + formatNumber(lvlUpCost);
  }
}

function updateImageBasedOnFlag(flag) {
  var plantImg = document.getElementById('clicker');
  plantImg.className = '';  // Clear existing classes
  plantImg.classList.add('plantLvl' + flag); // Assuming class names like plantLvl1, plantLvl2, etc.
  console.log('Image class set to:', plantImg.className);
}

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// POWER UP ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function showPowerUp() {
  const powerUp = document.createElement('img');
  powerUp.src = '/plant-clicker/images/GoldenFlowerCoin.png'; // Update path
  powerUp.setAttribute('onclick', 'playAudio("sfx/goldCoin.wav")');
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

// Show the power-up randomly once every 10 min
setInterval(showPowerUp, 6000000);
