import { Configuration, OpenAIApi } from "openai";

//Taken as boilerplate from the OpenAI quickstart for Node module and revised to suit the application's needs.
//Credit: https://platform.openai.com/docs/quickstart 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  const chore = req.body.chore || '';
  if (chore.trim().length === 0) {
    res.status(400).json({
      error: { message: "Please enter a valid chore" }
    });
    return;
  }

  const theme = req.body.theme || '';
  if (theme.trim().length === 0) {
    res.status(400).json({
      error: { message: "Please enter a valid theme" }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 0.75,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
  function generatePrompt(chore, theme) {
    return `Write me a quest about ${chore}, as if it was written by a ${theme}.`
  }
}


