#!/usr/bin/env node

const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

console.log(chalk.yellow('Starting ................'));

if (process.argv.length < 3) {
  console.log(chalk.red('You have to provide a name to your app.'));
  console.log(chalk.red('For example :'));
  console.log(chalk.red('npx create-rn-redux-toolkit-boilerplate my-app'));
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = 'https://github.com/royvn612/create-rn-redux-toolkit-boilerplate';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(chalk.red(`The file ${projectName} already exist in the current directory, please give it another name.`));
  } else {
    console.log(chalk.red(err));
  }
  process.exit(1);
}

async function main() {
  try {
    console.log(chalk.yellow('Downloading files...'));
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);

    console.log(chalk.yellow('Installing dependencies...'));
    execSync('yarn install');

    execSync('npx rimraf ./.git');

    console.log(chalk.yellow('Next step: Rename your project. Run following cmd:'));
    console.log(chalk.yellow('npx react-native-rename "Hello World" -b com.yourorganization.helloword'));

    fs.rmdirSync(path.join(projectPath, 'bin'), {recursive: true});

    console.log(chalk.yellow('Completed!'));
  } catch (error) {
    console.log(chalk.red(error));
  }
}
main();
