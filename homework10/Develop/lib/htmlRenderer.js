const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];
  console.log(Object.values(employees));
  html.push(employees
    .filter(employee => employee.title === "Manager")
    .map(manager => renderManager(manager.name))
  );
  html.push(employees
    .filter(employee => employee.title === "Engineer")
    .map(engineer => renderEngineer(engineer.name))
  );
  html.push(employees
    .filter(employee => employee.title === "Intern")
    .map(intern => renderIntern(intern.name))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.name);
  template = replacePlaceholders(template, "role", manager.title);
  template = replacePlaceholders(template, "email", manager.email);
  template = replacePlaceholders(template, "id", manager.id);
  template = replacePlaceholders(template, "officeNumber", manager.officeNumber);
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.name);
  template = replacePlaceholders(template, "role", engineer.role);
  template = replacePlaceholders(template, "email", engineer.email);
  template = replacePlaceholders(template, "id", engineer.id);
  template = replacePlaceholders(template, "github", engineer.github);
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.name);
  template = replacePlaceholders(template, "role", intern.role);
  template = replacePlaceholders(template, "email", intern.email);
  template = replacePlaceholders(template, "id", intern.id);
  template = replacePlaceholders(template, "school", intern.school);
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
