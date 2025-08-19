#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";


let playerName;

const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'who wants to learn more about nuclear?'
    )

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        i am a process of your computer.
        if you get any question wrong i will be ${chalk.bgRed('obliterated from nuclear')}
        so get all the questions right... 
    `);
}



async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you die ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
        return 'Player';
    },
});

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats, ${playerName}!`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
        chalk.green(
            `you survived the holocaust and learnt more about nuclear. nuclear isn't as the media portrays; it's cleaner and more efficient than it sounds.`
        )
        );
        process.exit(0);
    });
}

async function question1() {
const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'what is the best source of energy?\n',
    choices: [
    'nuclear',
    'solar',
    'oil',
    'wind',
    ],
});

return handleAnswer(answers.question_1 === 'nuclear');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'why is nuclear the best source of energy?\n',
        choices: ['because it\'s clean', 'because it\'s unbothered by the weather', 'because it doesn\'t take up much space', 'all of the above'],
    });

    return handleAnswer(answers.question_2 === 'all of the above');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `What is the equivalent of 1 uranium pallet?\n`,
        choices: ['gummy bear', '2 oil barrels', '1,000 cubic feet of methane gas', '50kg of coal'],
    });

    return handleAnswer(answers.question_3 == 'gummy bear'); 
    
}


async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'What is the land use for nuclear per kwh compared to solar of 19m^2 and onshore wind of 99m^2\n',
        choices: [
        '3m^2',
        '0.3m^2',
        '30m^2',
        '300m^2', 
        ],
    });

    return handleAnswer(answers.question_4 === '0.3m^2');
}

// async function question5() {
//     const answers = await inquirer.prompt({
//         name: 'question_5',
//         type: 'list',
//         message:
//         'JS is a high-level single-threaded, garbage-collected,\n' +
//         'interpreted(or just-in-time compiled), prototype-based,\n' +
//         'multi-paradigm, dynamic language with a ____ event loop\n',
//         choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
//     });

//     return handleAnswer(answers.question_5 === 'non-blocking');
// }

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
console.log(chalk.green('also equivalent to 3 oil barrels and 1 ton of coal!!'));
await question4();
// await question5();
winner();