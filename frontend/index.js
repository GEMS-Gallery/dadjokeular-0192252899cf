import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const generateJokeButton = document.getElementById('generate-joke');

    async function getJoke() {
        try {
            const joke = await backend.getRandomJoke();
            jokeText.textContent = joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeText.textContent = 'Oops! Failed to fetch a joke. Try again later.';
        }
    }

    generateJokeButton.addEventListener('click', getJoke);
});
