import React from "react";
import SingleFormPage from "../../comp/single-form-page";
import { eventZooCache, eventZooEmit } from '../../lib/event-zoo/index';
import { RequestChangeTodoContent, RequestChangeTodoContentCachesType, CommitChangeTodoContent, CommitChangeTodoContentParamsType } from '../../constants/event-zoo-type';

const ChangeTodoContentApp:React.FC = () => {
    const formTip = "SET TODO CONTENT";
    const onSubmitWithValue = ( value: string ) => {
        const cachedBlock = eventZooCache<RequestChangeTodoContentCachesType>( RequestChangeTodoContent );
        if( !cachedBlock ) {
            // error handling need
            return;
        }
        const todoID = cachedBlock.todoID;
        const categoryKey = cachedBlock.categoryKey;
        eventZooEmit<CommitChangeTodoContentParamsType, any>( CommitChangeTodoContent, { todoID, categoryKey, newContent: value } );
    }
    return ( 
        <SingleFormPage formTip={formTip} onSubmitWithValue={onSubmitWithValue}/>
    )
}
export default ChangeTodoContentApp;