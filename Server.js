const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend CIAU en ligne');
});

app.post('/ask', (req, res) => {
  const { question } = req.body;
  const reponse = `Réponse collective IC : "${question}" implique une exploration collective de la vérité.`;
  res.json({ reponse });
});

app.listen(PORT, () => {
  console.log(`Serveur backend en ligne sur le port ${PORT}`);
});
