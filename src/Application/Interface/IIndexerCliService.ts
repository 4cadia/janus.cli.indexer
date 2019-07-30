import IndexRequest from "janusndxr/dist/src/Domain/Entity/IndexRequest";

export default interface IIndexerCliService {
    AddContent(web3Provider: any, indexRequest: IndexRequest, callback: any);
}