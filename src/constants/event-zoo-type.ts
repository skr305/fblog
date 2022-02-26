export const RequestChangeTodoContent = "reqchangetodocontent";
export type RequestChangeTodoContentCachesType = {
    todoID: string,
    categoryKey: string
};
export const CommitChangeTodoContent = "comChangeTOdoContent";
export type CommitChangeTodoContentParamsType = {
    todoID: string,
    categoryKey: string,
    newContent: string
};
export const CommitAddCategory = "comAddCategory";
export type CommitAddCategoryParamsType = {
    categoryKey: string
};
export const RequestAddTodo = "reqaddtodo";
export type RequestAddTodoCachesType = {
    categoryKey: string
};
export const CommitAddTodo = "comAddTodo";
export type CommitAddTodoParamsType = {
    todoContent: string,
    categoryKey: string
};
// blog
export const PullBlogDetail = "pullBlogDetail";
export type PullBlogDetailCachesType = {
    blogID: string
};



