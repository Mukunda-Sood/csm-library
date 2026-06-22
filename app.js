/* ═══════════════════════════════════════════════════════════════════
   CSMS Skills Library — Application Logic
   - Loads config.json and skills.json from data/
   - Renders cards, handles filtering, modal, ratings
   - Ratings stored in localStorage (per user/browser)
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────
const STATE = {
  skills: [],
  filteredSkills: [],
  searchQuery: '',
  activeTool: '',
  activeGroup: '',
  activeTask: '',
  activeTag: '',
  activeItem: null,
};

// ─────────────────────────────────────────────
// DOM refs (populated on DOMContentLoaded)
// ─────────────────────────────────────────────
let DOM = {};

// ─────────────────────────────────────────────
// Initialise
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  DOM = {
    skillsCount:      document.getElementById('skills-count'),
    searchInput:      document.getElementById('search-input'),
    searchClear:      document.getElementById('search-clear'),
    toolFilter:       document.getElementById('tool-filter'),
    groupFilter:      document.getElementById('group-filter'),
    taskFilter:       document.getElementById('task-filter'),
    tagFilter:        document.getElementById('tag-filter'),
    cardsGrid:        document.getElementById('cards-grid'),
    emptyState:       document.getElementById('empty-state'),
    resetFilters:     document.getElementById('reset-filters'),
    modalOverlay:     document.getElementById('modal-overlay'),
    modal:            document.getElementById('modal'),
    modalClose:       document.getElementById('modal-close'),
    modalToolBadge:   document.getElementById('modal-tool-badge'),
    modalGroupBadge:  document.getElementById('modal-group-badge'),
    modalTaskBadge:   document.getElementById('modal-task-badge'),
    modalVersion:     document.getElementById('modal-version'),
    modalTitle:       document.getElementById('modal-title'),
    modalAuthor:      document.getElementById('modal-author'),
    modalDate:        document.getElementById('modal-date'),
    modalTags:        document.getElementById('modal-tags'),
    skillDescription: document.getElementById('modal-skill-description'),
    skillFilename:    document.getElementById('skill-filename'),
    skillContent:     document.getElementById('modal-skill-content'),
    downloadBtn:      document.getElementById('download-btn'),
    ratingStars:      document.getElementById('rating-stars'),
    communityRating:  document.getElementById('community-rating'),
    ratingFeedback:   document.getElementById('rating-feedback'),
    submitSkillBtn:   document.getElementById('submit-skill-btn'),
  };

  bindEvents();
  await loadData();
});

// ─────────────────────────────────────────────
// Load Data
// ─────────────────────────────────────────────
async function loadData() {
  try {
    const [configRes, skillsRes] = await Promise.all([
      fetch('data/config.json'),
      fetch('data/skills.json'),
    ]);
    const config     = await configRes.json();
    STATE.skills     = await skillsRes.json();

    populateConfigFilters(config);

    // Wire "Submit a Skill" button from config.repoUrl
    if (config.repoUrl && DOM.submitSkillBtn) {
      const issueUrl = `${config.repoUrl.replace(/\/$/, '')}/issues/new?template=skill-submission.yml`;
      DOM.submitSkillBtn.addEventListener('click', () => {
        window.open(issueUrl, '_blank', 'noopener,noreferrer');
      });
    } else if (DOM.submitSkillBtn) {
      DOM.submitSkillBtn.disabled = true;
      DOM.submitSkillBtn.title = 'Submission not yet configured.';
    }
  } catch (err) {
    console.error('Failed to load data files. Make sure you are running a local server.', err);
    STATE.skills = [];
  }

  populateTagFilter();
  applyFilters();
}

// ─────────────────────────────────────────────
// Populate filter dropdowns from config.json
// ─────────────────────────────────────────────
function populateConfigFilters(config) {
  (config.tools || []).forEach(tool => {
    const opt = document.createElement('option');
    opt.value = tool;
    opt.textContent = tool;
    DOM.toolFilter.appendChild(opt);
  });

  (config.customerGroups || []).forEach(group => {
    const opt = document.createElement('option');
    opt.value = group;
    opt.textContent = group;
    DOM.groupFilter.appendChild(opt);
  });

  (config.tasks || []).forEach(task => {
    const opt = document.createElement('option');
    opt.value = task;
    opt.textContent = task;
    DOM.taskFilter.appendChild(opt);
  });
}

// ─────────────────────────────────────────────
// Populate Tag filter from skill data
// ─────────────────────────────────────────────
function populateTagFilter() {
  const tags = [...new Set(STATE.skills.flatMap(s => s.tags || []))].sort();
  tags.forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    DOM.tagFilter.appendChild(opt);
  });
}

// ─────────────────────────────────────────────
// Filter Logic
// ─────────────────────────────────────────────
function applyFilters() {
  const q     = STATE.searchQuery.toLowerCase().trim();
  const tool  = STATE.activeTool.toLowerCase();
  const group = STATE.activeGroup.toLowerCase();
  const task  = STATE.activeTask.toLowerCase();
  const tag   = STATE.activeTag.toLowerCase();

  STATE.filteredSkills = STATE.skills.filter(item => {
    // Only show approved skills; items with no status field are shown for backward-compat
    if (item.status && item.status !== 'approved') return false;

    const inSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      (item.author || '').toLowerCase().includes(q) ||
      (item.tags || []).some(t => t.toLowerCase().includes(q));

    const inTool  = !tool  || (item.tool || '').toLowerCase() === tool;
    const inGroup = !group || (item.customerGroup || '').toLowerCase() === group;
    const inTask  = !task  || (item.task || '').toLowerCase() === task;
    const inTag   = !tag   || (item.tags || []).map(t => t.toLowerCase()).includes(tag);

    return inSearch && inTool && inGroup && inTask && inTag;
  });

  renderCards();
}

// ─────────────────────────────────────────────
// Render Cards
// ─────────────────────────────────────────────
function renderCards() {
  const approvedTotal = STATE.skills.filter(s => !s.status || s.status === 'approved').length;
  DOM.skillsCount.textContent = approvedTotal;

  DOM.cardsGrid.innerHTML = '';

  if (STATE.filteredSkills.length === 0) {
    DOM.emptyState.classList.remove('hidden');
    return;
  }

  DOM.emptyState.classList.add('hidden');
  STATE.filteredSkills.forEach(item => {
    DOM.cardsGrid.appendChild(createCard(item));
  });
}

// ─────────────────────────────────────────────
// Create Card Element
// ─────────────────────────────────────────────
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${item.title}`);

  const userRating    = getUserRating(item.id);
  const displayRating = userRating || item.communityRating || 0;
  const ratingCount   = item.ratingCount || 0;

  const initials = (item.author || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const dateStr  = formatDate(item.dateAdded);

  const tagsHtml = (item.tags || []).slice(0, 3)
    .map(t => `<span class="badge badge--tag">${escHtml(t)}</span>`).join('');

  const versionHtml = item.version
    ? `<span class="card-version">v${escHtml(item.version)}</span>` : '';

  const groupHtml = item.customerGroup
    ? `<span class="badge badge--group">${escHtml(item.customerGroup)}</span>` : '';

  const taskHtml = item.task
    ? `<span class="badge badge--task">${escHtml(item.task)}</span>` : '';

  const ctaArrow = `<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  card.innerHTML = `
    <div class="card-accent"></div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">${escHtml(item.title)}</h3>
        ${versionHtml}
      </div>
      <p class="card-description">${escHtml(item.description || '')}</p>
      <div class="card-badges">
        <span class="badge badge--tool">${escHtml(item.tool || '')}</span>
        ${groupHtml}
        ${taskHtml}
        ${tagsHtml}
      </div>
      <div class="card-rating">
        ${starsDisplayHtml(displayRating)}
        <span class="rating-score">${displayRating.toFixed(1)}</span>
        <span class="rating-count">(${ratingCount})</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-author">
        <div class="author-avatar">${escHtml(initials)}</div>
        <div class="author-info">
          <span class="author-name">${escHtml(item.author || 'Unknown')}</span>
          <span class="author-date">${dateStr}</span>
        </div>
      </div>
      <button class="card-cta">View Skill ${ctaArrow}</button>
    </div>
  `;

  card.addEventListener('click', () => openModal(item));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(item); });

  return card;
}

// ─────────────────────────────────────────────
// Open Modal
// ─────────────────────────────────────────────
async function openModal(item) {
  STATE.activeItem = item;

  DOM.modalToolBadge.textContent  = item.tool || '';
  DOM.modalGroupBadge.textContent = item.customerGroup || '';
  DOM.modalTaskBadge.textContent  = item.task || '';

  DOM.modalGroupBadge.classList.toggle('hidden', !item.customerGroup);
  DOM.modalTaskBadge.classList.toggle('hidden', !item.task);

  if (item.version) {
    DOM.modalVersion.textContent = `v${item.version}`;
    DOM.modalVersion.classList.remove('hidden');
  } else {
    DOM.modalVersion.classList.add('hidden');
  }

  DOM.modalTitle.textContent  = item.title;
  DOM.modalAuthor.textContent = item.author || 'Unknown';
  DOM.modalDate.textContent   = formatDate(item.dateAdded);

  DOM.modalTags.innerHTML = (item.tags || [])
    .map(t => `<span class="badge badge--tag">${escHtml(t)}</span>`).join('');

  DOM.skillDescription.textContent = item.description || '';
  DOM.skillFilename.textContent    = item.filename || '';
  DOM.skillContent.textContent     = 'Loading…';

  if (item.filename) {
    try {
      const res  = await fetch(`skill-files/${item.filename}`);
      const text = await res.text();
      DOM.skillContent.textContent = text;
    } catch {
      DOM.skillContent.textContent = '(Could not load skill file. Check that the file exists in skill-files/)';
    }
  } else if (item.content) {
    DOM.skillContent.textContent = item.content;
  }

  DOM.downloadBtn.onclick = () => downloadSkillFile(item);

  const userRating = getUserRating(item.id);
  renderModalStars(userRating);
  const cr = item.communityRating || 0;
  const rc = item.ratingCount || 0;
  DOM.communityRating.textContent = rc > 0
    ? `Community avg: ${cr.toFixed(1)} (${rc} ratings)` : 'No community ratings yet';
  DOM.ratingFeedback.textContent = userRating
    ? `You rated this ${userRating} star${userRating !== 1 ? 's' : ''}` : '';

  DOM.modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => DOM.modalClose.focus(), 80);
}

// ─────────────────────────────────────────────
// Close Modal
// ─────────────────────────────────────────────
function closeModal() {
  DOM.modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  STATE.activeItem = null;
}

// ─────────────────────────────────────────────
// Download Skill File
// ─────────────────────────────────────────────
function downloadSkillFile(item) {
  const content  = DOM.skillContent.textContent;
  const filename = item.filename || `${item.id}.md`;
  const blob     = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url      = URL.createObjectURL(blob);
  const a        = document.createElement('a');
  a.href         = url;
  a.download     = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// Star Rating — Modal
// ─────────────────────────────────────────────
function renderModalStars(selected) {
  const stars = DOM.ratingStars.querySelectorAll('.star');
  stars.forEach(star => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle('selected', val <= selected);
    star.classList.remove('hovered');
  });
}

function bindStarEvents() {
  const stars = DOM.ratingStars.querySelectorAll('.star');

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value, 10);
      stars.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.value, 10) <= val));
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });

    star.addEventListener('click', () => {
      const val  = parseInt(star.dataset.value, 10);
      const item = STATE.activeItem;
      if (!item) return;

      saveUserRating(item.id, val);
      renderModalStars(val);
      DOM.ratingFeedback.textContent = `You rated this ${val} star${val !== 1 ? 's' : ''}. Thank you!`;
      applyFilters();
    });
  });
}

// ─────────────────────────────────────────────
// Ratings — localStorage
// ─────────────────────────────────────────────
const RATINGS_KEY = 'csms_skills_ratings';

function loadRatings() {
  try { return JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}'); }
  catch { return {}; }
}

function saveUserRating(id, value) {
  const ratings = loadRatings();
  ratings[id] = value;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

function getUserRating(id) {
  return loadRatings()[id] || 0;
}

// ─────────────────────────────────────────────
// Helper — Stars Display HTML
// ─────────────────────────────────────────────
function starsDisplayHtml(rating) {
  let html = '<div class="stars-display">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="s${i <= Math.round(rating) ? ' filled' : ''}">&#9733;</span>`;
  }
  html += '</div>';
  return html;
}

// ─────────────────────────────────────────────
// Helper — Format Date
// ─────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─────────────────────────────────────────────
// Helper — Escape HTML
// ─────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────────
// Bind Events
// ─────────────────────────────────────────────
function bindEvents() {
  DOM.searchInput.addEventListener('input', () => {
    STATE.searchQuery = DOM.searchInput.value;
    DOM.searchClear.classList.toggle('hidden', !STATE.searchQuery);
    applyFilters();
  });

  DOM.searchClear.addEventListener('click', () => {
    DOM.searchInput.value = '';
    STATE.searchQuery = '';
    DOM.searchClear.classList.add('hidden');
    applyFilters();
    DOM.searchInput.focus();
  });

  DOM.toolFilter.addEventListener('change', () => {
    STATE.activeTool = DOM.toolFilter.value;
    applyFilters();
  });

  DOM.groupFilter.addEventListener('change', () => {
    STATE.activeGroup = DOM.groupFilter.value;
    applyFilters();
  });

  DOM.taskFilter.addEventListener('change', () => {
    STATE.activeTask = DOM.taskFilter.value;
    applyFilters();
  });

  DOM.tagFilter.addEventListener('change', () => {
    STATE.activeTag = DOM.tagFilter.value;
    applyFilters();
  });

  DOM.resetFilters.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.toolFilter.value  = '';
    DOM.groupFilter.value = '';
    DOM.taskFilter.value  = '';
    DOM.tagFilter.value   = '';
    STATE.searchQuery = '';
    STATE.activeTool  = '';
    STATE.activeGroup = '';
    STATE.activeTask  = '';
    STATE.activeTag   = '';
    DOM.searchClear.classList.add('hidden');
    applyFilters();
  });

  DOM.modalClose.addEventListener('click', closeModal);
  DOM.modalOverlay.addEventListener('click', e => {
    if (e.target === DOM.modalOverlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !DOM.modalOverlay.classList.contains('hidden')) closeModal();
  });

  bindStarEvents();
}
