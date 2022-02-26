export enum AppErrorCode {
    OK = 0,
    ServerInternalError = 1,
    UnAuth = 2,
    DATA_ACCESS = 3,
    TIME_OUT = 4,
    REQUEST_FMT = 5,
    USER_NO_EXIST = 6,
    // 没有被路由对应 / 没有处理相关请求的能力
    NO_ACCEPTED = 7,
    // blog发生缺页情况
    BLOG_LOSE_PAGE = 8,
    // 未找到指定id的blog
    BLOG_NOT_FOUND = 9,
    COMMENT_AUTHOR_NO_EXIST = 10,
    COMMENT_AUTHOR_BAD_ID = 11,
    BLOG_AUTHOR_NO_EXIST = 12,
    BLOG_AUTHOR_BAD_ID = 13,
    FEED_BACK_TO_NULL_BLOG = 14,
    FEED_BACK_TO_NULL_COMMENT= 15,
    POST_CODE_NO_CORR = 16,
    UnKnown = 305
};
const GetResponseByDefinedCode = <T>( errorCode: AppErrorCode, payload: T ) => { return { errorCode, payload } };
export const GetOKResponse = <T>( payload: T ):AppResponse<T> => GetResponseByDefinedCode<T>( AppErrorCode.OK, payload );
export const GetInternalErrorResponse = <T>( payload: T ):AppResponse<T> => GetResponseByDefinedCode<T>( AppErrorCode.ServerInternalError, payload );
class AppResponse<T> {
    errorCode: AppErrorCode;
    payload: T;
    constructor( errorCode: AppErrorCode, payload: T ) {
        this.errorCode = errorCode;
        this.payload = payload;
    };
};
export default AppResponse;