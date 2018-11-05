
'use strict';
const fs = require('fs');
const program = require('commander');
const translate = require('./src/translate');
const format = function(rslt){
    console.log(rslt)
    const {
        source,
        result
    } = rslt;

    return `${source.trim()} en: ${result.trim()} \n\n`;
}
async function resolve(projectid){
    try{
        const messagefile =process.env.HUSKY_GIT_PARAMS;
        const messagefromhusky = fs.readFileSync(messagefile, { encoding: 'utf-8' });
        const result = await translate(projectid, messagefromhusky);
        const msg = format(result);
        fs.writeFileSync(messagefile, msg, { encoding: 'utf-8' });
    }catch(err){
        console.log(err)
        throw err;
    }

}
program
    .option('-p, --project-id', 'Google Project ID')
    .parse(process.argv);
if(!program.projectId){
    console.error('translate: google projectId is needed');
    process.exit(1);
}
resolve(program.projectId).catch(()=>{process.exit(1);})
// resolve().finally(() => {
//     process.exit(1);
// });
