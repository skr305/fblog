import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { ClearFunction, PushableRouter } from '../../type/alias';
import { FrontUserInfoCache } from "../../type/user";
import { getSession } from "../../util/storage";
import { BLOG_USER_INFO } from "../../constants/storage-section";
import { BLOG_LOGIN_PATH, LOGIN_PATH } from '../../constants/router-path';
import useAppTip from '../../private-hooks/use-app-tip';
import { UNAUTH_TIP } from '../../constants/app-tip-data';
import { useCallback } from 'react';

// session secured
export type SessionSecuredControllerType = ( carrier: ClearFunction, effect?: ClearFunction ) => () => boolean;
export const SessionSecuredControllerContext = React.createContext<SessionSecuredControllerType>( ( carrier: ClearFunction ) => () => true );
export interface LayoutProps {
    children?: React.ReactNode;
}
const LayoutApp:React.FC = ( props: LayoutProps ) => {
    const routerHistory = useHistory()
    const routerLocation = useLocation();
    const tipController = useAppTip();
    const InAuthPage = useCallback( ( pathname: string ) => {
        return pathname === BLOG_LOGIN_PATH;
    }, []);
    // sessionSecured need to use in the layout's children floor @private 
    const sessionSecuredController = ( carrier: ClearFunction, effect?: ClearFunction) => {
        return () => {
            if( getSession<FrontUserInfoCache>( BLOG_USER_INFO ) ) {
                carrier();
                return true;
            } else {
                tipController( UNAUTH_TIP );
                routerHistory.push( BLOG_LOGIN_PATH );
                if( effect ) {
                    effect();
                }
                return false;
            }
        };
    };
    return ( 
        <>
            <SessionSecuredControllerContext.Provider value={sessionSecuredController} >
                {
                    InAuthPage( routerLocation.pathname ) ?
                    props.children :
                    ( 
                        // header-layout-menu required
                        <div>
                            <header></header>
                            { props.children }
                        </div> 
                    )
                }
            </SessionSecuredControllerContext.Provider>
        </>
    )
}
export default LayoutApp;