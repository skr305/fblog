import React from "react";
import { BLOG_LIST_PATH } from '../../constants/router-path';
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const DEFAULT_ENTRY_PATH = BLOG_LIST_PATH;
const StationApp:React.FC = () => {
    const routerHistory = useHistory();
    useEffect( () => {
        routerHistory.replace( DEFAULT_ENTRY_PATH );
    }, [] );
    return ( 
        <>
        </>
    )
}
export default StationApp;