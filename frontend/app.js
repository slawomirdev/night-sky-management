function loadCardsForStudy(numCards) {
    fetch('http://localhost:3000/api/cards')
        .then(response => response.json())
        .then(cards => {
            const studyContainer = document.getElementById('study-container');
            studyContainer.innerHTML = '';
            const selectedCards = cards.sort(() => 0.5 - Math.random()).slice(0, numCards);
            selectedCards.forEach(card => {
                const cardElement = document.createElement('article');
                cardElement.classList.add('card');
                cardElement.innerHTML = `
                    <header>
                        <h3>${card.question}</h3>
                    </header>
                    <p class="blur">${card.answer}</p>
                    <button class="reveal">Reveal Answer</button>
                `;
                studyContainer.appendChild(cardElement);

                const revealButton = cardElement.querySelector('.reveal');
                revealButton.addEventListener('click', () => {
                    const answer = cardElement.querySelector('p');
                    answer.classList.remove('blur');
                    revealButton.style.display = 'none';
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('numCards')) {
        loadCardsForStudy(localStorage.getItem('numCards'));
    }
});
