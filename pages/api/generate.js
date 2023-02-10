import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const promptPrefix = `You are an assistant that specializes in high
frequency amplifiers.`;

const generateAction = async (req, res) => {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${promptPrefix}\n${req.body.userInput}\n`,
      temperature: 0.4,
      max_tokens: 250,
    });

    const output = completion.data.choices.pop();

    res.status(200).json({output: output});

  } catch(error) {
    return new Error('Something went wrong!')
  }
};

export default generateAction;