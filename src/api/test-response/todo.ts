import { GetOKResponse } from '../../type/api/index';
import { GetCategoriedTodosResponse, AddCategoryResponse, AddTodoInCategoryResponse, RegisterResponse, DeleteTodoInCategoryResponse, ChangeTodoContentInCategoryResponse, ChangeUsernameResponse, ChangeCategoryKeyResponse, UserLoginResponse } from '../../type/api/todo';
import { TodoType } from '../../type/todo';

export const OKUserLogin:UserLoginResponse = GetOKResponse( "Spinner-305" )
export const OKGetCategoredTodos:GetCategoriedTodosResponse = GetOKResponse( {
    "NormalStudy": [ 
        { ID: "154", content: "math", finished: false }, 
        { ID: "155", content: "chinese", finished: false },
        { ID: "410", content: "history", finished: false }
    ],
    "Entertain": [ 
        { ID: "254", content: "r6", finished: false }, 
        { ID: "255", content: "basketball", finished: true },
        { ID: "100", content: "run", finished: false }
    ]
} );
export const OKAddCategory:AddCategoryResponse = GetOKResponse( true );
export const OKAddTodoInCategory = (todo: TodoType):AddTodoInCategoryResponse => GetOKResponse( todo );
export const OKRegister:RegisterResponse = GetOKResponse( true );
export const OKDeleteTodoInCategory:DeleteTodoInCategoryResponse = GetOKResponse( true );
export const OKChangeTodoContentInCategory:ChangeTodoContentInCategoryResponse = GetOKResponse( true );
export const OKChangeCategoryKey:ChangeCategoryKeyResponse = GetOKResponse( true );
export const OKChangeUsernameInCategory:ChangeUsernameResponse = GetOKResponse( true );