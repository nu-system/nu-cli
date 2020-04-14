const chalk = require('chalk');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');

function Creator() {
  // 存储命令行获取的数据，作为demo这里只要这两个；
  this.options = {
    // 作者名称
    author: 'ziven27',
    // 组件类型
    componentType: 'css',
    // 组件名称
    componentName: 'hello'
  };
  this.init();
}
// 初始化
Creator.prototype.init = function () {
  console.log(chalk.green(`\n👇 nu-cli start`));
  this.ask().then((answers) => {
    this.options = Object.assign({}, this.options, answers);
    this.write();
  });
};
// 命令行交互
Creator.prototype.ask = function () {
  // 返回promise
  return inquirer.prompt([{
    type: 'list',
    name: 'componentType',
    message: 'Select component type:',
    choices: [
      { name: "CSS", value: 'css' },
      { name: "React", value: 'react' },
      { name: "HTML", value: 'html' },
      { name: "Javascript", value: 'js' },
      { name: "VUE", value: 'vue'},
      { name: "React Native", value: 'rn', disabled: true }
    ]
  }, {
    name: 'componentName',
    message: 'Input component name:',
    validate(input) {
      if (!input) {
        return 'input component name';
      }
      if (fse.existsSync(input)) {
        return 'the' + input + ' is exist';
      }
      return true;
    }
  }, {
    name: 'author',
    message: 'Input author name:',
  }]);
};

Creator.prototype.write = function () {
  const { componentType, componentName, author } = this.options;
  const dirName = `${componentType}-${componentName}`;

  console.log(`\n👉 [${dirName}] is building...`);

  // 获取当前命令的执行目录，注意和项目目录区分
  const cwd = process.cwd();
  const tplBuilder = require(`./builder/${componentType}.js`);
  tplBuilder && tplBuilder({
    data: this.options,
    dirRoot: path.resolve(__dirname, '../'),
    dirProject: path.join(cwd, dirName)
  }).then(() => {
    console.log(chalk.green(`\n👇 [${dirName}] build success`));
    console.log(`install: ${chalk.yellow(`cd ${dirName}`)} && ${chalk.yellow("npm install")}`);
    console.log(`start: ${chalk.yellow("npm start")}`);
    console.log(`build: ${chalk.yellow("npm build")} \n`);
  }).catch((err) => {
    console.log(chalk.red(`\n❌ [${dirName}] build error`));
    console.log(chalk.red(err));
  });
};

module.exports = Creator;