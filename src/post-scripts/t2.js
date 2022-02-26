const reader = require( './file/std-read' );
const pat = /\!\[[\s\S]*?\]\([\s\S]*?\)/g;
const text = reader.stdReadFile( "./t2.md" ).then( res => {
    const treated = res.replace( pat, "---------img---------" );
    console.log( treated );
} );