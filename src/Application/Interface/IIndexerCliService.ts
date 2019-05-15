import IndexRequest from "janusndxr/dist/src/Domain/Entity/IndexRequest";

export default interface IIndexerCliService {
    AddContent(indexRequest: IndexRequest, ownerAddress: string, callback: any);
}