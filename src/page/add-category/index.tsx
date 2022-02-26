import React from "react";
import SingleFormPage from '../../comp/single-form-page';
import { eventZooEmit } from '../../lib/event-zoo/index';
import { CommitAddCategory, CommitAddCategoryParamsType } from '../../constants/event-zoo-type';

const AddCategoryApp:React.FC = () => {
    const formTip = "ADD CATEGORY";
    const onSubmitWithValue = ( value: string ) => {
        eventZooEmit<CommitAddCategoryParamsType, any>( CommitAddCategory, { categoryKey: value } );
    };

    return ( 
        <SingleFormPage formTip={formTip} onSubmitWithValue={onSubmitWithValue}/>
    )
}
export default AddCategoryApp;