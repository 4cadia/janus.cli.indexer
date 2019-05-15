#!/usr/bin/env node
import "reflect-metadata";
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const program = require("commander");
import jsonConfig from "../spiderconfig.json";
import SpiderConfig from 'janusndxr/dist/src/Domain/Entity/SpiderConfig';
import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
import { ContentType } from 'janusndxr/dist/src/Domain/Entity/ContentType';
import Spider from 'janusndxr';

clear();
console.log(chalk.red(figlet.textSync('Janus-cli', { horizontalLayout: 'full' })));
program
    .version('1.0.0')
    .description("Janus CLI - Web3 Indexer")
    .option('-I, --ipfs <item>', 'Ipfs Hash of the item to be indexed')
    .option('-P, --path <item>', 'Path of the item to be indexed')
    .option('-A, --address <item>', 'Your ETH adress')
    .action(args => {
        let config = new SpiderConfig();
        config.RpcHost = jsonConfig.EthereumRpcHost;
        config.RpcPort = jsonConfig.EthereumRpcPort;
        config.ipfsHost = jsonConfig.IpfsRpcHost;
        config.ipfsPort = jsonConfig.IpfsRpcPort;
        config.indexerSmAbi = jsonConfig.indexerSmAbi;
        config.indexerSmAddress = jsonConfig.indexerSmAddress;

        let indexRequest = new IndexRequest();
        indexRequest.Content = "C:\\Users\\Victor Hugo Ramos\\Downloads\\Ipfs\\lua.html";
        indexRequest.ContentType = ContentType.FilePath;

        let spider = new Spider("0x0f0b73171eb91c502e10c93306c2b84596363f30", config);

        spider.AddContent(indexRequest, indexResult => {
            console.log(indexResult);
        });
    }).parse(process.argv);
console.log(program.helpInformation());