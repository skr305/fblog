import { inject, observer } from "mobx-react";
import React, { useEffect, useCallback } from "react";
import { VIEWED_BLOG_LIST_MOBX_KEY } from '../../store/index';
import ViewedBlogList from "../../store/resource/blog";
import NoDataFound from '../../comp/tip/no-data-found';
import useAppLoading from '../../private-hooks/use-app-loading';
import { LOADING_MARK } from "../../App";
import { fakeSuccessRequest } from '../../util/fake-request';
import { OKGetDefaultBlogList } from "../../api/test-response/blog";
import useAppTip from '../../private-hooks/use-app-tip';
import { LOADING_DATA_ERROR } from '../../constants/app-tip-data';
import StarThumb from "../../comp/mini/star-thumb";
import { useContext } from 'react';
import { SessionSecuredControllerContext } from '../layout/index';
import { getSession } from '../../lib/event-zoo/util/storage';
import { FrontUserInfoCache, UserKeyType } from '../../type/user';
import { BLOG_USER_INFO } from '../../constants/storage-section';
import { eventZooEmit } from '../../lib/event-zoo/index';
import { PullBlogDetailCachesType, PullBlogDetail } from '../../constants/event-zoo-type';
import { useHistory } from 'react-router-dom';
import { BLOG_CONTENT_PATH } from '../../constants/router-path';
import { Card, CardActions, CardContent, Typography, Chip } from '@mui/material';
import request from '../../api/request';
import { DefaultBlogListResponseType, DefaultBlogListRequestType, API_URL_DEFAULT_BLOGLIST } from '../../api/interface';

export interface BlogListAppProps {
    [VIEWED_BLOG_LIST_MOBX_KEY]: ViewedBlogList
};
const BlogListApp:React.FC<BlogListAppProps> = ( props: BlogListAppProps ) => {
    const coreData = props[ VIEWED_BLOG_LIST_MOBX_KEY ].coreData;
    const [ openLoading, closeLoading ] = useAppLoading( LOADING_MARK.TOP_LOADING );
    const routerHistory = useHistory();
    const appTipController = useAppTip();
    const sessionSecurer = useContext( SessionSecuredControllerContext );
    // load the data to mobx store
    const initBlogData = useCallback( async () => {
        try {
            openLoading();
            const blogListData = ( await request<DefaultBlogListResponseType, DefaultBlogListRequestType>( API_URL_DEFAULT_BLOGLIST, {} ) ).payload;
            props[VIEWED_BLOG_LIST_MOBX_KEY].initBlogList( blogListData );
            closeLoading();
        } catch ( error ) {
            closeLoading();
            appTipController( LOADING_DATA_ERROR );
        }
    }, []);
    // for get thumb or star function generator
    const getFeedbackCarrier = ( carrierEntity: ( blogIdx: number, userKey: UserKeyType ) => void ) => {
        return ( blogIdx: number ) => {
            return sessionSecurer( () => {
                const userKey = getSession<FrontUserInfoCache>( BLOG_USER_INFO )?.userKey;
                if( userKey ) {
                    carrierEntity( blogIdx, userKey );
                }
            }); // router history not matters in up-floor comp
        }
    };
    const getToggleThumbCarrier = useCallback( getFeedbackCarrier( props[VIEWED_BLOG_LIST_MOBX_KEY].thumbBlog ), [ props[VIEWED_BLOG_LIST_MOBX_KEY] ] );
    const getToggleStarCarrier = useCallback( getFeedbackCarrier( props[VIEWED_BLOG_LIST_MOBX_KEY].starBlog ), [ props[VIEWED_BLOG_LIST_MOBX_KEY] ] );
    const onPullBlogDetail = useCallback(( blogID: string ) => {
        routerHistory.push( BLOG_CONTENT_PATH );
        eventZooEmit<any, PullBlogDetailCachesType>( PullBlogDetail, {}, { blogID } );
    }, []);
    useEffect( () => {
        initBlogData();
    }, [] );
    return ( 
        <>
            {
                coreData ?
                (
                    <div>
                        {
                            coreData.map( ( item, idx ) => {
                                const { starCount, thumbCount, hasStared, hasThumbed,
                                title, postDate, authorNick, ID } = item;
                                return (
                                    <Card key={ item.ID }> 
                                        <CardContent>
                                            <div onClick={ () => onPullBlogDetail( ID ) }>
                                                <Typography component={"h3"} > { title } </Typography>
                                                <Chip label={`author:${authorNick}`}/>
                                                <Chip label={`${postDate}`}/>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            <StarThumb starCount={starCount} thumbCount={thumbCount}
                                            hasStared={hasStared} hasThumbed={hasThumbed}
                                            toggleStar={getToggleStarCarrier(idx)}
                                            toggleThumb={getToggleThumbCarrier(idx)}/>
                                        </CardActions>
                                    </Card>
                                )
                            } )
                        }
                        
                    </div>
                ) :
                ( <NoDataFound/> )
            }
        </>
    )
}
export default inject( VIEWED_BLOG_LIST_MOBX_KEY )( observer( BlogListApp ) );