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
    apiKey: process.env.OPENAI_API_KEY, // ATTENTION : assure-toi que ta clé est bien dans ton .env
});
const openai = new OpenAIApi(configuration);

// Endpoint pour recevoir la question et renvoyer la réponse
app.post('/ask', async (req, res) => {
    const question = req.body.question;

    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 150,
        });

        res.json({ answer: completion.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la requête OpenAI' });
    }
});

// Démarrage serveur
app.listen(port, () => {
    console.log(`Serveur backend en ligne sur le port ${port}`);
});
