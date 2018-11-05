
'use strict';
const read = require('@commitlint/read');
const translate = require('./src/translate');
async function resolve(){
    try{
        const message = await read({edit: true});
        const result = await translate(message);
        console.log(result);
    }catch(err){
        throw err;
    }

}

resolve().finally(() => {
    process.exit(1);
});
