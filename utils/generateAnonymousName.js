const adjectives = [
    "Anonymous", "Mysterious", "Invisible", "Hidden", "Secret", "Unknown", 
    "Cryptic", "Masked", "Obscure", "Enigmatic"
];

const nouns = [
    "Panda", "Tiger", "Eagle", "Wizard", "Square", "Galaxy", "Voyager", 
    "Phoenix", "Shadow", "Traveler", "Specter", "Whisper", "Hawk", "Knight", "Fox"
];


export default function generateAnonymousName() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
}
