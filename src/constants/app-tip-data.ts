import { AppTipDataType } from '../App';
import { AppErrorCode } from '../type/api/index';
export const LOGIN_FAIL_TIP: AppTipDataType = {
    tipTop: "LOGIN_FAIL",
    tipContent: "TRY TO LOGIN WITH CORREACT [username, pwd] PAIR"
};
export const UNAUTH_TIP: AppTipDataType = {
    tipTop: "YOU HAVE NOT AUTH INFO, PLEASE LOGIN IN",
    tipContent: "TRY TO LOGIN"
};
export const ADD_TODO_TO_NULL_CATEGORY: AppTipDataType = {
    tipTop: "ADD_TODO_FAIL",
    tipContent: "ADD TODO TO A CATEGORY NO EXIST, ERROR_CODE: 001, SYSTEM ERROR"
};
export const ADD_TODO_RUNTIME_ERROR: AppTipDataType = {
    tipTop: "ADD_TODO_FAIL",
    tipContent: "ADD TODO RUNTIME ERROR, ERROR_CODE: 002"
};
/** blog */
// standard error tip
export const LOADING_DATA_ERROR: AppTipDataType = {
    tipTop: "LOADING_DATA_FAIL",
    tipContent: "SOME ERROR EMIT IN LOADING DATA"
};
export const getNormalApiErrorTip = ( errorCode: AppErrorCode ) => {
    return {
        tipTop: `CODE: ${errorCode}`,
        tipContent: `some error emit with code: ${errorCode}`
    };
};