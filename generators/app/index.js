'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const lodash = require('lodash')

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      // yosay(`Welcome to the breathtaking ${chalk.red('generator-ahamgr')} generator!`)
      yosay(`Welcome to the ${chalk.red('ahamgr')} cli`)
    );
    var questions = [
      {
        type: 'input',
        name: 'projectName',
        message: 'please input your project name',
        default: 'ahamgr_' + this.user.git.name()
      }
      // {
      //   name: 'projectAssets',
      //   type: 'list',
      //   message: '请选择模板:',
      //   choices: [
      //     {
      //       name: 'PC模板',
      //       value: 'pc',
      //       checked: true   // 默认选中
      //     }, {
      //       name: 'Mobile模板',
      //       value: 'mobile'
      //     }
      //   ]
      // },
      // {
      //   type: 'input',
      //   name: 'projectName',
      //   message: '输入项目名称',
      //   default: this.appname
      // },
      // {
      //   type: 'input',
      //   name: 'projectAuthor',
      //   message: '项目开发者',
      //   store: true,   // 记住用户的选择
      //   default: 'huangxiaoyan'
      // }, {
      //   type: 'input',
      //   name: 'projectVersion',
      //   message: '项目版本号',
      //   default: '0.0.1'
      // }
    ]
    // const prompts = [
    //   {
    //     type: 'input',
    //     name: 'projectName',
    //     message: 'please input your project name',
    //     default: 'ahamgr_' + this.user.git.name()
    //   }
    // ];

    return this.prompt(questions).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var from = this.templatePath('ahamgr_template')
    var installDir = this.destinationPath()
    var to = this.destinationPath(this.props.projectName)
    // console.log('安装目录' + installDir + '项目目录' + to)
    // var isExists = this.fs.exists(to)
    var isExists = lodash.includes(installDir, this.props.projectName)
    // console.log(isExists)
    if (isExists) {
      console.log(`${to} already exist,please check !`)
      // setTimeout(() => {
      process.exit(1);
      // }, 2000);
      return false
    }
    this.fs.copy(
      from,
      to
    );
  }

  install() {
    // this.installDependencies();
  }

  end() {
    var to = this.destinationPath(this.props.projectName)
    console.log(`ok,you can work! your project dir is ${to}`)
  }
};
