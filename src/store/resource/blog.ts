import { action, makeAutoObservable } from "mobx";
import { BlogDisplayMeta, BlogDisplayDetail, BlogComment, Starable, Thumbable, SecondaryComment } from '../../type/blog/index';
import { UserKeyType, FrontUserInfoCache } from '../../type/user';
import { getToggleChangeCount } from '../../comp/mini/togglable';
import idGenerator from '../../util/id-generator';
import { getSession } from '../../lib/event-zoo/util/storage';
import { BLOG_USER_INFO } from '../../constants/storage-section';
import moment from "moment";
import { YYYY_MM_DD } from '../../constants/time-format';
import request from '../../api/request';
import { ThumbBlogResponseType, ThumbBlogRequestType, API_URL_THUMB_BLOG, StarBlogResponseType, API_URL_STAR_BLOG, StarBlogRequestType, PostCommentResponseType, PostCommentRequestType, API_URL_POST_COMMENT, ThumbCommentResponseType, ThumbCommentRequestType, API_URL_THUMB_COMMENT, ReplyCommentResponseType, ReplyCommentRequestType, API_URL_REPLY_COMMNET } from '../../api/interface';

export type BlogContentType = string;
export type ViewedBlogListCoreDataType = Array<BlogDisplayMeta>;
export type ViewedBlogDetailCoreDataType = BlogDisplayDetail;
export const THUMB_OR_STAR_ACTION = {
    THUMB: "thumbBlog",
    STAR: "starBlog"
}
export const toggleStar = ( item: Starable ) => {
    item.hasStared = !item.hasStared;
    item.starCount += getToggleChangeCount( item.hasStared );
};  
export const toggleThumb = ( item: Thumbable ) => {
    item.hasThumbed = !item.hasThumbed;
    item.thumbCount += getToggleChangeCount( item.hasThumbed );
}
export default class ViewedBlogList {
    coreData: null | ViewedBlogListCoreDataType = null;
    constructor() {
        makeAutoObservable( this );
    }
    @action 
    initBlogList = ( initCoreData: ViewedBlogListCoreDataType) => {
        this.coreData = initCoreData;
    } 
    @action
    thumbBlog = ( blogIdx: number, userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogItem = this.coreData[blogIdx];
            toggleThumb( blogItem );
            request<ThumbBlogResponseType, ThumbBlogRequestType>( API_URL_THUMB_BLOG, { blogID: blogItem.ID } ); 
        }
    }
    @action
    starBlog = ( blogIdx: number, userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogItem = this.coreData[blogIdx];
            toggleStar( blogItem );
            request<StarBlogResponseType, StarBlogRequestType>( API_URL_STAR_BLOG, { blogID: blogItem.ID } ); 
        }
    }
};
export class ViewedBlogDetail {
    coreData: null | ViewedBlogDetailCoreDataType = null;
    constructor() {
        makeAutoObservable( this );
    } 
    @action
    initBlogDetail = ( initCoreData: ViewedBlogDetailCoreDataType ) => {
        this.coreData = initCoreData;
    }
    @action
    postComment = ( content: string, userKey: UserKeyType ) => {
        const userInfoCache = getSession<FrontUserInfoCache>( BLOG_USER_INFO );
        if( !userInfoCache ) {
            return;
        }
        if( !this.coreData ) {
            return;
        }
        // avoid fake invoke
        if( userKey === userInfoCache.userKey ) {
            const { userID, userNick, userAva } = userInfoCache;
            const posting: BlogComment = {
                ID: idGenerator(),
                content,
                authorID: userID,
                authorNick: userNick,
                authorAva: userAva,

                thumbCount: 0,
                hasThumbed: false,
                replys: [],
                postDate: moment( new Date() ).format( YYYY_MM_DD )
            };
            this.coreData.comments.unshift( posting );
            request<PostCommentResponseType, PostCommentRequestType>( API_URL_POST_COMMENT, { blogID: posting.ID, content: posting.content } ); 
        }
    };
    @action
    thumbBlog = ( userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogItem = this.coreData;
            toggleThumb( blogItem );
            request<ThumbBlogResponseType, ThumbBlogRequestType>( API_URL_THUMB_BLOG, { blogID: blogItem.ID } ); 
        }
    }
    @action
    starBlog = ( userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogItem = this.coreData;
            toggleStar( blogItem );
            request<StarBlogResponseType, StarBlogRequestType>( API_URL_STAR_BLOG, { blogID: blogItem.ID } ); 
        }
    }
    @action
    onThumbComment = ( commentIdx:number, userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogComments = this.coreData.comments;
            const commentEntity = blogComments[ commentIdx ];
            toggleThumb( commentEntity );
            request<ThumbCommentResponseType, ThumbCommentRequestType>( API_URL_THUMB_COMMENT, { commentID: commentEntity.ID } )
        }
    }
    @action
    onThumbSecondary = ( fIdx: number, sIdx: number, userKey: UserKeyType ) => {
        if( this.coreData ) {
            const blogComments = this.coreData.comments;
            const commentEntity = blogComments[ fIdx ]["replys"][sIdx];
            toggleThumb( commentEntity );
            request<ThumbCommentResponseType, ThumbCommentRequestType>( API_URL_THUMB_COMMENT, { commentID: commentEntity.ID } );
        }
    }
    @action
    onReplyComment = ( commentIdx: number, content: string, userKey: UserKeyType ) => {
        const userInfoCache = getSession<FrontUserInfoCache>( BLOG_USER_INFO );
        if( !userInfoCache ) {
            return;
        }
        if( !this.coreData ) {
            return;
        }
        // avoid fake invoke
        if( userKey === userInfoCache.userKey ) {
            const { userID, userNick, userAva } = userInfoCache;
            const posting: SecondaryComment = {
                ID: idGenerator(),
                content,
                authorID: userID,
                authorNick: userNick,
                authorAva: userAva,

                thumbCount: 0,
                hasThumbed: false,
                postDate: moment( new Date() ).format( YYYY_MM_DD )
            }; 
            const blogComments = this.coreData.comments;
            blogComments[commentIdx].replys.unshift( posting );
            request<ReplyCommentResponseType, ReplyCommentRequestType>( API_URL_REPLY_COMMNET, { commentID: blogComments[commentIdx].ID, content  } )
        }
    }
};