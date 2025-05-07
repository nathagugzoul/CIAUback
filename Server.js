import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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'
});

app.post('/ask', async (req, res) => {
  try {
    const question = req.body.question;
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'gpt-3.5-turbo'
    });
    const answer = completion.choices[0].message.content.trim();
    res.json({ reponse: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reponse: "Erreur lors de l'appel OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
