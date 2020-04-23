const inquirer = require("inquirer");
const fs = require("fs");
const path     = require('path');
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

let question = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub user name?",
  },
];

let sections = [
  {
    type: "input",
    name: "title",
    message: "What is the tile of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "What is your project about?",
  },
  {
    type: "input",
    name: "table of content",
    message: "Describe the Content of your project.",
  },
  {
    type: "input",
    name: "installation",
    message: "Briefly describe the method of installation.",
  },
  {
    type: "input",
    name: "usage",
    message: "What is the purpose of your project?",
  },
  {
    type: "input",
    name: "license",
    message: "What license are you using?",
  },
  {
    type: "input",
    name: "contributing",
    message:
      "List the name(s) of your collaborator(s). Otherwise, press ENTER.",
  },
  {
    type: "input",
    name: "tests",
    message: "Briefly describe your tests. Otherwise, press ENTER.",
  },
];

function writeToFile(fileName, data) {
  for (let i = 0; i < fileName.length; i++) {
    console.log(`Creating "${fileName[i]}" file`);

    fs.writeFileSync(path.join(process.cwd(), fileName[i]), data[i], function (
      err
    ) {
      if (err) {
        console.log(err);
      }
    });
    console.log(`"${fileName[i]}" file created!`);
  }
}

function init() {
  inquirer.prompt(question[0]).then((responseQuestion) => {
    api.getUser(responseQuestion.username).then((resUser) => {
      api.getRepository(responseQuestion.username).then((resRepo) => {
        const repoNames = resRepo.data.map((repository) => repository.name);
        inquirer.prompt(sections).then( (responseSections) => {
            writeToFile(
              generateMarkdown(
                resUser.data,
                resRepo.data,
                responseSections,
                repoNames
              ),
              "README.md",
              `${resUser.data.login}.pdf`
            );
          
        });
      });
    });
  });
}
init();
