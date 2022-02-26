import { Dispatch, useState } from "react";

const useStateWithRender = <T>( initState: T ):[ T, Dispatch<T> ] => {
    const [ toggle, setToggle ] = useState( true );
    const [ realState, setRealState ] = useState<T>( initState );
    const dispatchWithRender = ( value: T ) => {
        setRealState( value );
        setToggle( !toggle );
    }

    return [ realState, dispatchWithRender ];
}
export default useStateWithRender;