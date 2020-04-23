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
  for (let index = 0; index < fileName.length; i++) {
    console.log(`Creating "${fileName[i]}" file`)

    fs.writeFileSync(path.join(process.cwd(), fileName[i]), data[i], function(err){
      if (err) {
        console.log(err);
      }
    });
    console.log(`"${fileName[i]}" file created!`); 
  } 
}

function init() {
  inquirer.prompt(questions[0]).then( (response_Q0) => {
    api.getUser(response_Q0.username).then((resUser) => {
      // console.log("Response.Data = ", resUser.data);

      api.getRepository(response_Q0.username).then((resRepo) => {
        const repoNames = resRepo.data.map((repository) => repository.name);
        // console.log("Chosen One: ", resRepo.data);

        if (repoNames.length > 0) {
          // Put ALL repositories as options to the user
          questions.push( 
            {
              type:    "list",
              name:    "repolist",
              message: 'Please, choose 1 (one) repository to create your new "Readme.md" file:',
              choices: repoNames
            }
          );

          inquirer.prompt(questions[questions.length - 1]).then( (response_Q1) => {
            // console.log(`Data from Chosen One: ${resRepo.data[questions[questions.length - 1].choices.indexOf(response_Q1.repolist)].name}`);
            inquirer.prompt(requirements).then( (responseRequirements) => {
              writeToFile(generateMarkdown(resUser.data, resRepo.data[questions[questions.length - 1].choices.indexOf(response_Q1.repolist)], responseRequirements, repoNames), "README.md", `${resUser.data.login}.pdf`);
            });
          });
        }
        else
          console.log(`WARNING: "${response_Q0.username}" does not have a repository.`);
      });
    });
  });
}

    // inquirer
    // .prompt(question).then(function(response) 
    // {const queryUrl = `https://api.github.com/users/${username}`;
    //   axios.get(queryUrl).then(function(res) {
    //     console.log("Response.Data = ", res.data);
    //     const repoNames = res.data.map(function(repo) {
    //       return repo.name;
    //     });
    //     const repoNamesStr = repoNames.join("\n");
    //     questions.push(
    //       {
    //         type: "list",
    //         message: "Choose your repository: ",
    //         name: "repository",
    //         choices: "repoNamesStr"
    //       }
    //     );
    //     console.log(response.username); 
    //     });
    // });
}

init();


 