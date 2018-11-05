
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'translatemycommi-1541318377656';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
const text = '第一次提交';
// The target language
const target = 'en';

// Translates some text into Russian
export default async function(){
    await translate
        .translate(text, target)
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
