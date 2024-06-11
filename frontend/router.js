const routes = {
    home: `
        <h2>Welcome to Anki App</h2>
        <p>Select an option from the menu to get started.</p>
    `,
    study: `
        <h2>Study Cards</h2>
        <form id="study-form">
            <label for="numCards">Number of cards:</label>
            <input type="number" id="numCards" name="numCards" min="1" max="20" required>
            <button type="submit" class="primary">Start Studying</button>
        </form>
        <div id="study-container"></div>
    `,
    manage: `
        <h2>Manage Cards</h2>
        <form id="card-form">
            <div>
                <label for="question">Question:</label>
                <input type="text" id="question" name="question" required>
            </div>
            <div>
                <label for="answer">Answer:</label>
                <input type="text" id="answer" name="answer" required>
            </div>
            <button type="submit" class="primary">Add Card</button>
        </form>
        <button id="load-cards" class="secondary">Load Cards</button>
        <div id="cards-container"></div>
    `
};

function navigate(route) {
    const app = document.getElementById('app');
    app.innerHTML = routes[route];
    if (route === 'study') {
        setupStudy();
    } else if (route === 'manage') {
        setupManage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            navigate(route);
        });
    });

    navigate('home');
});

function setupStudy() {
    const form = document.getElementById('study-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numCards = document.getElementById('numCards').value;
        localStorage.setItem('numCards', numCards);
        loadCardsForStudy(numCards);
    });
}

function setupManage() {
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
