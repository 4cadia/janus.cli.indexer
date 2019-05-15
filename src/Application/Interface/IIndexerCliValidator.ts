import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest';
export default interface IIndexerCliValidator {
    ValidateIndexRequest(indexRequest: IndexRequest, ownerAddress: string);
}