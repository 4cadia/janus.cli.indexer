
import { container, InjectionToken } from "tsyringe";
import SpiderConfig from "janusndxr/dist/src/Domain/Entity/SpiderConfig";
import jsonConfig from "../../../spiderconfig.json";
import IndexerCliService from '../../Application/Service/IndexerCliService';
import IndexerCliValidator from '../../Application/Validator/IndexerCliValidator';

export default class Bootstrapper {
    static Resolve<T>(token: InjectionToken<T>): T {
        return container.resolve(token);
    }
    static RegisterServices(web3Provider: any) {

        let config = new SpiderConfig();
        config.RpcHost = jsonConfig.EthereumRpcHost;
        config.RpcPort = jsonConfig.EthereumRpcPort;
        config.ipfsHost = jsonConfig.IpfsRpcHost;
        config.ipfsPort = jsonConfig.IpfsRpcPort;
        config.indexerSmAbi = jsonConfig.indexerSmAbi;
        config.indexerSmAddress = jsonConfig.indexerSmAddress;
        config.Web3Provider = web3Provider;
        
        container.registerInstance("SpiderConfig", config);
        container.register("IIndexerCliService", {
            useClass: IndexerCliService
        });
        container.register("IIndexerCliValidator", {
            useClass: IndexerCliValidator
        });
        return container;
    }
}