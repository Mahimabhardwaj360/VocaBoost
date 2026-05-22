// ===== VOCABOOST — APP.JS =====

// ── STATE ──
const state = {
  currentPage: 'home',
  streak: 0,
  stats: { learned: 0, mastered: 0, quizzes: 0, correct: 0, total: 0 },
  mastered: new Set(),

  // Flashcards
  fc: { cards: [], index: 0, category: 'all' },

  // Quiz
  quiz: {
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    selectedCategories: new Set(['all']),
  },

  // Library
  lib: { filter: 'all', search: '' },
};

// ── PERSISTENCE ──
function saveState() {
  try {
    localStorage.setItem('vb_stats', JSON.stringify(state.stats));
    localStorage.setItem('vb_streak', String(state.streak));
    localStorage.setItem('vb_mastered', JSON.stringify([...state.mastered]));
  } catch (_) {}
}
function loadState() {
  try {
    const stats = localStorage.getItem('vb_stats');
    if (stats) state.stats = JSON.parse(stats);
    const streak = localStorage.getItem('vb_streak');
    if (streak) state.streak = parseInt(streak, 10);
    const mastered = localStorage.getItem('vb_mastered');
    if (mastered) state.mastered = new Set(JSON.parse(mastered));
  } catch (_) {}
}

// ── NAVIGATION ──
function navigate(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector('[data-page="' + page + '"]').classList.add('active');
  if (page === 'flashcards') initFlashcards();
  if (page === 'library') renderLibrary();
  if (page === 'quiz') renderQuizSetup();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.page));
});

// ── TOAST ──
let toastTimer;
function showToast(msg, emoji = '') {
  const t = document.getElementById('toast');
  t.textContent = (emoji ? emoji + ' ' : '') + msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ── HOME PAGE ──
function initHome() {
  // Word of the day — stable per calendar day
  const dayIndex = Math.floor(Date.now() / 86400000) % WORDS.length;
  const wotd = WORDS[dayIndex];
  document.getElementById('wotd-word').textContent = wotd.word;
  document.getElementById('wotd-phonetic').textContent = wotd.phonetic;
  document.getElementById('wotd-pos').textContent = wotd.pos;
  document.getElementById('wotd-def').textContent = wotd.definition;
  document.getElementById('wotd-example').textContent = '"' + wotd.example + '"';

  // Stats
  document.getElementById('stat-learned').textContent = state.stats.learned;
  document.getElementById('stat-mastered').textContent = state.mastered.size;
  document.getElementById('stat-quizzes').textContent = state.stats.quizzes;
  const acc = state.stats.total > 0
    ? Math.round((state.stats.correct / state.stats.total) * 100) + '%'
    : '—';
  document.getElementById('stat-accuracy').textContent = acc;
  document.getElementById('streak-count').textContent = state.streak;

  // Categories
  const grid = document.getElementById('categories-grid');
  grid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = WORDS.filter(w => w.category === cat.id).length;
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `<div class="cat-icon">${cat.icon}</div>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-count">${count} words</div>`;
    card.addEventListener('click', () => {
      state.fc.category = cat.id;
      navigate('flashcards');
    });
    grid.appendChild(card);
  });
}

// ── FLASHCARDS ──
function getFilteredCards() {
  if (state.fc.category === 'all') return [...WORDS];
  return WORDS.filter(w => w.category === state.fc.category);
}

function initFlashcards() {
  state.fc.cards = shuffle(getFilteredCards());
  state.fc.index = 0;

  // Render filter buttons
  const row = document.getElementById('fc-filter-row');
  row.innerHTML = '';
  const allBtn = makeFilterBtn('All', 'all', state.fc.category === 'all', () => {
    state.fc.category = 'all';
    initFlashcards();
  });
  row.appendChild(allBtn);
  CATEGORIES.forEach(cat => {
    const btn = makeFilterBtn(cat.name, cat.id, state.fc.category === cat.id, () => {
      state.fc.category = cat.id;
      initFlashcards();
    });
    row.appendChild(btn);
  });

  renderCard();
}

