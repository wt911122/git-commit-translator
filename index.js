
'use strict';
const fs = require('fs');
const program = require('commander');
const translate = require('./src/translate');
const format = function(rslt, engFirst){
    const {
        raw,
        result,
        gitmoji
    } = rslt;
    if(engFirst) {
        return `${gitmoji} ${result.trim()} cn: ${raw.trim()} \n\n`;
    }
    return `${gitmoji} ${raw.trim()} en: ${result.trim()} \n\n`;
}
async function resolve(projectid, engFirst){
    try{
        const messagefile = process.env.HUSKY_GIT_PARAMS;
        const messagefromhusky = fs.readFileSync(messagefile, { encoding: 'utf-8' });
        const result = await translate(projectid, messagefromhusky);
        const msg = format(result, engFirst);
        fs.writeFileSync(messagefile, msg, { encoding: 'utf-8' });
    }catch(err){
        console.log(err)
        throw err;
    }

}
program
    .option('-p, --project-id', 'Google Project ID')
    .option('-e, --eng-first', 'English First')
    .parse(process.argv);
if(!program.projectId){
    console.error('translate: google projectId is needed');
    process.exit(1);
}
const engFirst = !!program.engFirst || false;
resolve(program.projectId, engFirst).catch(()=>{process.exit(1);})