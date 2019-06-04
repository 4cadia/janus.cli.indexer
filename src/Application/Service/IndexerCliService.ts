import { injectable, inject } from "tsyringe";
import IIndexerCliService from "../Interface/IIndexerCliService";
import IndexRequest from "janusndxr/dist/src/Domain/Entity/IndexRequest";
import IndexedFile from "janusndxr/dist/src/Domain/Entity/IndexedFile";
import IIndexerCliValidator from "../Interface/IIndexerCliValidator";
import Spider from "janusndxr";

@injectable()
export default class IndexerCliService implements IIndexerCliService {
    constructor(@inject("IIndexerCliValidator") private _indexerCliValidator: IIndexerCliValidator) {
    }
    AddContent(web3Provider: any, indexRequest: IndexRequest, callback: any) {
        let indexResult = new IndexedFile();
        let validationResult = this._indexerCliValidator.ValidateIndexRequest(indexRequest, indexRequest.Address);
        indexResult.Success = validationResult.isValid();
        indexResult.Errors = validationResult.getFailureMessages();
        if (!indexResult.Success)
            return callback(indexResult);

        let spider = new Spider(web3Provider);
        spider.AddContent(indexRequest, indexResult => {
            callback(indexResult);
        });
    }
}