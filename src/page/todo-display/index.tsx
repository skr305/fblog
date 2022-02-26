import React, { useCallback, useEffect } from "react";
import { CategoriedTodoList, TodoCategoryKey, TodoKey, TodoType } from '../../type/todo';
import { fakeSuccessRequest } from '../../util/fake-request';
import { OKGetCategoredTodos, OKChangeTodoContentInCategory, OKAddCategory } from '../../api/test-response/todo';
import TodoCategory from "../../comp/todo-category";
import { CommitChangeTodoContentParamsType, CommitAddCategoryParamsType, CommitAddTodoParamsType, CommitChangeTodoContent, CommitAddTodo, CommitAddCategory } from '../../constants/event-zoo-type';
import idGenerator from '../../util/id-generator';
import { eventZooSingleOn } from '../../lib/event-zoo/index';
import useStateWithRender from "../../hooks/use-state-with-render";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ADD_CATEGORY_PATH } from '../../constants/router-path';
import { Button } from "@mui/material";
import useAppLoading from '../../private-hooks/use-app-loading';
import { LOADING_MARK } from "../../App";
import useAppTip from '../../private-hooks/use-app-tip';
import { ADD_TODO_RUNTIME_ERROR } from '../../constants/app-tip-data';

const TodoDisplayApp:React.FC = () => {
    const [ inMount, setInMount ] = useState( true );
    const [ categoriedTodoList, setCategoryTodoList ] = useStateWithRender<CategoriedTodoList>( {} );
    const [ loading, setLoading ] = useState( false );
    const [ openGlobalLoading, closeGlobalLoading ] = useAppLoading( LOADING_MARK.MODAL_LOADING );
    // for check if there is inited
    const [ hasInited, setHasInited ] = useState( false );
    const routerHistory = useHistory();
    const appTipController = useAppTip();
    /** @PRIVATE */
    const findCategoriedTodoIdx = useCallback( ( categoryKey: TodoCategoryKey, todoID: TodoKey ) => {
        const categoriedTodos = categoriedTodoList[ categoryKey ];
        for( let i=0; i<categoriedTodos.length; i++ ) {
            if( categoriedTodos[i].ID === todoID ) {
                return i;
            }
        }
        return -1;
    }, [ categoriedTodoList ]);
    const onChangeTodoContent = useCallback( async ( params: CommitChangeTodoContentParamsType ) => {
        const { todoID, categoryKey, newContent } = params;
        const categoriedTodos = categoriedTodoList[ categoryKey ];
        const todoIdx = findCategoriedTodoIdx( categoryKey, todoID );
        if( todoIdx !== -1 ) {
            try {
                await fakeSuccessRequest( OKChangeTodoContentInCategory );
                categoriedTodos[todoIdx].content = newContent;
                setCategoryTodoList( categoriedTodoList );
            } catch ( error ) {
                // request error logic
            }
        } else {
            // error logic
        }
    }, [ categoriedTodoList, findCategoriedTodoIdx, setCategoryTodoList ]);
    const onAddCategory = useCallback( async ( params: CommitAddCategoryParamsType ) => {
        const { categoryKey } = params;
        if( !categoriedTodoList[categoryKey] ) {
            try {
                await fakeSuccessRequest( OKAddCategory );
                categoriedTodoList[categoryKey] = [];
                setCategoryTodoList( { ...categoriedTodoList } );
            } catch ( error ) {
                // request error logic
            }
        } else {
            // error logic
        }
    }, [ categoriedTodoList, setCategoryTodoList ])
    const onAddTodo = useCallback( async( params: CommitAddTodoParamsType ) => {
        const { categoryKey, todoContent } = params;
        const categoriedTodos = categoriedTodoList[categoryKey];
        if( categoriedTodos ) {
            try {
                // request need
                const generatedTodo:TodoType = { ID: idGenerator(), content: todoContent, finished: false };
                categoriedTodos.push( generatedTodo );
                setCategoryTodoList( { ...categoriedTodoList, [ categoryKey ]: [ ...categoriedTodos, generatedTodo ] } );
            } catch ( error ) {
                // request error logic
                console.error( "RuntimeErrorCode: 002, in TodoDisplayApp" );
                appTipController( ADD_TODO_RUNTIME_ERROR );
            }
        } else {
            // error logic
        }
    }, [ categoriedTodoList, setCategoryTodoList ])
    const initTodoList = useCallback( async () => {
        // loading logic need
        openGlobalLoading();
        const payload = (await fakeSuccessRequest( OKGetCategoredTodos )).payload;
        setCategoryTodoList( payload );
        // loading logic need
        closeGlobalLoading();
    }, [ setCategoryTodoList, openGlobalLoading, closeGlobalLoading ]);
    const initEventZooListener = useCallback( () => {
        eventZooSingleOn<CommitChangeTodoContentParamsType>( CommitChangeTodoContent, onChangeTodoContent );
        eventZooSingleOn<CommitAddTodoParamsType>( CommitAddTodo, onAddTodo );
        eventZooSingleOn<CommitAddCategoryParamsType>( CommitAddCategory, onAddCategory );
    }, [ onAddCategory, onAddTodo, onChangeTodoContent ]);
    const onFinishTodo = ( categoryKey: TodoCategoryKey, todoID: TodoKey ) => {
        const categoriedTodos = categoriedTodoList[ categoryKey ];
        const todoIdx = findCategoriedTodoIdx( categoryKey, todoID );
        if( todoIdx !== -1 ) {
            const todoItem = { ...categoriedTodos[todoIdx], finished: true };
            categoriedTodos[ todoIdx ] = todoItem;
            setCategoryTodoList( { ...categoriedTodoList, [categoryKey]: categoriedTodos } );
            setLoading( true );
            setTimeout( () => {
                setLoading( false );
            } )
        } else {
            // error logic
        }
    };
    const onDeleteTodo = ( categoryKey: TodoCategoryKey, todoID: TodoKey ) => {
        const categoriedTodos = categoriedTodoList[ categoryKey ];
        const todoIdx = findCategoriedTodoIdx( categoryKey, todoID );
        if( todoIdx !== -1 ) {
            categoriedTodos.splice(todoIdx, 1);
            setCategoryTodoList( categoriedTodoList );
        } else {
            // error logic
        }
    };
    // router skip
    const toAddCategoryPage = () => {
        routerHistory.push( ADD_CATEGORY_PATH );
    };
    useEffect( () => {
        // initTodoList();
        // initEventZooListener();
        if( inMount && !hasInited ) {
            setHasInited( true );
            initTodoList();
        }
    }, [] );
    useEffect( () => {
        initEventZooListener();
    }, [ initEventZooListener ] );
    // fading away
    useEffect( () => {
        return () => setInMount( false );
    }, []);

    return ( 
        <>
            <Button onClick={toAddCategoryPage}> ADD CATEGORY </Button>
            {
                loading ?
                <>loading..,</>:
                Object.keys( categoriedTodoList ).map( ( categoryKey:TodoCategoryKey ) => {
                    const categoriedTodo = categoriedTodoList[ categoryKey ];
                    return (
                        <TodoCategory categoryKey={categoryKey}
                        categoriedTodos={categoriedTodo}
                        onFinishTodo={onFinishTodo}
                        onDeleteTodo={onDeleteTodo}
                        key={`todo-category-${categoryKey}`}
                        />
                    )
                } )
            }
        </>
    )
}
export default TodoDisplayApp;