const got = require('got');
require('dotenv').config();

//api key will be in discord at some point
const apiKey = process.env.OPENAI_API_KEY;

//Consider this the inputs passed through the function call, but defined here as though this is the 'input'
const theme = 'pirate';
const chore = 'Do the dishes';


async function callGPT(chore, theme) {
  //Prompt function, so that it can pass the variables of 'chore' and 'theme' in a return() to chatGPT
  const prompt = `Hello!`;
  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const params = {
    // "model": "text-davinci-003",
    "prompt": generatePrompt(animal),
    "temperature": 0.6,
  };
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = `${prompt}\n${response.choices[0].text}`;
    console.log(output);
  } catch (err) {
    console.log(err);
  }
};

callGPT(chore, theme);