#! /usr/bin/env node
console.log("======== Number Guessing Game ========")
import inquirer from "inquirer";
const random_number = Math.floor(Math.random() * 6 + 1);
console.log("Guess a number between 1 to 6");

let max_attempts;
const difficulty = await inquirer.prompt([
    {
        type: 'list',
        name: 'level',
        message: 'Please select your desired difficulty level:',
        choices: ['Easy', 'Medium', 'Hard'],
    },
]);
if (difficulty.level === 'Easy') {
    max_attempts = 6;
} else if (difficulty.level === 'Medium') {
    max_attempts = 4;
} else {
    max_attempts = 3;
}

while (max_attempts > 0) {
    const answer = await inquirer.prompt([
        {
            type: 'number',
            name: 'user_guess_number',
            message: `You have ${max_attempts} attempts. Please guess a number:`,
        }
    ]);

    if (answer.user_guess_number === random_number) {
        console.log("Congratulations, you guessed it right !");
        break;
    } else {
        console.log("You guessed it wrong.");
        max_attempts--;
        if (max_attempts === 0) {
            console.log(`Sorry! You've lost all attempts. The correct number was ${random_number}.`);
            const ask = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'response',
                    message: 'Do you want to Continue or Exit?',
                    choices: ['Continue', 'Exit']
                }
            ]);
            if (ask.response === 'Exit') {
                console.log('Goodbye!');
                process.exit(0);
            } else {
                max_attempts = 6;
            }
        }
    }
}
