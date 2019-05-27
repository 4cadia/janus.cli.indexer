#!/usr/bin/env node
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const program = require("commander");
import "reflect-metadata";
import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
import { ContentType } from 'janusndxr/dist/src/Domain/Entity/ContentType';
import Bootstrapper from "./Infra/IoC/Bootstrapper";
import IIndexerCliService from './Application/Interface/IIndexerCliService';
import MetaMaskConnector from "node-metamask";
import SpiderConfig from "janusndxr/dist/src/Domain/Entity/SpiderConfig";

clear();
let connector = new MetaMaskConnector({
    port: 3333,
});
console.log(chalk.red(figlet.textSync('Janus-cli', { horizontalLayout: 'full' })));
program
    .version('0.0.44')
    .description("Janus CLI - Web3 Indexer")
    .option('-C, --content <item>', 'Content to be indexed')
    .option('-T, --type <item>', 'Content type,must be "hash","file" or "folder"')
    .option('-A, --address <item>', 'Your ETH adress')
    .action(args => {
        if (!args.address)
            return console.log(program.helpInformation());
        let provider = connector.getProvider();
        Bootstrapper.RegisterServices(provider);
        let indexRequest = new IndexRequest();
        let indexerCliService = Bootstrapper.Resolve<IIndexerCliService>("IIndexerCliService");
        let config = Bootstrapper.Resolve<SpiderConfig>("SpiderConfig");
        indexRequest.Content = args.content;
        indexRequest.ContentType = <ContentType>args.type;
        console.log("Transaction sign in needed: http://localhost:3333");
        console.log();
        connector.start().then(() => {
            indexerCliService.AddContent(indexRequest, args.address, indexResult => {
                indexResult.forEach(file => {
                    console.log(`#File ${indexResult.indexOf(file)} - ${file.IpfsHash}`);
                    console.log(`IPFS: http://${config.ipfsHost}/ipfs/${file.IpfsHash}`);

                    if (file.IsHtml) {
                        console.log(`Transaction: https://rinkeby.etherscan.io/tx/${file.HtmlData.EthHash}`);
                        console.log(`Description: ${file.HtmlData.Description}`);
                        console.log(`Tags: ${file.HtmlData.Tags.join()}`);
                        console.log(`Title: ${file.HtmlData.Title}`);
                    }

                    if (!file.Success)
                        console.log(`Errors: ${file.Errors.join()}`);
                    console.log("\n");
                });
                process.exit();
            });
        });
    })
    .parse(process.argv);