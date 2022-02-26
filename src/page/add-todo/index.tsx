import React from "react";
import SingleFormPage from '../../comp/single-form-page';
import { eventZooEmit, eventZooCache } from '../../lib/event-zoo/index';
import { CommitAddTodoParamsType, RequestAddTodo, RequestAddTodoCachesType, CommitAddTodo } from '../../constants/event-zoo-type';
import useAppTip from '../../private-hooks/use-app-tip';
import { ADD_TODO_TO_NULL_CATEGORY } from '../../constants/app-tip-data';

const AddTodoApp:React.FC = () => {
    const formTip = "ADD TODO";
    const appTipController = useAppTip();
    const onSubmitWithValue = ( value: string ) => {
        const categoryKey = eventZooCache<RequestAddTodoCachesType>( RequestAddTodo )?.categoryKey; 
        if( !categoryKey ) {
            // error handling need
            appTipController( ADD_TODO_TO_NULL_CATEGORY );
            return;
        }
        eventZooEmit<CommitAddTodoParamsType, any>( CommitAddTodo, { categoryKey, todoContent: value } );
    };

    return ( 
        <SingleFormPage formTip={formTip} onSubmitWithValue={onSubmitWithValue}/>
    )
}
export default AddTodoApp;