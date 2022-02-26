import { configure } from "mobx";
import ViewedBlogList from './resource/blog';
import PersonInfo from "./resource/person-info";
import { ViewedBlogDetail } from './resource/blog';

configure( { enforceActions: "observed" } );
const blogList = new ViewedBlogList();
const blogDetail = new ViewedBlogDetail();
const personInfo = new PersonInfo();
export const VIEWED_BLOG_LIST_MOBX_KEY = "blogList";
export const VIEWED_BLOG_DETAIL_MOBX_KEY = "viewedblogdetail";
export const PERSON_INFO_MOBX_KEY = "personInfo";
const stores = { 
    [VIEWED_BLOG_LIST_MOBX_KEY]: blogList, 
    [VIEWED_BLOG_DETAIL_MOBX_KEY]: blogDetail,
    [PERSON_INFO_MOBX_KEY]: personInfo 
};

export default stores;