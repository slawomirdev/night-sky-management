import { addDragFunctionality } from './card.js';

export function setupStudy() {
    const form = document.getElementById('study-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const numCards = document.getElementById('numCards').value;
        localStorage.setItem('numCards', numCards);
        loadCardsForStudy(numCards);
    });

    if (localStorage.getItem('numCards')) {
        loadCardsForStudy(localStorage.getItem('numCards'));
    }
}

function loadCardsForStudy(numCards) {
    fetch('http://localhost:3000/api/cards')
        .then(response => response.json())
        .then(cards => {
            const studyContainer = document.getElementById('study-container');
            if (studyContainer) {
                studyContainer.innerHTML = '';
                const selectedCards = cards.sort(() => 0.5 - Math.random()).slice(0, numCards);
                selectedCards.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    cardElement.style.zIndex = selectedCards.length - index;
                    cardElement.innerHTML = `
                        <div class="card-inner">
                            <div class="card-front">
                                <header>
                                    <h3>${card.question}</h3>
                                </header>
                                <button class="reveal">Reveal Answer</button>
                            </div>
                            <div class="card-back">
                                <p>${card.answer}</p>
                                <button class="reveal-back">Show Question</button>
                            </div>
                        </div>
                    `;
                    studyContainer.appendChild(cardElement);

                    const revealButton = cardElement.querySelector('.reveal');
                    revealButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        cardElement.querySelector('.card-inner').classList.add('is-flipped');
                    });

                    const revealBackButton = cardElement.querySelector('.reveal-back');
                    revealBackButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        cardElement.querySelector('.card-inner').classList.remove('is-flipped');
                    });

                    addDragFunctionality(cardElement);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}
