import { TextField, Button, Card } from '@mui/material';
import React from "react";
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/use-input';

interface SingleFormPageProps {
    formTip: string;
    onSubmitWithValue: ( formValue: string ) => any;
};


const SingleFormPage:React.FC<SingleFormPageProps> = ( props: SingleFormPageProps ) => {
    const routerHistory = useHistory();
    const [ value, onValueChange ] = useInput();
    const onSubmit = () => {
        props.onSubmitWithValue( value );
        routerHistory.goBack();
    }

    return ( 
        <Card>
            <TextField onChange={ onValueChange } label={props.formTip} variant={"filled"}/>
            <Button onClick={ onSubmit } variant={"text"} > SUBMIT </Button>
        </Card>
    )

}
export default SingleFormPage;