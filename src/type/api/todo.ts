import AppResponse from ".";
import { CategoriedTodoList, TodoCategoryKey, TodoKey, TodoType } from '../todo';
import { UserKeyType } from '../user';

export type UserLoginResponse = AppResponse<UserKeyType>;
export type UserLoginRequestData = { username: string, password: string };

// get todos by userKey and expressed by categoriedTodoList
export type GetCategoriedTodosResponse = AppResponse<CategoriedTodoList>;
export type GetCategoriedTodoRequestData = { userKey: UserKeyType };

export type AddCategoryResponse = AppResponse<Boolean>;
export type AddCategoryRequestData = { userKey: UserKeyType, categoryKey: TodoCategoryKey };

// should response with the new Todo created
export type AddTodoInCategoryResponse = AppResponse<TodoType>;
export type AddTodoInCategoryRequestData = { userKey: UserKeyType, categoryKey: TodoCategoryKey, todoContent: string };

export type RegisterResponse = AppResponse<Boolean>;
export type RegisterResponseRequestData = { initUsername: string, password: string };

export type DeleteTodoInCategoryResponse = AppResponse<Boolean>;
export type DeleteTodoInCategoryRequestData = { userKey: UserKeyType, categoryKey: TodoCategoryKey, todoID: TodoKey };

export type ChangeTodoContentInCategoryResponse = AppResponse<Boolean>;
export type ChangeTodoContentInCategoryRequestData = { userKey: UserKeyType, categoryKey: TodoCategoryKey, todoID: TodoKey, newTodoContent: string };

export type ChangeCategoryKeyResponse = AppResponse<Boolean>;
export type ChangeCategoryKeyRequestData = { userKey: UserKeyType, originCategoryKey: TodoCategoryKey, newCategoryKey: string };

export type ChangeUsernameResponse = AppResponse<Boolean>;
export type ChangeUsernameRequestData = { originUsername: string, newUsername: string };