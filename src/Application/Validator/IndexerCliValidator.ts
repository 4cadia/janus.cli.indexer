import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
import { AbstractValidator } from 'fluent-ts-validator';
import IIndexerCliValidator from '../Interface/IIndexerCliValidator';
import { injectable, inject } from 'tsyringe';
import SpiderConfig from 'janusndxr/dist/src/Domain/Entity/SpiderConfig';

@injectable()
export default class IndexerCliValidator extends AbstractValidator<IndexRequest> implements IIndexerCliValidator {

    constructor(@inject("SpiderConfig") private _spiderConfig: SpiderConfig) {
        super();
    }
    ValidateIndexRequest(indexRequest: IndexRequest, ownerAddress: string) {

        this.validateIf(cli => cli.Content)
            .isNotEmpty()
            .withFailureMessage("Content must not be empty");

        this.validateIf(cli => ownerAddress)
            .isNotEmpty()
            .withFailureMessage("Address must not be empty");

        this.validateIf(cli => this._spiderConfig.PrivateKey)
            .isNotEmpty()
            .withFailureMessage("Private Key must not be empty");

        return this.validate(indexRequest);
    }
}