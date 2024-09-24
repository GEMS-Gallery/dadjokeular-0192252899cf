import Random "mo:base/Random";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor DadJokeGenerator {
    stable var jokes : [Text] = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I'm afraid for the calendar. Its days are numbered.",
        "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!",
        "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? He was outstanding in his field.",
        "Why don't eggs tell jokes? They'd crack each other up.",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
        "Why do programmers prefer dark mode? Light attracts bugs!"
    ];

    var seed : Nat = 123456789;

    // Simple pseudo-random number generator
    func nextRandom() : Nat {
        seed := (1103515245 * seed + 12345) % (2**31);
        seed
    };

    public query func getRandomJoke() : async Text {
        Debug.print("getRandomJoke called");
        let jokeCount = jokes.size();
        if (jokeCount == 0) {
            Debug.print("No jokes available");
            return "Sorry, I'm all out of jokes!";
        };

        let randomIndex = nextRandom() % jokeCount;
        
        Debug.print("Returning joke at index: " # debug_show(randomIndex));
        jokes[randomIndex]
    };

    public func addJoke(newJoke : Text) : async () {
        jokes := Array.append(jokes, [newJoke]);
        Debug.print("New joke added. Total jokes: " # debug_show(jokes.size()));
    };

    // Update the seed periodically to increase randomness
    public func updateSeed() : async () {
        seed := Nat.abs(Time.now());
    };
}
