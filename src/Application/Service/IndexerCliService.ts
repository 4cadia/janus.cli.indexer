import { injectable, inject } from "tsyringe";
import IIndexerCliService from "../Interface/IIndexerCliService";
import SpiderConfig from "janusndxr/dist/src/Domain/Entity/SpiderConfig";
import IndexRequest from "janusndxr/dist/src/Domain/Entity/IndexRequest";
import IndexedFile from "janusndxr/dist/src/Domain/Entity/IndexedFile";
import IIndexerCliValidator from "../Interface/IIndexerCliValidator";
import Spider from "janusndxr";

@injectable()
export default class IndexerCliService implements IIndexerCliService {
    constructor(@inject("SpiderConfig") private _spiderConfig: SpiderConfig,
        @inject("IIndexerCliValidator") private _indexerCliValidator: IIndexerCliValidator) {
    }
    AddContent(indexRequest: IndexRequest, ownerAddress: string, callback: any) {
        let indexResult = new IndexedFile();
        let validationResult = this._indexerCliValidator.ValidateIndexRequest(indexRequest, ownerAddress);
        indexResult.Success = validationResult.isValid();
        indexResult.Errors = validationResult.getFailureMessages();
        if (!indexResult.Success)
            return callback(indexResult);

        let spider = new Spider(ownerAddress, this._spiderConfig);
        spider.AddContent(indexRequest, indexResult => {
            callback(indexResult);
        });
    }
}