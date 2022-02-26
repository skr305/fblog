import AppResponse from '../../type/api/index';
import { BlogDisplayDetail, BlogDisplayMeta } from '../../type/blog';
import { GetOKResponse } from '../../type/api/index';
import { FrontUserInfoCache } from '../../type/user';
export const OKGetDefaultBlogList:AppResponse<Array<BlogDisplayMeta>> = GetOKResponse( [
    {
        ID: "233",
        authorID: "233",
        authorNick: "pureDog",
        authorAva: "dk",

        thumbCount: 233,
        starCount: 233,
        hasStared: true,
        hasThumbed: true,

        title: "东亚问题研究",
        postDate: "2021-03-12"
    }
] );
export const OKGetBlogDetail:AppResponse<BlogDisplayDetail> = GetOKResponse( {
    ID: "233",
    authorID: "233",
    authorNick: "pureDog",
    authorAva: "dk",

    content: "出门左转第一条马路牙子",
    thumbCount: 233,
    starCount: 233,
    hasStared: true,
    hasThumbed: true,

    title: "东亚问题研究",
    postDate: "2021-03-12",
    comments: []
} );
export const OKBlogUserLogin:AppResponse<FrontUserInfoCache> = GetOKResponse({
    userKey: "23333",
    userAva: "23333",
    userNick: "nickge",
    userID: "2333"
});