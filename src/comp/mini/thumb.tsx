import React from "react";
import { ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material';
import Togglable, { OnToggleType } from './togglable';

export type OnThumbType = OnToggleType;
export interface ThumbProps {
    thumbCount: number;
    toggleThumb?: OnThumbType;
    hasThumbed: boolean;
};
export const getToggleChangeCount = ( currentValue: boolean ) => currentValue ? 1 : -1;
const Thumb:React.FC<ThumbProps> = ( props: ThumbProps ) => {
    const { toggleThumb, thumbCount, hasThumbed } = props;
    return (
        <>
            <Togglable count={thumbCount} toggle={toggleThumb}
             hasInto={hasThumbed} IntoIcon={<ThumbUp/>} OutIcon={<ThumbUpAltOutlined/>}/>
        </>
    )
};
export default Thumb;