function makeFilterBtn(label, id, active, onClick) {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (active ? ' active' : '');
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

function renderCard() {
  const { cards, index } = state.fc;
  if (!cards.length) return;
  const card = cards[index];

  // Unfold card
  document.getElementById('flashcard-inner').classList.remove('flipped');

  // Fill content
  const cat = CATEGORIES.find(c => c.id === card.category);
  document.getElementById('fc-category').textContent = cat ? cat.icon + ' ' + cat.name : '';
  document.getElementById('fc-word').textContent = card.word;
  document.getElementById('fc-phonetic').textContent = card.phonetic;
  document.getElementById('fc-pos').textContent = card.pos;
  document.getElementById('fc-definition').textContent = card.definition;
  document.getElementById('fc-example').textContent = '"' + card.example + '"';

  // Progress
  const pct = ((index + 1) / cards.length) * 100;
  document.getElementById('fc-progress-fill').style.width = pct + '%';
  document.getElementById('fc-progress-text').textContent =
    'Card ' + (index + 1) + ' of ' + cards.length;
}

function flipCard() {
  document.getElementById('flashcard-inner').classList.toggle('flipped');
}

function rateCard(rating) {
  const card = state.fc.cards[state.fc.index];
  if (rating === 'easy') {
    state.mastered.add(card.id);
    state.stats.mastered = state.mastered.size;
    showToast('Marked as mastered!', '✅');
  } else if (rating === 'hard') {
    showToast('Added to review pile!', '😓');
  } else {
    showToast('Keep practicing!', '🤔');
  }
  state.stats.learned = Math.max(state.stats.learned, state.fc.index + 1);
  saveState();
  nextCard();
}

function nextCard() {
  if (state.fc.index < state.fc.cards.length - 1) {
    state.fc.index++;
    renderCard();
  } else {
    showToast('Deck complete! Great work 🎉', '');
  }
}

function prevCard() {
  if (state.fc.index > 0) {
    state.fc.index--;
    renderCard();
  }
}

document.getElementById('fc-next').addEventListener('click', nextCard);
document.getElementById('fc-prev').addEventListener('click', prevCard);

// ── QUIZ ──
function renderQuizSetup() {
  document.getElementById('quiz-setup').classList.remove('hidden');
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');

  const grid = document.getElementById('quiz-cat-grid');
  grid.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'quiz-cat-btn' + (state.quiz.selectedCategories.has('all') ? ' selected' : '');
  allBtn.textContent = 'All Categories';
  allBtn.addEventListener('click', () => {
    state.quiz.selectedCategories.clear();
    state.quiz.selectedCategories.add('all');
    renderQuizSetup();
  });
  grid.appendChild(allBtn);
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'quiz-cat-btn' + (state.quiz.selectedCategories.has(cat.id) ? ' selected' : '');
    btn.textContent = cat.icon + ' ' + cat.name;
    btn.addEventListener('click', () => {
      state.quiz.selectedCategories.delete('all');
      if (state.quiz.selectedCategories.has(cat.id)) {
        state.quiz.selectedCategories.delete(cat.id);
        if (state.quiz.selectedCategories.size === 0) {
          state.quiz.selectedCategories.add('all');
        }
      } else {
        state.quiz.selectedCategories.add(cat.id);
      }
      renderQuizSetup();
    });
    grid.appendChild(btn);
  });
}

function startQuiz() {
  let pool = state.quiz.selectedCategories.has('all')
    ? [...WORDS]
    : WORDS.filter(w => state.quiz.selectedCategories.has(w.category));

  if (pool.length < 4) {
    showToast('Need at least 4 words in a category!', '⚠️');
    return;
  }

  pool = shuffle(pool);
  const questions = pool.slice(0, Math.min(10, pool.length)).map(word => {
    const distractors = shuffle(WORDS.filter(w => w.id !== word.id))
      .slice(0, 3)
      .map(w => w.definition);
    const choices = shuffle([word.definition, ...distractors]);
    return { word, correct: word.definition, choices };
  });

  state.quiz.questions = questions;
  state.quiz.index = 0;
  state.quiz.score = 0;
  state.quiz.answered = false;
  state.stats.quizzes++;
  saveState();

  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const { questions, index } = state.quiz;
  if (index >= questions.length) { showResult(); return; }
  const q = questions[index];
  state.quiz.answered = false;

  document.getElementById('quiz-word').textContent = q.word.word;
  document.getElementById('quiz-qnum').textContent = 'Q' + (index + 1) + ' / ' + questions.length;
  document.getElementById('quiz-score').textContent = state.quiz.score;

  const pct = (index / questions.length) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';

  const choicesEl = document.getElementById('quiz-choices');
  choicesEl.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(btn, choice, q.correct));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(btn, choice, correct) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  state.stats.total++;

  const allBtns = document.querySelectorAll('.quiz-choice');
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add('correct');
  });

  if (choice === correct) {
    btn.classList.add('correct');
    state.quiz.score++;
    state.stats.correct++;
    showToast('Correct!', '🎉');
  } else {
    btn.classList.add('wrong');
    showToast('Incorrect — the right answer is highlighted.', '❌');
  }

  saveState();
  setTimeout(() => {
    state.quiz.index++;
    renderQuestion();
  }, 1400);
}

