fetch('https://ciauback.onrender.com/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: taQuestion })
})
.then(response => response.json())
.then(data => {
  // ici, tu affiches data.answer dans la réponse collective
})
.catch(error => {
  console.error('Erreur:', error);
});
