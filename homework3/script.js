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

function generatePassword(){
  
}
// Write password to the #password input
function writePassword() {
// console.log("enter to write function");

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

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
