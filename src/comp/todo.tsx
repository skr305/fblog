import React, { useMemo } from "react";
import { TodoKey } from '../type/todo';
import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

interface TodoProps {
    todoContent: string;
    todoID: TodoKey;
    finished: boolean;
    onFinish: ( key:TodoKey ) => any;
    onDelete: ( key:TodoKey ) => any;
    onChangeContent: ( key:TodoKey ) => any;
};
const TodoActionButtonVariant = "contained";
const Todo:React.FC<TodoProps> = ( props: TodoProps ) => {
    const [ finished, setFinished ] = useState( props.finished );
    const onFinish = () => {
        setFinished( true );
        props.onFinish( props.todoID );
    }
    const progressTag = useMemo( () => finished ? <AssignmentTurnedInIcon/> : <AssistantPhotoIcon/>, [ finished ] );
    return ( 
        <div>
            <Typography variant="h6" component="span" gutterBottom>
                { props.todoContent }
            </Typography>
            <div> { progressTag } </div>
            <ButtonGroup>
                <Button onClick={() => props.onChangeContent( props.todoID )}
                variant={TodoActionButtonVariant} >
                     CHANGE CONTENT 
                </Button>
                <Button onClick={() => props.onDelete( props.todoID )}
                variant={TodoActionButtonVariant} >
                     DELETE 
                </Button>
                <Button onClick={ onFinish }
                variant={TodoActionButtonVariant} >
                     FINISH 
                </Button>
            </ButtonGroup>  
        </div>
    )

}
export default Todo;