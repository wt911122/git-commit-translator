
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'translatemycommi-1541318377656';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
//const text = '第一次提交';
// The target language
const target = 'en';

const checkgitmoji = function(text){
    const gitmoji = /^:[a-zA-Z_]:/.exec(text);
    if(gitmoji){
        const l = gitmoji[0].length;
        return {
            gitmoji: text.substring(0, l),
            raw: text.substring(l+1)
        }
    }
    return {
        raw: text
    }
}

// Translates some text into Russian
module.exports = function(text){
    const {
        raw,
        gitmoji
    } = checkgitmoji(text);
    return translate
        .translate(raw, target)
        .then(results => {
            const translation = results[0];

            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);
            return {
                source: text,
                result: translation,
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}
