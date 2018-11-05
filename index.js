
'use strict';
const fs = require('fs');
const translate = require('./src/translate');
const format = function(rslt){
    const {
        source,
        result
    } = rslt;

    return `${source[0].trim()}en: ${result.trim()} \n\n`;
}
async function resolve(){
    try{
        // console.log(process.env.HUSKY_GIT_PARAMS);
        const messagefile =process.env.HUSKY_GIT_PARAMS;
        const messagefromhusky = fs.readFileSync(messagefile, { encoding: 'utf-8' });
        console.log(messagefromhusky);
        const result = await translate(messagefromhusky);
        const msg = format(result);
        console.log(msg)
        fs.writeFileSync(messagefile, msg, { encoding: 'utf-8' });
        process.exit(1);
    }catch(err){
        console.log(err)
        throw err;
    }

}
resolve().catch(()=>{process.exit(1);})
// resolve().finally(() => {
//     process.exit(1);
// });
