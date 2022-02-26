import { TodoCategoryKey, TodoType } from '../type/todo';
import Todo from './todo';
import { eventZooEmit } from '../lib/event-zoo/index';
import { RequestChangeTodoContent, RequestChangeTodoContentCachesType, RequestAddTodoCachesType, RequestAddTodo } from '../constants/event-zoo-type';
import { useHistory } from 'react-router-dom';
import { CHANGE_TODO_CONTENT_PATH, ADD_TODO_PATH } from '../constants/router-path';
import { ListItem, List } from '@mui/material';
interface TodoCategoryProps {
    categoryKey: TodoCategoryKey,
    categoriedTodos: Array<TodoType>,
    onFinishTodo: ( categoryKey: string, todoID: string ) => any;
    onDeleteTodo: ( categoryKey: string, todoID: string ) => any;
};
const TodoCategory:React.FC<TodoCategoryProps> = ( props: TodoCategoryProps ) => {
    const routerHistory = useHistory();
    const onFinishTodo = ( todoID: string ) => {
        props.onFinishTodo( props.categoryKey, todoID );
    };
    const onDeleteTodo = ( todoID: string ) => {
        props.onDeleteTodo( props.categoryKey, todoID );
    };
    const onChangeTodoContent = ( todoID: string ) => {
        routerHistory.push( CHANGE_TODO_CONTENT_PATH );
        eventZooEmit<any, RequestChangeTodoContentCachesType>( 
            RequestChangeTodoContent, 
            {}, 
            { todoID, categoryKey: props.categoryKey } 
        );
    }; 
    const onAddTodo = () => {
        eventZooEmit<any, RequestAddTodoCachesType>(
             RequestAddTodo, 
             {}, 
             { categoryKey: props.categoryKey } 
        );
        routerHistory.push( ADD_TODO_PATH );
    };
    return (
        <div>  
            <div> CATEGORY: { props.categoryKey } </div>
            <div onClick={onAddTodo}> ADD TODO </div>
            {
                props.categoriedTodos.map( ( todoItem:TodoType, idx ) => {
                    return (
                        <List key={`todo-item-${todoItem.ID}`}> 
                            <ListItem>
                                <div> {idx}. </div>
                                <Todo todoContent={todoItem.content} 
                                todoID={todoItem.ID} 
                                finished={todoItem.finished}
                                onFinish={onFinishTodo}
                                onDelete={onDeleteTodo}
                                onChangeContent={onChangeTodoContent}
                                >
                                </Todo>
                            </ListItem>
                        </List>
                    )
                } )
            }
        </div>
    )
}

export default TodoCategory