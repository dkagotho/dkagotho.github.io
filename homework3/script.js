var generateBtn = document.querySelector("#generate");

var randomFunction = {
  symbol: getRandomSymbol,
  number: getRandomNumber,
  lower: getRandomLower,
  upper: getRandomUpper
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const Symbols = "?>@#$%^&*()<?.,/]\[=]/";
  return Symbols[Math.floor(Math.random() * Symbols.length)];
}

//this is my object
var criteria = {
  passwordLength: 0,
  hasLowercase: false,
  hasUppercase: false,
  hasNumber: false,
  hasSpecialCharacter: false
}

function getCriteria() {
  getLength();
  includeLowercase();
  includeUppercase();
  includeNumber();
  includeSpecialCharacter();
}

function clearCriteria() {
  criteria = {
    passwordLength: 0,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialCharacter: false
  }
}

function getLength() {
  var passwordLength = prompt("How long would you like your password to be?")

  if (passwordLength >= 8 && passwordLength <= 128) {
    criteria.passwordLength = passwordLength;
  } else {
    alert("Please pick a password length of between 8 and 128?");
    //Now let's go right back
    getLength();
  }
}

function includeLowercase() {
  if (confirm("would you like to have lowercase alphabet in your password?")) {
    criteria.hasLowercase = true;
  }
}

function includeUppercase() {
  if (confirm("would you like to have uppercase alphabet in your password?")) {
    criteria.hasUppercase = true;
  }
}

function includeNumber() {
  if (confirm("would you like to have a number in your password?")) {
    criteria.hasNumber = true;
  }
}

function includeSpecialCharacter() {
  if (confirm("would you like to have special character in your password?")) {
    criteria.hasSpecialCharacter = true;
  }
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  console.log(password);
  passwordText.value = password;
  alert("Here is your password: " + password);
}

function generatePassword() {
  //Let's first fill up our criteria	
  getCriteria();

  if (criteria.hasLowercase || criteria.hasUppercase || criteria.hasNumber || criteria.hasSpecialCharacter) {
    //Okay, we have at least one criteria  
    var password = buildPassword();

    //Let's clear the criteria object so that we don't have to reload the page
    clearCriteria();

    //TODO: All this "alert"ing is really annoying. Should probably think of putting in check-boxes next time
    return password;
  } else {
    alert("Please pick at least one criteria for your password");
    //Now let's go right back
    generatePassword();
  }
}

function buildPassword() {
  //Let's build up a long string "initialPassword" with the required criteria
  var initialPassword = "";

  if (criteria.hasLowercase) {
    for (var index = 0; index < criteria.passwordLength; index++) {
      initialPassword += randomFunction.lower();
    }
  }
  if (criteria.hasUppercase) {
    for (var index = 0; index < criteria.passwordLength; index++) {
      initialPassword += randomFunction.upper();
    }
  }
  if (criteria.hasNumber) {
    for (var index = 0; index < criteria.passwordLength; index++) {
      initialPassword += randomFunction.number();
    }
  }
  if (criteria.hasSpecialCharacter) {
    for (var index = 0; index < criteria.passwordLength; index++) {
      initialPassword += randomFunction.symbol();
    }
  }

  //Now let's randomly pick the required number of characters from "initialPassword"
  var password = "";
  for (var index = 0; index < criteria.passwordLength; index++) {
    password += initialPassword.charAt(Math.floor(Math.random() * initialPassword.length));
  }

  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)

