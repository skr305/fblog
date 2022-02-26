import React, { useCallback, useContext, useEffect } from "react";
import { ViewedBlogDetail } from '../../store/resource/blog';
import { fakeSuccessRequest } from '../../util/fake-request';
import { OKGetBlogDetail } from '../../api/test-response/blog';
import useAppLoading from '../../private-hooks/use-app-loading';
import { LOADING_MARK } from '../../App';
import { Card, CardActions, CardContent, Chip, List, Typography, ListItem } from '@mui/material';
import { eventZooCache } from '../../lib/event-zoo/index';
import { PullBlogDetail, PullBlogDetailCachesType } from '../../constants/event-zoo-type';
import useAppTip from "../../private-hooks/use-app-tip";
import { LOADING_DATA_ERROR } from '../../constants/app-tip-data';
import StarThumb from "../../comp/mini/star-thumb";
import { FrontUserInfoCache, UserKeyType } from "../../type/user";
import { SessionSecuredControllerContext } from '../layout/index';
import { getSession } from "../../util/storage";
import { BLOG_USER_INFO } from "../../constants/storage-section";
import { VIEWED_BLOG_DETAIL_MOBX_KEY } from '../../store/index';
import SingleSubmitable from '../../comp/mini/single-submitable';
import CommentDisplay from '../../comp/comment-display';
import { inject, observer } from "mobx-react";
import request from '../../api/request';
import { BlogDetailRequestType } from "@/api/interface";
import { BlogDetailResponseType, API_URL_BLOG_DETAIL } from '../../api/interface';

export interface BlogContentAppProps {
    [VIEWED_BLOG_DETAIL_MOBX_KEY]: ViewedBlogDetail
};
const BlogContentApp:React.FC<BlogContentAppProps> = ( props: BlogContentAppProps ) => {
    const coreData = props[VIEWED_BLOG_DETAIL_MOBX_KEY].coreData;
    const [ openLoading, closeLoading ] = useAppLoading( LOADING_MARK.TOP_LOADING );
    const appTipController = useAppTip();
    const sessionSecurer = useContext( SessionSecuredControllerContext );
    const initBlogDetail = async () => {
        try {
            openLoading();
            const LoadBlogID = eventZooCache<PullBlogDetailCachesType>( PullBlogDetail )?.blogID;
            if( LoadBlogID ) {
                openLoading();
                const fakeBlogDetail = (await request<BlogDetailResponseType, BlogDetailRequestType>( API_URL_BLOG_DETAIL, { blogID: LoadBlogID } )).payload;
                props[VIEWED_BLOG_DETAIL_MOBX_KEY].initBlogDetail( fakeBlogDetail );
                closeLoading();
            } else {    
                // the accident situation
                appTipController( LOADING_DATA_ERROR );
            }
            closeLoading();
        } catch ( error ) {
            // the accident situation
            appTipController( LOADING_DATA_ERROR );
        }
    };
    // for get thumb or star function generator
    const getFeedbackCarrier = ( carrierEntity: ( userKey: UserKeyType ) => void ) => {
        return () => {
            return sessionSecurer( () => {
                const userKey = getSession<FrontUserInfoCache>( BLOG_USER_INFO )?.userKey;
                if( userKey ) {
                    openLoading();
                    carrierEntity( userKey );
                    setTimeout( () => closeLoading());
                }
            }); // router history not matters in up-floor comp
        }
    };
    const getToggleThumbCarrier = useCallback( getFeedbackCarrier( props[VIEWED_BLOG_DETAIL_MOBX_KEY].thumbBlog ), [ props[VIEWED_BLOG_DETAIL_MOBX_KEY] ] );
    const getToggleStarCarrier = useCallback( getFeedbackCarrier( props[VIEWED_BLOG_DETAIL_MOBX_KEY].starBlog ), [ props[VIEWED_BLOG_DETAIL_MOBX_KEY] ] );
    const onThumbComment = useCallback( ( idx: number ) => {
        getFeedbackCarrier
        (
            ( userKey: UserKeyType ) => {
                props[VIEWED_BLOG_DETAIL_MOBX_KEY]
                .onThumbComment( idx, userKey )
            }
            
        )()();
    }, [ props[VIEWED_BLOG_DETAIL_MOBX_KEY] ]);
    const onThumbSecondary = useCallback( ( fIdx: number, sIdx: number ) => {
        getFeedbackCarrier
        (
            ( userKey: UserKeyType ) => 
            props[VIEWED_BLOG_DETAIL_MOBX_KEY]
            .onThumbSecondary( fIdx, sIdx, userKey )
        )()();
    }, [ props[VIEWED_BLOG_DETAIL_MOBX_KEY] ]);
    const onReplyComment = useCallback( (idx: number, content: string) => {
        getFeedbackCarrier
        (
            ( userKey: UserKeyType ) => 
            props[VIEWED_BLOG_DETAIL_MOBX_KEY]
            .onReplyComment( idx, content, userKey )
        )()();
    }, [props[VIEWED_BLOG_DETAIL_MOBX_KEY]] );
    const getCommentPoster = ( content: string ) => {
        sessionSecurer( () => {
            const userKey = getSession<FrontUserInfoCache>( BLOG_USER_INFO )?.userKey;
            if( userKey ) {
                openLoading();
                props[VIEWED_BLOG_DETAIL_MOBX_KEY].postComment( content, userKey );
                setTimeout( () => closeLoading());
            };
        })();
    };
    useEffect( () => {
        initBlogDetail();
    }, [] );
    return ( 
        <>
            {   
                coreData ?
                (() => {
                    const { authorID, ID, authorNick, 
                        authorAva, postDate, title, 
                        content, comments, hasStared,
                        hasThumbed, starCount, thumbCount }  
                    = coreData;
                    return (
                        <div>
                            <Card>
                                <CardContent>
                                    <Typography component={"h1"} > { title } </Typography>
                                    <Chip label={`-${authorNick}`}/>
                                    <Chip label={`发表于:${postDate}`}/>
                                    <Typography component={"h4"}> { content } </Typography>
                                </CardContent>
                                <CardActions>
                                    <StarThumb starCount={starCount} thumbCount={thumbCount}
                                    hasStared={hasStared} hasThumbed={hasThumbed}
                                    toggleStar={getToggleStarCarrier()}
                                    toggleThumb={getToggleThumbCarrier()}/>
                                    <SingleSubmitable onSubmit={getCommentPoster}/>
                                </CardActions>
                                <CardContent>
                                    <CommentDisplay 
                                    onToggleThumb={onThumbComment}
                                    onReply={onReplyComment}
                                    data={coreData.comments}
                                    onToggleSecondaryThumb={onThumbSecondary}
                                    />
                                </CardContent>
                            </Card>
                        </div>  
                        
                    )
                })() :
                ( <></> )
            }
            
        </>
    )
}
export default inject( VIEWED_BLOG_DETAIL_MOBX_KEY )( observer( BlogContentApp ) );