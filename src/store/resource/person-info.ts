import { makeAutoObservable } from 'mobx';
export enum BlogPersonRelationTypeEnum {
    THUMB = 0,
    COLLECT = 1,
    // this man own this blog and POST it to the website
    POST = 2
};
export type BlogPersonRelationType = {
    blogID: string,
    personID: string,
    relationType: BlogPersonRelationTypeEnum
};
export type RelatedBlogInfoType = {
    blogID: string,
    relationType: BlogPersonRelationTypeEnum
};
export default class PersonInfo {
    blogRelations: Array<RelatedBlogInfoType> = [];
    personKey: string = "";
    nick: string = "";
    constructor() {
        makeAutoObservable( this );
    }
};