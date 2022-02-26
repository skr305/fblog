const { IMG_SHOULD_BE_IN_ASSETS, READ_EMBED_IMG_ERROR } = require("../error");
const { stdReadFile } = require("../file/std-read");
const { formUpload } = require("../util/fromUpload");
const { idGenerator } = require("../util/id-gen");

const RECON_INTERNET_DOMAIN = [ "https://", "http://", "ftp://", "www." ];
const IMG_PATTERN = /\!\[[\s\S]*?\]\([\s\S]*?\)/g;
// img used in blog has better be put into this path: packname/assets
const ASSETS_DIR_PATH = "/assets";
// for the resposibility chain
class TreatNode {
    // recieve the pathname and do a handle
    status = () => {};
    next = null;
    constructor( status, next ) {
        this.status = status;
        this.next = next;
    };
};
const startWithPackNameStatus = async ( { imgPathname, packname } ) => {
    if( packname && imgPathname ) {
        if( imgPathname.slice( 0, packname.length ) === packname ) {
            const standarAssetsPath = `${packname}/${ASSETS_DIR_PATH}`;
            if( imgPathname.slice( 0, standarAssetsPath.length - 1 ) === standarAssetsPath ) {
                try {
                    // find if the img really exists
                    await stdReadFile( imgPathname );
                    const key = idGenerator();
                    formUpload( imgPathname, key );
                    return true;
                } catch {
                    throw READ_EMBED_IMG_ERROR;
                }
            } else {
                throw IMG_SHOULD_BE_IN_ASSETS;
            }
        }
    }
    return false;
};
const startWithPackName = new TreatNode( startWithPackNameStatus, null );

// replace the local img to cloud url ( https:// http:// ftp:// www. will no be replaced )
const compileMDContent = async ( content, packnPath ) => {
    return content;
};
module.exports = { compileMDContent };