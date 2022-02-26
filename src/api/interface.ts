import { FrontUserInfoCache } from '@/type/user';
import { BlogDisplayMeta, BlogDisplayDetail } from '../type/blog/index';
import Blog from '../server/src/entity/app-blog';
export const API_SERVER_PORT = 8088;
export const API_SERVER_DEFAULT = "/api";
export const API_AUTH_DEFAULT = "/auth";
export const API_UNAUTH_DEFAULT = "/unauth";
export type UploadMetaType = {
    token: string;
    key: string;
};
export const getAuthURL = ( url: string ) => {
    return `${API_SERVER_DEFAULT}${API_AUTH_DEFAULT}${url}`
}
export const getUnauthURL = ( url: string ) => {
    return `${API_SERVER_DEFAULT}${API_UNAUTH_DEFAULT}${url}`
}

export const API_CELL_LOGIN = "/login";
export const API_URL_LOGIN = getUnauthURL( API_CELL_LOGIN );
export type BlogLoginRequestType = {
    userID: string;
    pwd: string;
};
export type BlogLoginPayloadType = FrontUserInfoCache | BlogLoginErrorMark;
export enum BlogLoginErrorMark {
    INCORRECT = 1,
    // 保留码
    REMAINED = 2
}; 
export const API_CELL_REGISTER = "/register";
export const API_URL_REGISTER = getUnauthURL(API_CELL_REGISTER);
export type RegisterRequestType = {
    userID: string;
    pwd: string;
    nick: string;
};
export enum RegisterErrorMark {
    ID_EXIST = 3,
    // 保留码
    REMAINED = 4
}; 
export type RegisterResponseType = FrontUserInfoCache | RegisterErrorMark;
export const API_CELL_DEFAULT_BLOGLIST = "/default_bloglist";
export const API_URL_DEFAULT_BLOGLIST = getAuthURL( API_CELL_DEFAULT_BLOGLIST );
export type DefaultBlogListRequestType = {
};
export type DefaultBlogListResponseType = Array<BlogDisplayMeta>;

export const API_CELL_DEFAULT_DETAIL = "/default_detail";
export const API_URL_BLOG_DETAIL = getAuthURL(API_CELL_DEFAULT_DETAIL);
export type BlogDetailRequestType = {
    blogID: string;
};
export type BlogDetailResponseType = BlogDisplayDetail;
export const API_CELL_POST_COMMENT = "/post_comment";
export const API_URL_POST_COMMENT = getAuthURL(API_CELL_POST_COMMENT);
export type PostCommentRequestType = {
    content: string;
    blogID: string;
};
export type PostCommentResponseType = {
    done: boolean;
};
export const API_CELL_THUMB_BLOG = "/thumb_blog";
export const API_URL_THUMB_BLOG = getAuthURL( API_CELL_THUMB_BLOG );
export type ThumbBlogRequestType = {
    blogID: string;
};
export type ThumbBlogResponseType = {
    done: boolean;
};
export const API_CELL_STAR_BLOG = "/star_blog";
export const API_URL_STAR_BLOG = getAuthURL(API_CELL_STAR_BLOG);
export type StarBlogRequestType = {
    blogID: string;
};
export type StarBlogResponseType = {
    done: boolean;
};
export const API_CELL_THUMB_COMMENT = "/thumb_comment";
export const API_URL_THUMB_COMMENT = getAuthURL(API_CELL_THUMB_COMMENT);
export type ThumbCommentRequestType = {
    commentID: string;
};
export type ThumbCommentResponseType = {
    done: boolean;
};
// deprecated
export const API_CELL_THUMB_SECONDARY = "/thumb_secondary";
export const API_URL_THUMB_SECONDARY = getAuthURL(API_CELL_THUMB_SECONDARY);
export type ThumbSecondaryRequestType = {
    blogID: string;
    secondaryID: string;
};
export type ThumbSecondaryResponseType = {
    done: boolean;
};
export const API_CELL_REPLY_COMMENT = "/reply_comment";
export const API_URL_REPLY_COMMNET = getAuthURL(API_CELL_REPLY_COMMENT);
export type ReplyCommentRequestType = {
    commentID: string;
    content: string;
};
export type ReplyCommentResponseType = {
    done: boolean;
};
// token
export const API_CELL_GET_UPLOAD_TOKEN = "/get_upload_token";
export const API_URL_GET_UPLOAD_TOKEN = getUnauthURL( API_CELL_GET_UPLOAD_TOKEN );
export type GetUploadTokenRequestType = {};
export type GetUploadTokenResponseType = UploadMetaType;
// post blog
export const API_CELL_POST_BLOG = "/post_blog";
export const API_URL_POST_BLOG = getUnauthURL( API_CELL_POST_BLOG );
export type PostBlogRequestType = { title: string, content: string, postCode: string, userID: string };
export type PostBlogResponseType = Blog;
