import { TextField, Button } from "@mui/material";
import React, { useCallback } from "react";
import useInput from '../../hooks/use-input';

interface SingleSubmitableProps {
    onSubmit: ( value: string ) => any;
    submitLabel ?: string;
};
const SingleSubmitable:React.FC<SingleSubmitableProps> = ( props: SingleSubmitableProps ) => {
    const [ value, onChangeValue ] = useInput( "" );
    const onSubmit = useCallback( () => {
        props.onSubmit( value );
    }, [ props.onSubmit, value ]) 
    return (
        <div>
            <TextField onInput={ onChangeValue }/>
            <Button onClick={ onSubmit }> { props.submitLabel || "提交" } </Button>
        </div>
    )
};
export default SingleSubmitable;