
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Instantiates a client
const target = 'en';

const checkgitmoji = function(text){
    const gitmoji = /^\:[a-zA-Z_]+\:/.exec(text);
    if(gitmoji){
        const l = gitmoji[0].length;
        return {
            gitmoji: text.substring(0, l),
            raw: text.substring(l, text.length)
        }
    }
    return {
        raw: text
    }
}

module.exports = async function(projectid, text){
    const translate = new Translate({
        projectId: projectid,
    });
    const {
        raw,
        gitmoji
    } = checkgitmoji(text);

    return translate
        .translate(raw, target)
        .then(results => {
            const translation = results[0];
            return {
                raw: raw,
                result: translation,
                gitmoji
            }
        })
}
