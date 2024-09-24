import { Actor, HttpAgent } from "@dfinity/agent";

const canisterId = process.env.BACKEND_CANISTER_ID || window.canisterId;

if (!canisterId) {
  console.error("Canister ID not set. Please check your environment configuration.");
}

const agent = new HttpAgent({ host: process.env.DFX_NETWORK || "http://localhost:8000" });

// Fetch root key for certificate validation during development
if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getRandomJoke': IDL.Func([], [IDL.Text], ["query"]),
    'addJoke': IDL.Func([IDL.Text], [], []),
    'updateSeed': IDL.Func([], [], [])
  });
};

const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: canisterId,
});

document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const generateJokeButton = document.getElementById('generate-joke');

    if (!generateJokeButton) {
      console.error("Generate joke button not found in the DOM");
      return;
    }

    async function getJoke() {
        jokeText.textContent = 'Loading...';
        generateJokeButton.disabled = true;

        try {
            console.log("Fetching joke...");
            const joke = await backend.getRandomJoke();
            console.log("Joke received:", joke);
            jokeText.textContent = joke;
            
            // Update the seed after fetching a joke
            await backend.updateSeed();
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeText.textContent = 'Oops! Failed to fetch a joke. Try again later.';
        } finally {
            generateJokeButton.disabled = false;
        }
    }

    generateJokeButton.addEventListener('click', getJoke);
    console.log("Event listener attached to generate joke button");
});
