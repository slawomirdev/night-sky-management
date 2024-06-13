export function setupManage() {
    const form = document.getElementById('card-form');
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

    loadCards();

    function loadCards() {
        fetch('http://localhost:3000/api/cards')
            .then(response => response.json())
            .then(cards => {
                cardsContainer.innerHTML = '';
                cards.forEach(card => displayCard(card, cardsContainer));
            })
            .catch(error => console.error('Error:', error));
    }

    function displayCard(card, container) {
        const cardElement = document.createElement('article');
        cardElement.classList.add('manage-card');
        cardElement.innerHTML = `
            <header>
                <h3>${card.question}</h3>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </header>
            <p>${card.answer}</p>
        `;
        container.appendChild(cardElement);

        const editButton = cardElement.querySelector('.edit');
        const deleteButton = cardElement.querySelector('.delete');

        editButton.addEventListener('click', () => {
            const newQuestion = prompt('Edit question:', card.question);
            const newAnswer = prompt('Edit answer:', card.answer);

            if (newQuestion && newAnswer) {
                fetch(`http://localhost:3000/api/cards/${card.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question: newQuestion, answer: newAnswer })
                })
                    .then(response => response.json())
                    .then(updatedCard => {
                        cardElement.querySelector('h3').textContent = updatedCard.question;
                        cardElement.querySelector('p').textContent = updatedCard.answer;
                    })
                    .catch(error => console.error('Error:', error));
            }
        });

        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this card?')) {
                fetch(`http://localhost:3000/api/cards/${card.id}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        cardElement.remove();
                    })
                    .catch(error => console.error('Error:', error));
            }
        });
    }
}
