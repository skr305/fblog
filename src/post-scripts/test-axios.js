const axios = require( 'axios' );

axios.get( "www.baidu.com").then( res => {
    console.log( res );
} ).catch( err => {
    console.log( err );
} );