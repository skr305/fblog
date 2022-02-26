import './App.css';
import { LOGIN_PATH, REGISTER_PATH, TODO_DISPLAY_PATH, ADD_TODO_PATH, ADD_CATEGORY_PATH, CHANGE_TODO_CONTENT_PATH, STATION_PATH, BLOG_LIST_PATH, BLOG_CONTENT_PATH, BLOG_LOGIN_PATH } from './constants/router-path';
import LoginApp from './page/login/index';
import RegisterApp from './page/register/index';
import TodoDisplayApp from './page/todo-display/index';
import AddTodoApp from './page/add-todo/index';
import AddCategoryApp from './page/add-category/index';
import ChangeTodoContentApp from './page/change-todo-content/index';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';
import useModal from './hooks/use-modal';
import BasicModal from './comp/basic-modal';
import LoadingFrame from './comp/loading-frame';
import { ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import StationApp from './page/station';
import BlogListApp from './page/blog-list/index';
import BlogContentApp from './page/blog-content/index';
import { Provider as MobxStoreProvider } from 'mobx-react';
import stores from './store/index';
import BlogLoginApp from './page/blog-login/index';
import LayoutApp from './page/layout';
import { useEffect } from 'react';
import request from './api/request';
import { API_URL_LOGIN, BlogLoginRequestType, BlogLoginPayloadType } from './api/interface';
import TestAvaUpload from './test-comp/test-ava-upload';

// loading-use variable
export enum LOADING_MARK {
  FS_LOADING = 1,
  TOP_LOADING = 2,
  MODAL_LOADING = 3
};
const MODAL_LOADING_TITLE = "IN-LOADING";
const MODAL_LOADING_CONTENT = "WAIT FOR A MOMENT";
export const GetLoadingControllerContext = React.createContext<( mark: LOADING_MARK ) => ( isLoading:boolean ) => any>( ( mark: LOADING_MARK ) => ( isLoading: boolean ) => {} );
// tip-use variable
export type AppTipDataType = {
  tipTop: string;
  tipContent: string;
};
export type AppTipControllerType = ( tipData: AppTipDataType ) => any;
export const GetAppTipControllerContext = React.createContext<() => AppTipControllerType>( () => ( tipData: AppTipDataType ) => {} );
function App() {
  // test-use
  // useEffect( () => {
  //   request<BlogLoginPayloadType, BlogLoginRequestType>( 
  //     API_URL_LOGIN,
  //      {
  //        userID: "233",
  //        pwd: "233"
  //      }
  //   ).then( payload => {
  //     console.log( payload );
  //   } );
  // }, []);
  
  // loading
  const [ inFSLoading, setInFSLoading ] = useModal( false ); // FullScreenLoading
  const [ inTopLoading, setInTopLoading ] = useModal( false ); // loading animation only in top
  const [ inModalLoading, setInModalLoading ] = useModal( false ); 
  const loadingControllers = useMemo( () => {
    return {
      [ LOADING_MARK.FS_LOADING ]: setInFSLoading,
      [ LOADING_MARK.TOP_LOADING ]: setInTopLoading,
      [ LOADING_MARK.MODAL_LOADING ]: setInModalLoading
    }
  }, [ setInFSLoading, setInTopLoading, setInModalLoading] );
  const GetLoadingController = useCallback( ( mark: LOADING_MARK ) => {
    return loadingControllers[ mark ];
  }, [ loadingControllers ] ); 
  // tip
  const INIT_TIP_DATA = {
    tipTop: "init-tip-top",
    tipContent: "init-tip-content"
  };
  const [ tipData, setTipData ] = useState<AppTipDataType>( INIT_TIP_DATA );
  const [ tipModalOpen, , openTipModal, closeTipModal ] = useModal( false );
  const GetTipController = () => {
    return ( tipData: AppTipDataType ) => {
      setTipData( tipData );
      openTipModal();
    };
  };
  // theme
  const appMaterialtheme = createTheme( { palette: { mode: "light" } } );
  return (
    <div className="App">
      {/* for test */}
      {/* <TestAvaUpload/> */}
      <ThemeProvider theme={appMaterialtheme}>
        <MobxStoreProvider {...stores}>
          {/* top-loading */}
          { inTopLoading ? <LoadingFrame/> : (<></>) } 
          <GetLoadingControllerContext.Provider value={GetLoadingController}>
            <GetAppTipControllerContext.Provider value={GetTipController}>
              {
                inFSLoading ? 
                <LoadingFrame/> :
                <Router>
                  <LayoutApp>
                    <Route component={StationApp} exact path={STATION_PATH}></Route>
                    <Route component={LoginApp} path={LOGIN_PATH}></Route>
                    <Route component={RegisterApp} path={REGISTER_PATH}></Route>
                    {/* blog-app */}
                    <Route component={BlogLoginApp} exact path={BLOG_LOGIN_PATH}></Route>
                    <Route component={BlogListApp} exact path={BLOG_LIST_PATH}></Route>
                    <Route component={BlogContentApp} exact path={BLOG_CONTENT_PATH}></Route>
                    {/* todo-app */}
                    <Route component={TodoDisplayApp} path={TODO_DISPLAY_PATH}></Route>
                    <Route component={AddTodoApp} path={ADD_TODO_PATH}></Route>
                    <Route component={AddCategoryApp} path={ADD_CATEGORY_PATH}></Route>
                    <Route component={ChangeTodoContentApp} path={CHANGE_TODO_CONTENT_PATH}></Route>
                  </LayoutApp>
                </Router>
              }
            </GetAppTipControllerContext.Provider>
          </GetLoadingControllerContext.Provider>
          {/* loading modal: can't be closed */}
          <BasicModal open={inModalLoading}
          handleClose={() => {}}
          title={MODAL_LOADING_TITLE}
          content={MODAL_LOADING_CONTENT}
          >
          </BasicModal>
          { /* tip modal: can be closed */ }
          <BasicModal open={tipModalOpen}
          handleClose={closeTipModal}
          title={tipData.tipTop}
          content={tipData.tipContent}
          >
          </BasicModal>
        </MobxStoreProvider>
      </ThemeProvider>
    </div>
  );
};
export default App;
