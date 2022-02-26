import { Dispatch, useState, ChangeEvent } from "react"

const updateModel = ( setter:Dispatch<string> ) => {
    return ( event: ChangeEvent<HTMLInputElement> ) => {
        return setter( event.target.value);
    };
};
const useInput = (initText: string = ""): [string, (event: ChangeEvent<HTMLInputElement>) => any, Dispatch<string>] => {
    const [text, setText] = useState(initText);
    const onTextChange = updateModel(setText);
    return [text, onTextChange, setText];
};
export default useInput;