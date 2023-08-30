const inquirer = require('inquirer');
const questions = require('./questions.js')

function init() {
    console.log("Welcome to the department's records!");
    console.log("Would you like to add anything?\n");
    let keepAlive = true;
    
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log('Answered Choice: ');
        console.log(answers);
        if (answers.menu !== 'Quit') {
            init();
        }
    })
    

}

init();