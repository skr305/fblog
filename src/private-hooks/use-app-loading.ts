import { LOADING_MARK, GetLoadingControllerContext } from '../App';
import { ClearFunction } from '../type/alias';
import { useContext } from 'react';

/**
 * only in the range of GetLoadingControllerContext matters
 * @param mark the mark of the loading-ani
 * @returns [ onOpen, onClose ]
 */
const useAppLoading = ( mark: LOADING_MARK ):[ClearFunction, ClearFunction] => {
    const loadingController = useContext( GetLoadingControllerContext )( mark );
    const onOpen = () => loadingController( true );
    const onClose = () => loadingController( false );
    return [ onOpen, onClose ];
};
export default useAppLoading;