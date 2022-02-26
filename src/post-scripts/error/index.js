class BaseError {
    message = ""
    // 0 for no error
    code = 0
    constructor( message, code ) {
        this.message = message;
        this.code = code;
    }
};
const ErrorCodeSet = {
    IDX_MD_NO_FOUND: 1,
    PACK_NO_FOUND: 2,
    READ_IDX_MD_ERROR: 3,
    READ_EMBED_IMG_ERROR: 4,
    IMG_SHOULD_BE_IN_ASSETS: 5
};
const ErrorMessageSet = {
    IDX_MD_NO_FOUND: "index.md no found in the pack",
    PACK_NO_FOUND: "the specificed pack no found, input correct pathname",
    READ_IDX_MD_ERROR: "error emit when read markdown file",
    READ_EMBED_IMG_ERROR: "read img error when loading markdown's embeded img",
    IMG_SHOULD_BE_IN_ASSETS: "please put the imgs into the packname/assets/"
};
const MD_NO_FOUND_ERROR = new BaseError( ErrorCodeSet.IDX_MD_NO_FOUND, ErrorMessageSet.IDX_MD_NO_FOUND ); 
const PACK_NO_FOUND_ERROR = new BaseError( ErrorCodeSet.PACK_NO_FOUND, ErrorMessageSet.PACK_NO_FOUND ); 
const READ_IDX_MD_ERROR = new BaseError( ErrorCodeSet.READ_IDX_MD_ERROR, ErrorMessageSet.READ_IDX_MD_ERROR );
const READ_EMBED_IMG_ERROR = new BaseError( ErrorCodeSet.READ_EMBED_IMG_ERROR, ErrorMessageSet.READ_EMBED_IMG_ERROR );
const IMG_SHOULD_BE_IN_ASSETS = new BaseError( ErrorCodeSet.IMG_SHOULD_BE_IN_ASSETS, ErrorMessageSet.IMG_SHOULD_BE_IN_ASSETS );
module.exports = {
    BaseError,
    MD_NO_FOUND_ERROR,
    PACK_NO_FOUND_ERROR,
    READ_IDX_MD_ERROR,
    READ_EMBED_IMG_ERROR,
    IMG_SHOULD_BE_IN_ASSETS
};