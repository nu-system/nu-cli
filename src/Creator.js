const chalk = require("chalk");
const inquirer = require("inquirer");

function Creator() {
  // 存储命令行获取的数据，作为demo这里只要这两个；
  this.options = {
    // 作者名称
    author: "",
    // 组件类型
    componentType: "",
    // 组件名称
    componentName: ""
  };
  this.init();
}

// 初始化
Creator.prototype.init = function() {
  console.log(chalk.green(`\n👇 nu-cli start`));

  this.ask().then(answers => {
    this.options = Object.assign({}, this.options, answers);
    // 包名，也是文件夹的名字
    const dirName = `${
      this.options.componentType
    }-${this.options.componentName.toLowerCase()}`;
    const builder = require("./builder.js");
    console.log(`\n👉 [${dirName}] is building...`);
    builder(this.options, dirName)
      .then(() => {
        console.log(chalk.green(`\n👇 [${dirName}] build success`));
        console.log(
          `install: ${chalk.yellow(`cd ${dirName}`)} && ${chalk.yellow(
            "npm install"
          )}`
        );
        console.log(`start: ${chalk.yellow("npm start")}`);
        console.log(`build: ${chalk.yellow("npm build")} \n`);
      })
      .catch(err => {
        console.log(chalk.red(`\n❌ [${dirName}] build error`));
        console.log(chalk.red(err));
      });
  });
};

// 命令行交互
Creator.prototype.ask = function() {
  // 返回promise
  return inquirer.prompt([
    {
      type: "list",
      name: "componentType",
      message: "Select nu component type you wanna create:",
      choices: [
        { name: "CSS", value: "css" },
        { name: "React", value: "react" },
        { name: "HTML", value: "html" },
        { name: "Javascript", value: "js" },
        { name: "VUE", value: "vue" },
        { name: "React Native", value: "rn", disabled: true }
      ]
    },
    {
      name: "componentName",
      message: "Input component name:",
      validate(input) {
        if (!input) {
          return "Input component name";
        }
        const p = new RegExp(/^[a-zA-Z][a-zA-Z0-9]+/);
        if (!p.test(input)) {
          return "Component name only surport number and english words";
        }
        return true;
      }
    },
    {
      name: "author",
      message: "Input author name:",
      validate(input) {
        if (!input) {
          return "Input author name";
        }
        const p = new RegExp(/^[a-zA-Z][a-zA-Z0-9]+/);
        if (!p.test(input)) {
          return "Author name only surport number and english words";
        }
        return true;
      }
    }
  ]);
};

module.exports = Creator;
