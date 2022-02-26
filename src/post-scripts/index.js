const axios = require( 'axios' );
const fs = require( 'fs' );
const path = require( 'path' );
const reader = require( './file/std-read' );
const stdError = require( './error/index' );
const { compileMDContent } = require( './compiler/content-compile' );
// contants
const IN_DEV_ENV = "dev";
const IN_PRD_ENV = "PRD";
const PRD_ROOT_URL = "";
const LOCAL_HOST_ROOT = "127.0.0.1";
const DEFAULT_BACKEND_POST_URL = "/api/unauth/post_blog";
    // file handle
const INDEX_MD_NAME = "index.md";
// derived
const CURRENT_ENV = IN_DEV_ENV;
const CURRENT_ROOT_URL = CURRENT_ENV === IN_DEV_ENV ? LOCAL_HOST_ROOT : PRD_ROOT_URL;
const proxy =  {
    host: CURRENT_ROOT_URL,
    port: 8088
};
const standardAxios = axios.create( {
    proxy,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    // from plain Object to stardart format
    transformRequest:  [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]
} );
const getDirName = ( pathname ) => {
    return path.basename( pathname );
};
const computeBlogDetail = async ( packname ) => {
    // remove the "/"
    if( packname.length > 1 && packname[ packname.length - 1 ] === "/" ) {
        packname = packname.slice( 0, packname.length - 1 );
    }
    const title = getDirName( packname );
    let content = "";
    // arr of filename
    let filenames = [];
    try {
        filenames = await reader.stdReadDir( packname );
    } catch (error) {
        console.error( error );
        throw stdError.PACK_NO_FOUND_ERROR;
    };
    // no include index.md
    if( !filenames.includes( INDEX_MD_NAME ) ) {
        throw stdError.MD_NO_FOUND_ERROR;
    }
    try {
        // content that the img hasn't replaced by cloud url
        const rawContent = reader.stdReadFile( `${packname}/${INDEX_MD_NAME}` );
        content = await compileMDContent( rawContent );
    } catch( error ) {
        if( error instanceof stdError.BaseError ) {
            throw error;
        } else {
            throw stdError.READ_IDX_MD_ERROR;
        }
    }
    return {
        title,
        content
    };
}
const boot = async () => {
    const [ , , userID, postCode, packname ] = process.argv;
    try {
        const { title, content } = await computeBlogDetail( packname );
        console.log( userID, postCode, title, content );
        // end of the argv
        if( !packname ) {   
            console.log( "bad input argument" );
            return;
        }
        standardAxios.post( "/api/unauth/post_blog",
            { userID, postCode, content, title },
        ).then( res => {
            console.log( "suc" );
            console.log( res );
        } ).catch( error => {
            console.log( "post blog error" );
            console.error( error );
        } )  ;
    } catch( error ) {
        return;
    };
};
boot();