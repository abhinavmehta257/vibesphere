const adjectives = [
    "Anonymous", "Mysterious", "Invisible", "Hidden", "Secret", "Unknown", 
    "Cryptic", "Masked", "Obscure", "Enigmatic",
    "Silent", "Phantom", "Ghostly", "Cloaked", "Veiled", "Forgotten",
    "Cunning", "Illusive", "Arcane", "Elusive",
    "Veiled", "Nameless", "Sable", "Ethereal", "Furtive",
    "Obscured", "Dim", "Wraithlike", "Subtle", "Esoteric",
    "Shrouded", "Lost", "Inconspicuous", "Transient", "Eclipse",
    "Spectral", "Intangible", "Twilight", "Nebulous", "Vanish",
    "Whimsical", "Otherworldly", "Unseen", "Starlit", "Darkened",
    "Pale", "Bizarre", "Lurking", "Creeping", "Surreal"
];

const nouns = [
    "Panda", "Tiger", "Eagle", "Wizard", "Square", "Galaxy", "Voyager", 
    "Phoenix", "Shadow", "Traveler", "Specter", "Whisper", "Hawk", "Knight", "Fox",
    "Mystic", "Dragon", "Raven", "Wanderer", "Dancer", "Fable", 
    "Glimmer", "Echo", "Whirlwind", "Sphinx", "Mermaid", "Oracle",
    "Banshee", "Ninja", "Frost", "Mist", "Gale", "Vortex", "Pirate",
    "Hunter", "Seeker", "Thief", "Guardian", "Jester", "Golem",
    "Scribe", "Sorcerer", "Gladiator", "Baron", "Empress", "Chimera",
    "Crusader", "Knight", "Pathfinder", "Sorceress", "Vampire", "Reaper",
    "Sailor", "Frostbite", "Wisp", "Witch", "Rogue", "Sage", "Druid",
    "Nomad", "Wraith", "Fang", "Serpent", "Titan", "Owl", "Valkyrie",
    "Beast", "Crimson", "Wanderlust", "Nebula", "Skull", "Titan", "Demon"
];



export default function generateAnonymousName() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    // Generate additional variations
    const variations = [
        `${randomAdjective} ${randomNoun}`,
        `${randomNoun} ${randomAdjective}`,
        `${randomAdjective.charAt(0)}. ${randomNoun}`, // Initial for adjective
        `${randomAdjective.toLowerCase()}_${randomNoun}`, // Lowercase with underscore
        `${randomAdjective}-${randomNoun}`, // Hyphenated
        `${randomAdjective} ${randomNoun.toLowerCase()}`, // Adjective with noun in lowercase
        `${randomNoun.toUpperCase()}_${randomAdjective}`, // Noun in uppercase
        `${randomAdjective.toLowerCase()} ${randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1)}`, // Lowercase adjective, capitalized noun
        `${randomAdjective.substring(0, 3)}-${randomNoun.substring(0, 3)}` // Shortened versions
    ];
    
    // Select a random variation
    return variations[Math.floor(Math.random() * variations.length)];
}