import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
import { AbstractValidator } from 'fluent-ts-validator';
import IIndexerCliValidator from '../Interface/IIndexerCliValidator';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class IndexerCliValidator extends AbstractValidator<IndexRequest> implements IIndexerCliValidator {

    constructor() {
        super();
    }
    ValidateIndexRequest(indexRequest: IndexRequest, ownerAddress: string) {

        this.validateIf(cli => cli.Content)
            .isNotEmpty()
            .withFailureMessage("Content must not be empty");

        this.validateIf(cli => ownerAddress)
            .isNotEmpty()
            .withFailureMessage("Address must not be empty");

        return this.validate(indexRequest);
    }
}