import { GetAppTipControllerContext, AppTipDataType } from '../App';
import { useContext } from 'react';

/**
 * only in the range of GetTipControllerContext matters
 * @param mark the mark of the loading-ani
 * @returns [ onOpen, onClose ]
 */
const useAppTip = ():( tipData: AppTipDataType ) => any => {
    const tipController = useContext( GetAppTipControllerContext )();
    return tipController;
};
export default useAppTip;