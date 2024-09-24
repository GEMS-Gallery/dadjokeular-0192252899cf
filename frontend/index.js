import { Actor, HttpAgent } from "@dfinity/agent";

const agent = new HttpAgent();
const canisterId = process.env.BACKEND_CANISTER_ID;

// This is a simplified representation of the interface
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getRandomJoke': IDL.Func([], [IDL.Text], []),
    'addJoke': IDL.Func([IDL.Text], [], [])
  });
};

const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: canisterId,
});

document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const generateJokeButton = document.getElementById('generate-joke');

    async function getJoke() {
        jokeText.textContent = 'Loading...';
        generateJokeButton.disabled = true;

        try {
            const joke = await backend.getRandomJoke();
            jokeText.textContent = joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeText.textContent = 'Oops! Failed to fetch a joke. Try again later.';
        } finally {
            generateJokeButton.disabled = false;
        }
    }

    generateJokeButton.addEventListener('click', getJoke);
});
