const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const api              = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

let question = [
    {
    type:   "input",
    name:   "username",
    message:"What is your GitHub user name?"
    }
];

let sections = [
  {
    type:    "input",
    name:    "title",
    message: "What is the tile of your project?"
  },
  {
    type:    "input",
    name:    "description",
    message: "What is your project about?"
  },
  {
    type:    "input",
    name:    "table of content",
    message: "Describe the Content of your project."
  },
  {
    type:    "input",
    name:    "installation",
    message: "Briefly describe the method of installation."
  },
  {
    type:    "input",
    name:    "usage",
    message: "What is the purpose of your project?"
  },
  {
    type:    "input",
    name:    "license",
    message: "What license are you using?"
  },
  {
    type:    "input",
    name:    "contributing",
    message: 'List the name(s) of your collaborator(s). Otherwise, press ENTER.'
  },
  {
    type:    "input",
    name:    "tests",
    message: "Briefly describe your tests. Otherwise, press ENTER."
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
            choices: "repoNamesStr"
          }
        );
        console.log(response.username); 
        });
    });
}

init();


 