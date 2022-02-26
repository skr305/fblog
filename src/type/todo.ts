export type TodoKey = string;

export type TodoType = {
    ID: TodoKey,
    content: string,
    finished: boolean
}

export type TodoCategoryKey = string;

export type CategoriedTodoList = { [ category: TodoCategoryKey ]: Array<TodoType> };

