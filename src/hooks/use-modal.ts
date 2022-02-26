import { ClearFunction } from '../type/alias';
import { useState, Dispatch } from 'react';
/** @returns [ open, open-setter, handleOpen, handleClose ] */
const useModal = ( initOpen: boolean ): [ boolean, Dispatch<boolean>, ClearFunction, ClearFunction ] => {
    const [ open, setOpen ] = useState( initOpen );
    const handleOpen = () => setOpen( true );
    const handleClose = () => setOpen( false );
    return [ open, setOpen, handleOpen, handleClose ];
}
export default useModal;