// ================================
// Local Storage Key
// ================================
const USER_KEY = "vocaBoost_user";

// ================================
// DOM Elements
// ================================
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const avatar = document.getElementById("avatar");
const streakEl = document.getElementById("streak");
const wordsEl = document.getElementById("wordsLearned");

// ================================
// Load User Data
// ================================
function loadUserProfile() {
    const storedUser = localStorage.getItem(USER_KEY);
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user) {
        userName.textContent = user.name || "Guest";
        userEmail.textContent = user.email || "Not available";

        avatar.textContent = user.name
            ? user.name.charAt(0).toUpperCase()
            : "G";

        streakEl.textContent = user.streak ?? 0;
        wordsEl.textContent = user.wordsLearned ?? 0;
    } else {
        // Guest fallback
        userName.textContent = "Guest";
        userEmail.textContent = "Not logged in";
        avatar.textContent = "G";
        streakEl.textContent = 0;
        wordsEl.textContent = 0;
    }
}

// ================================
// Logout
// ================================
function logout() {
    localStorage.removeItem(USER_KEY);
    window.location.href = "login.html";
}

// ================================
// Init
// ================================
document.addEventListener("DOMContentLoaded", loadUserProfile);
