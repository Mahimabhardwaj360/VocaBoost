// --- Local Storage Keys ---
const USER_KEY = 'vocaBoost_user'; // Stores {name, email}
// NOTE: We do NOT use an 'isLoggedIn' key to force a login every time.

// --- Utility Functions ---

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return data; 
    }
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// --- Tab Switching Logic (For the HTML tabs) ---

function switchTab(targetTabId) {
    const tabs = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.add('hidden-form'));

    const activeTab = document.querySelector(`[data-tab="${targetTabId}"]`);
    const activeForm = document.getElementById(`${targetTabId}Form`);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeForm) activeForm.classList.remove('hidden-form');
}

// --- Form Submission Handlers ---

/**
 * Handles the Sign Up form submission.
 */
function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim(); // Validation placeholder

    if (!name || !email || !password) {
        alert("Please fill in all fields to sign up.");
        return;
    }

    // Store User Details for future retrieval on the Home page.
    const userData = { name: name, email: email };
    saveToLocalStorage(USER_KEY, userData);

    alert("Account created successfully. Please login.");

    // Switch to the Login tab
    switchTab('login');
}

/**
 * Handles the Login form submission.
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const storedUser = loadFromLocalStorage(USER_KEY);

    // Check if the entered email matches the previously stored user email.
    if (storedUser && storedUser.email === email) {
        // SUCCESS: Redirect to home page. No session flag is set.
        window.location.href = './home.html';
    } else {
        alert("Login failed. User not found. Please Sign Up first.");
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Note: No check for existing login is performed here. User always sees the form.
    
    // 1. Setup Tab Switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // 2. Setup Form Submission Listeners
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }
});