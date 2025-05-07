document.getElementById('question-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;

    fetch('https://ciauback.onrender.com/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.response;
        const history = document.getElementById('history');
        const item = document.createElement('li');
        item.textContent = question;
        history.appendChild(item);
    })
    .catch(error => {
        console.error('Erreur :', error);
        document.getElementById('response').innerText = 'Erreur lors de la réponse collective.';
    });
});
