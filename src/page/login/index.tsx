import React from "react";
import { useHistory } from "react-router-dom";
import useInput from '../../hooks/use-input';
import { TODO_DISPLAY_PATH, REGISTER_PATH, BLOG_LOGIN_PATH } from '../../constants/router-path';
import { setSession } from '../../util/storage';
import { UserInfoStorageType, USER_INFO_SECTION } from '../../constants/storage-section';
import useAppLoading from '../../private-hooks/use-app-loading';
import { LOADING_MARK } from '../../App';
import { Button, ButtonGroup, Card, CardActions, CardContent, TextField } from "@mui/material";
import useAppTip from "../../private-hooks/use-app-tip";
import { LOGIN_FAIL_TIP } from '../../constants/app-tip-data';
import request from '../../api/request';
import { FrontUserInfoCache } from '../../type/user';
import { BlogLoginRequestType, API_URL_LOGIN, BlogLoginPayloadType } from '../../api/interface';
import { AppErrorCode } from '../../type/api/index';

const LOGIN_INPUT_LABEL = "LOGIN";
const PWD_INPUT_LABEL = "PWD";
const INPUT_VARIANT = "filled";
const LoginApp:React.FC = () => {
    const [ userID, onUIDChange ] = useInput( "" ); //username
    const [ pwd, onPwdChange ] = useInput( "" ); // password
    const [ openLoading, closeLoading ] = useAppLoading( LOADING_MARK.FS_LOADING );
    const AppTipController = useAppTip(); 
    const routerHistory = useHistory();
    const onUserLogin = async () => {
        try {
            // loading Logic
            openLoading();
            const response = await 
            request<BlogLoginPayloadType, BlogLoginRequestType>
            ( API_URL_LOGIN, { userID, pwd } );
            if( response.errorCode === AppErrorCode.OK ) { // payload: true
                // cache the neccessary user login session like userkey
                console.log( response.errorCode );
                setSession<FrontUserInfoCache>( USER_INFO_SECTION, response.payload as FrontUserInfoCache );
                routerHistory.replace( TODO_DISPLAY_PATH );
            } else {
                // here need a mark logic
                // fail modal need
                AppTipController( LOGIN_FAIL_TIP );
            }
            closeLoading();
        } catch( error ) {
            closeLoading();
            // on error should need some like alter or modal
        }
    }
    const onToRegister = () => {
        routerHistory.push( REGISTER_PATH );
    }

    return ( 
        <>
            <Card>
                <CardContent>
                    <TextField onChange={onUIDChange} label={LOGIN_INPUT_LABEL} variant={INPUT_VARIANT}/> 
                    <TextField onChange={onPwdChange} label={PWD_INPUT_LABEL} variant={INPUT_VARIANT}/>
                </CardContent>
                <CardActions>
                    <ButtonGroup>
                        <Button onClick={onUserLogin}> LOGIN </Button>
                        <Button onClick={onToRegister}> TO REGISTER </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </>
    )
}
export default LoginApp;