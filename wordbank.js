// --- Fetch Words from words.json ---
async function fetchAllWords() {
    try {
        const res = await fetch('words.json');
        if (!res.ok) throw new Error('Failed to load words.json');
        const data = await res.json();
        return data.sort((a,b) => a.word.localeCompare(b.word));
    } catch(err) {
        console.error(err);
        return [];
    }
}

// --- Display Cards ---
function displayWordBank(words) {
    const container = document.getElementById('wordBankContainer');
    container.innerHTML = '';

    if(words.length === 0) {
        container.innerHTML = '<p class="placeholder">No words available yet.</p>';
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${word.word}</h2>
            <p class="ipa">${word.ipa}</p>
            <p><strong>Meaning:</strong> ${word.meaning}</p>
            <p><strong>Example:</strong> ${word.example}</p>
        `;
        container.appendChild(card);
    });
}

// --- Search Filter ---
function setupSearch(words) {
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        const filtered = words.filter(w => w.word.toLowerCase().includes(query));
        displayWordBank(filtered);
    });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', async () => {
    const allWords = await fetchAllWords();
    displayWordBank(allWords);
    setupSearch(allWords);
});
