export function setupManage() {
    const form = document.getElementById('card-form');
    const loadCardsButton = document.getElementById('load-cards');
    const cardsContainer = document.getElementById('cards-container');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;

        fetch('http://localhost:3000/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question, answer })
        })
            .then(response => response.json())
            .then(card => {
                displayCard(card, cardsContainer);
                form.reset();
            })
            .catch(error => console.error('Error:', error));
    });

    loadCardsButton.addEventListener('click', () => {
        fetch('http://localhost:3000/api/cards')
            .then(response => response.json())
            .then(cards => {
                cardsContainer.innerHTML = '';
                cards.forEach(card => displayCard(card, cardsContainer));
            })
            .catch(error => console.error('Error:', error));
    });
}

function displayCard(card, container) {
    const cardElement = document.createElement('article');
    cardElement.innerHTML = `
        <header>
            <h3>${card.question}</h3>
        </header>
        <p>${card.answer}</p>
    `;
    container.appendChild(cardElement);
}
