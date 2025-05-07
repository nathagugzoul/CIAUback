const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Backend CIAU en ligne');
});

// Config OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // ATTENTION : ajoute ta clé dans Render
});
const openai = new OpenAIApi(configuration);

// Endpoint pour recevoir la question et renvoyer la réponse
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: question,
      max_tokens: 150,
    });
    res.json({ answer: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’appel à OpenAI' });
  }
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
