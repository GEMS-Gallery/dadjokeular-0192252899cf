import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Random "mo:base/Random";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";

actor DadJokeGenerator {
    // Stable variable to store jokes
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

    // Function to get a random joke
    public func getRandomJoke() : async Text {
        let jokeCount = jokes.size();
        if (jokeCount == 0) {
            return "Sorry, I'm all out of jokes!";
        };
        let randomBytes = await Random.blob();
        let randomIndex = Random.rangeFrom(Nat8.fromNat(jokeCount), randomBytes);
        jokes[randomIndex]
    };

    // Function to add a new joke
    public func addJoke(newJoke : Text) : async () {
        jokes := Array.append(jokes, [newJoke]);
    };
}
