
'use strict';
const read = require('@commitlint/read');
const translate = require('./src/translate');
const format = function(rslt){
    const {
        source,
        result
    } = rslt;
    return `${source} / ${result}`;
}
async function resolve(){
    try{
        const message = await read({edit: true});
        const result = await translate(message);
        console.log(format(result));
        process.stdout.write(format(result))
        process.exit(1);
    }catch(err){
        process.exit(1);
        throw err;
    }

}
resolve();
// resolve().finally(() => {
//     process.exit(1);
// });
