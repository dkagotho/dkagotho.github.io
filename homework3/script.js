// Assignment Code
var generateBtn = document.querySelector("#generate");
var lengthEl = document.getElementById("lenght");
var upperCaseEl = document.getElementById("uppercase")

var randomFunction = {
  symbol: getRandomSymbol,
  number: getRandomNumber,
  lower: getRandomLower,
  upper: getRandomUpper,
}

//this is my object
var criteria = {
  passwordLength: 0,
  hasLowercase: false,
  hasUppercase: false,
  hasSpecialCharacter: false,
  hasNumber: false
}

function getCriteria(){
  getLength();
  includeLowercase();
  includeUppercase();
  includeSpecialCharacter();
  includeNumber();
}

function generatePassword(){
  getCriteria();
  if(criteria.hasLowercase || criteria.hasUppercase || criteria.hasSpecialCharacter || criteria.hasNumber)
  {
var password;
for (let index = 0; index < criteria.passwordLength.length; index++) {
  password += "lol"
  
}
password
  }
  else{
    alert("Please pick at least one criteria for your password");
    generatePassword();
  }
}

function getLength(){
  var passwordLength = prompt ("How long would you like your password to be?") 
    if (passwordLength >= 8 && passwordLength <= 128){
      criteria.passwordLength = passwordLength;
    }
    else {
      alert("Please pick a password length of between 8 and 128?");
      getLength();
    }
}

function includeLowercase(){
  if (confirm ("would you like to have lowercase alphabet in your password?")){
    criteria.hasLowercase = true;
  }
}

function includeUppercase(){
  if (confirm ("would you like to have uppercase alphabet in your password?")){
    criteria.hasUppercase = true;
  }
}

function includeSpecialCharacter(){
  if (confirm ("would you like to have special character in your password?")){
    criteria.hasSpecialCharacter = true;
  }
}

function includeNumber(){
  if (confirm ("would you like to have a number in your password?")){
    criteria.number = true;
  }
}

// Write password to the #password input
function writePassword() {
// console.log("enter to write function");

  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  console.log(password);
  passwordText.value = password;

}

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random()* 26)+ 97);
}


function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random()* 26)+ 65);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random()* 10)+ 48);
}

function getRandomSymbol(){
  const Symbols = "?>@#$%^&*()<?.,/]\[=]/";
  return Symbols[Math.floor(Math.random()*Symbols.length)];
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
