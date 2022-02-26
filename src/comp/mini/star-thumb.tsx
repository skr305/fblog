import React from "react";
import { ClearFunction } from '../../type/alias';
import { Chip } from "@mui/material";
import { Star, StarOutline, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material';
import { useCallback } from 'react';
import { OnToggleType } from './togglable';

export type OnStarOrThumbType = OnToggleType;
export interface StarThumbProps {
    starCount: number;
    toggleStar?: OnStarOrThumbType;
    hasStared: boolean;
    thumbCount: number;
    toggleThumb?: OnStarOrThumbType;
    hasThumbed: boolean;

    disabled?: boolean;
};
export enum STAR_THUMB_CODE {
    STAR = 0,
    THUMB = 1
};
const StarThumb:React.FC<StarThumbProps> = ( props: StarThumbProps ) => {
    const { starCount, thumbCount, hasStared, hasThumbed } = props;
    const onStar = useCallback( () => {
        if( props.toggleStar ) {
            props.toggleStar();
        }
    }, [ props.toggleStar ] );
    const onThumb = useCallback( () => {
        if( props.toggleThumb ) {
            props.toggleThumb();
        }
    }, [ props.toggleThumb ] );
    return (
        <div>
            <Chip icon={ hasStared ? <Star/> : <StarOutline/> } label={starCount}
            onClick={onStar}/>
            <Chip icon={ hasThumbed ? <ThumbUp/> : <ThumbUpAltOutlined/> } label={thumbCount}
            onClick={onThumb}/>
        </div>
    )
};
export default StarThumb;