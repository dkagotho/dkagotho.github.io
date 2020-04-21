const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");


let questions = [
    {
    type: "input",
    message: "What is your GitHub user name?",
    name: "username"
      }
];


function writeToFile(fileName, data) {
    
}

function init() {
    inquirer
    .prompt(questions).then(function(response) 
    {const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function(res) {
      console.log("Response.Data = ", res.data);
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });
      const repoNamesStr = repoNames.join("\n");
      questions.push(
        {
          type: "list",
          message: "Choose your repository: ",
          name: "repository",
          choices: repoNamesStr
        }
      );
    console.log(response.username); 
    });
}

init();


 