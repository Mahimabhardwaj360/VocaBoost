
const USER_KEY = "vocaBoost_user";
const SHOWN_WORDS_KEY = "shownWords";
const REVISION_HISTORY_KEY = "revisionHistory";

// ================================
// Utility Functions
// ================================
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

async function fetchWords() {
    try {
        const response = await fetch("words.json");
        if (!response.ok) throw new Error("Failed to load words.json");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// ================================
// USER ACTIVITY LOGIC
// ================================
function updateStreak() {
    const storedUser = loadFromLocalStorage(USER_KEY);
    if (!storedUser) return;

    const user = storedUser;
    const today = new Date().toISOString().split("T")[0];

    // STREAK LOGIC
    if (!user.lastActive) {
        user.streak = 1;
    } else if (user.lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDate = yesterday.toISOString().split("T")[0];

        user.streak =
            user.lastActive === yDate
                ? (user.streak || 0) + 1
                : 1;
    }

    user.lastActive = today;

    saveToLocalStorage(USER_KEY, user);
}

function incrementWordsLearnedOnReveal() {
    const storedUser = loadFromLocalStorage(USER_KEY);
    if (!storedUser) return;

    const user = storedUser;
    const today = new Date().toISOString().split("T")[0];

    // Increment only once per day
    if (user.lastWordDate !== today) {
        user.wordsLearned = (user.wordsLearned || 0) + 1;
        user.lastWordDate = today;
        saveToLocalStorage(USER_KEY, user);
        console.log("✅ Words learned updated:", user.wordsLearned);
    }
}

// ================================
// UI Functions
// ================================
function displayUserName() {
    const user = loadFromLocalStorage(USER_KEY);
    const welcomeEl = document.getElementById("welcomeMessage");

    if (!welcomeEl) return;

    if (user && user.name) {
        welcomeEl.textContent = `Welcome, ${user.name}!`;
    } else {
        welcomeEl.textContent = "Welcome, Guest!";
    }
}

function displayDate() {
    const dateEl = document.getElementById("wordDate");
    if (!dateEl) return;

    const today = new Date();
    dateEl.textContent = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function displayWordDetails(word) {
    const revealedContent = document.getElementById("revealedContent");
    if (!revealedContent) return;

    revealedContent.innerHTML = `
        <h2>${word.word}</h2>
        <p class="ipa">${word.ipa}</p>
        <p><strong>Meaning:</strong> ${word.meaning}</p>
        <p><strong>Example:</strong> ${word.example}</p>
    `;
}

// ================================
// Word of the Day Logic
// ================================
function getOrCreateWordOfTheDay(allWords) {
    const today = new Date().toISOString().split("T")[0];

    let shownWords = loadFromLocalStorage(SHOWN_WORDS_KEY);
    if (!Array.isArray(shownWords)) shownWords = [];

    let revisionHistory = loadFromLocalStorage(REVISION_HISTORY_KEY);
    if (!Array.isArray(revisionHistory)) revisionHistory = [];

    const todayEntry = shownWords.find(item => item.date === today);
    if (todayEntry) {
        const word = allWords.find(w => w.id === todayEntry.wordId) || null;
        // Update streak & words even if word already exists today
        updateStreak();
        incrementWordsLearnedOnReveal();
        return word;
    }

    const usedWordIds = new Set(shownWords.map(item => item.wordId));
    const availableWords = allWords.filter(word => !usedWordIds.has(word.id));

    if (availableWords.length === 0) {
        return {
            word: "Congratulations!",
            ipa: "🎉",
            meaning: "You’ve completed all words.",
            example: "Come back later for more."
        };
    }

    const newWord = availableWords[Math.floor(Math.random() * availableWords.length)];

    // Save to shownWords
    shownWords.push({
        date: today,
        wordId: newWord.id
    });
    saveToLocalStorage(SHOWN_WORDS_KEY, shownWords);

    // Save to revision history
    revisionHistory.unshift({
        id: newWord.id,
        word: newWord.word,
        ipa: newWord.ipa,
        meaning: newWord.meaning,
        example: newWord.example,
        date: today,
        status: null
    });
    saveToLocalStorage(REVISION_HISTORY_KEY, revisionHistory);

    // Update streak & words
    updateStreak();
    incrementWordsLearnedOnReveal();

    return newWord;
}

// ================================
// Event Handlers
// ================================
async function handleCardClick() {
    const wordCard = document.getElementById("wordCard");
    const clickHint = document.getElementById("clickHint");

    if (!wordCard || wordCard.classList.contains("revealed")) return;

    const allWords = await fetchWords();
    const word = getOrCreateWordOfTheDay(allWords);

    if (word) {
        displayWordDetails(word);

        wordCard.classList.remove("initial-state");
        wordCard.classList.add("revealed");
        if (clickHint) clickHint.style.display = "none";
    }
}

// ================================
// Initialization
// ================================
document.addEventListener("DOMContentLoaded", () => {
    displayUserName();
    displayDate();

    const wordCard = document.getElementById("wordCard");
    if (wordCard) {
        wordCard.addEventListener("click", handleCardClick);
    }
});
