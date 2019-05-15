#!/usr/bin/env node
import "reflect-metadata";
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const program = require("commander");
import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
import { ContentType } from 'janusndxr/dist/src/Domain/Entity/ContentType';
import Bootstrapper from "./Infra/IoC/Bootstrapper";
import IIndexerCliService from './Application/Interface/IIndexerCliService';

clear();
console.log(chalk.red(figlet.textSync('Janus-cli', { horizontalLayout: 'full' })));
program
    .version('0.0.1')
    .description("Janus CLI - Web3 Indexer")
    .option('-C, --content <item>', 'Content to be indexed')
    .option('-T, --type <item>', 'Content type,must be "hash" or "path"')
    .option('-A, --address <item>', 'Your ETH adress')
    .action(args => {
        Bootstrapper.RegisterServices();
        let indexRequest = new IndexRequest();
        let indexerCliService = Bootstrapper.Resolve<IIndexerCliService>("IIndexerCliService");
        indexRequest.Content = args.content;
        indexRequest.ContentType = <ContentType>args.type;
        indexerCliService.AddContent(indexRequest, args.address, indexResult => {
            console.log(indexResult);
        });
    }).parse(process.argv);
console.log(program.helpInformation());