
import { container, InjectionToken } from "tsyringe";
import SpiderConfig from "janusndxr/dist/src/Domain/Entity/SpiderConfig";
import IndexerCliService from '../../Application/Service/IndexerCliService';
import IndexerCliValidator from '../../Application/Validator/IndexerCliValidator';

export default class Bootstrapper {
    static Resolve<T>(token: InjectionToken<T>): T {
        return container.resolve(token);
    }
    static RegisterServices() {
        container.register("IIndexerCliService", {
            useClass: IndexerCliService
        });
        container.register("IIndexerCliValidator", {
            useClass: IndexerCliValidator
        });
        return container;
    }
}