const _ = require( 'lodash' );

const idGenerator = () => _.uniqueId( `${new Date().getTime()}`.split("").reverse().join("") );
const genIDWithPrefix = ( prefix ) => _.uniqueId( `${prefix}-${new Date().getTime()}`.split("").reverse().join("") );
module.exports = {
    idGenerator,
    genIDWithPrefix
};
