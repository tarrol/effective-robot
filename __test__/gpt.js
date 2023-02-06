const { LogTimings } = require('concurrently');
const got = require('got');
require('dotenv').config();

//api key will be in discord at some point
const apiKey = process.env.OPENAI_API_KEY;

//Consider this the inputs passed through the function call, but defined here as though this is the 'input'
const theme = 'pirate';
const chore = 'dust the living room';


async function callGPT(chore, theme) {
  //Prompt function, so that it can pass the variables of 'chore' and 'theme' in a return() to chatGPT
  const prompt = `Write me a videogame style quest about the task "${chore}" as if it was written by a ${theme}.`;
  const url = 'https://api.openai.com/v1/completions';
  const params = {
    "model": "text-davinci-003",
    "prompt": `${prompt}`,
    "max_tokens": 50,
    "temperature": 0.6
  };
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    const gptOutput = response.choices[0].text;
    //console.log(response.choices[0].text); //text output
    //console.log(typeof (response.choices[0].text)); //string output

  } catch (err) {
    console.log(err);
  }
};

callGPT(chore, theme);

module.exports = callGPT();