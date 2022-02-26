import axios from '../util/axios';
import { AxiosResponse, Method } from 'axios';
import { getSession } from '../lib/event-zoo/util/storage';
import { FrontUserInfoCache } from '../type/user';
import { BLOG_USER_INFO } from '../constants/storage-section';
import AppResponse from '@/type/api';
/**
 * @param url 
 * @param param need to be plain Object 
 */
const request = <R, D>( url: string, data: D, method: Method = "POST" ):Promise<AppResponse<R>> => {
    const userInfoCache = getSession<FrontUserInfoCache>( BLOG_USER_INFO );
    let token = "";
    if( userInfoCache ) {
        token = userInfoCache.userKey;
    }
    return axios.request<any, AxiosResponse< AppResponse<R> >, D>( {
        url,
        data,
        method,
        headers: {
            token
        },
        // from plain Object to stardart format
        transformRequest:  [function (data) {
            let ret = ''
            for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    } ).then( ( res ) => {
        return res.data;
    } );
};
export default request;