#!/usr/bin/env node
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const program = require("commander");
clear();
console.log(chalk.red(figlet.textSync('Janus-cli', { horizontalLayout: 'full' })));
program
    .version('1.0.0')
    .description("Janus CLI - Web3 Indexer")
    .option('-I, --ipfs <item>', 'Ipfs Hash of the item to be indexed')
    .option('-P, --path <item>', 'Path of the item to be indexed')
    .option('-A, --address <item>', 'Your ETH adress')
    .action(args => {
        // args.address

    }).parse(process.argv);
console.log(program.helpInformation());