function showResult() {
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');

  const { score, questions } = state.quiz;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  document.getElementById('result-score-big').textContent = score + ' / ' + total;

  let emoji, title, msg;
  if (pct === 100) {
    emoji = '🏆'; title = 'Perfect Score!'; msg = 'You crushed it. Absolute vocabulary royalty.';
  } else if (pct >= 80) {
    emoji = '🌟'; title = 'Excellent!'; msg = 'You\'re really getting the hang of this!';
  } else if (pct >= 60) {
    emoji = '👏'; title = 'Good Job!'; msg = 'Solid performance. A bit more practice and you\'ll nail it.';
  } else if (pct >= 40) {
    emoji = '📚'; title = 'Keep Studying!'; msg = 'Review the flashcards and try again!';
  } else {
    emoji = '💪'; title = 'Don\'t Give Up!'; msg = 'Every expert was once a beginner. Keep going!';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-msg').textContent = msg;
}

// ── LIBRARY ──
function renderLibrary() {
  // Filter buttons
  const filters = document.getElementById('lib-filters');
  filters.innerHTML = '';
  const allF = makeFilterBtn('All', 'all', state.lib.filter === 'all', () => {
    state.lib.filter = 'all'; renderLibrary();
  });
  filters.appendChild(allF);
  CATEGORIES.forEach(cat => {
    const f = makeFilterBtn(cat.icon + ' ' + cat.name, cat.id, state.lib.filter === cat.id, () => {
      state.lib.filter = cat.id; renderLibrary();
    });
    filters.appendChild(f);
  });

  filterLibrary();
}

function filterLibrary() {
  const search = (document.getElementById('lib-search').value || '').toLowerCase();
  const filter = state.lib.filter;
  let words = WORDS;
  if (filter !== 'all') words = words.filter(w => w.category === filter);
  if (search) words = words.filter(w =>
    w.word.toLowerCase().includes(search) ||
    w.definition.toLowerCase().includes(search)
  );

  const grid = document.getElementById('lib-grid');
  grid.innerHTML = '';
  if (!words.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;padding:20px 0;">No words found.</p>';
    return;
  }
  words.forEach(w => {
    const cat = CATEGORIES.find(c => c.id === w.category);
    const isMastered = state.mastered.has(w.id);
    const card = document.createElement('div');
    card.className = 'lib-word-card';
    card.innerHTML = `
      ${isMastered ? '<span class="lw-mastered">★ Mastered</span>' : ''}
      <div class="lw-top">
        <div class="lw-word">${w.word}</div>
        <div class="lw-cat">${cat ? cat.icon + ' ' + cat.name : ''}</div>
      </div>
      <div class="lw-phonetic">${w.phonetic}</div>
      <div class="lw-def">${w.definition}</div>
    `;
    card.addEventListener('click', () => {
      state.fc.category = w.category;
      const idx = shuffle(WORDS.filter(x => x.category === w.category)).findIndex(x => x.id === w.id);
      navigate('flashcards');
      if (idx >= 0) { state.fc.index = idx; renderCard(); }
    });
    grid.appendChild(card);
  });
}

// ── HELPERS ──
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', e => {
  if (state.currentPage === 'flashcards') {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === ' ') { e.preventDefault(); flipCard(); }
    if (e.key === '1') rateCard('hard');
    if (e.key === '2') rateCard('ok');
    if (e.key === '3') rateCard('easy');
  }
});

// ── BOOT ──
loadState();
initHome();
