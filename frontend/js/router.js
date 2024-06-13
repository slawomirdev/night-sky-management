import { setupStudy } from './study.js';
import { setupManage } from './manage.js';

const routes = {
    home: `
      <section class="container">
                <h1>Welcome to Anki App</h1>
                <h2>Your personal flashcard system</h2>
            <p>With Anki App, you can:</p>
            <ul>
                <li>Create custom flashcards</li>
                <li>Study your cards using spaced repetition</li>
                <li>Manage your flashcard collection with ease</li>
            </ul>
            <p>Select an option from the menu to get started.</p>
        </section>
    `,
    study: `
        <h2>Study Cards</h2>
        <form id="study-form">
            <label for="numCards">Number of cards:</label>
            <input type="number" id="numCards" name="numCards" min="1" max="20" required>
            <button type="submit" class="primary">Start Studying</button>
        </form>
        <div id="study-container">
            <div class="drop-zone"></div>
        </div>
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
        <div id="cards-container" class="manage-container"></div>
    `
};

export function navigate(route) {
    const app = document.getElementById('app');
    app.innerHTML = routes[route];
    if (route === 'study') {
        setupStudy();
    } else if (route === 'manage') {
        setupManage();
    }
}
