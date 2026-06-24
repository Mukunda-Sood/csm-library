/* ═══════════════════════════════════════════════════════════════════
   CSM Skills Library — Application Logic
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

let DOM = {};

// ─────────────────────────────────────────────
// Initialise
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  DOM = {
    skillsCount:     document.getElementById('skills-count'),
    searchInput:     document.getElementById('search-input'),
    searchClear:     document.getElementById('search-clear'),
    toolFilter:      document.getElementById('tool-filter'),
    groupFilter:     document.getElementById('group-filter'),
    taskFilter:      document.getElementById('task-filter'),
    tagFilter:       document.getElementById('tag-filter'),
    cardsGrid:       document.getElementById('cards-grid'),
    emptyState:      document.getElementById('empty-state'),
    resetFilters:    document.getElementById('reset-filters'),
    modalOverlay:    document.getElementById('modal-overlay'),
    modal:           document.getElementById('modal'),
    modalClose:      document.getElementById('modal-close'),
    modalToolBadge:  document.getElementById('modal-tool-badge'),
    modalGroupBadge: document.getElementById('modal-group-badge'),
    modalTaskBadge:  document.getElementById('modal-task-badge'),
    modalVersion:    document.getElementById('modal-version'),
    modalTitle:      document.getElementById('modal-title'),
    modalAuthor:     document.getElementById('modal-author'),
    modalDate:       document.getElementById('modal-date'),
    modalTags:       document.getElementById('modal-tags'),
    skillDescription:document.getElementById('modal-skill-description'),
    downloadBtn:     document.getElementById('download-btn'),
    downloadZipBtn:  document.getElementById('download-zip-btn'),
    onePagerBtn:     document.getElementById('one-pager-btn'),
    ratingStars:     document.getElementById('rating-stars'),
    communityRating: document.getElementById('community-rating'),
    ratingFeedback:  document.getElementById('rating-feedback'),
    submitSkillBtn:  document.getElementById('submit-skill-btn'),
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
    const config = await configRes.json();
    STATE.skills = await skillsRes.json();

    populateConfigFilters(config);

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
// Populate filter dropdowns
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
  STATE.filteredSkills.forEach(item => DOM.cardsGrid.appendChild(createCard(item)));
}

// ─────────────────────────────────────────────
// Create Card
// ─────────────────────────────────────────────
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${item.title}`);

  // Ratings: prefer user's own rating for the display, fall back to community
  const userRating    = getUserRating(item.id);
  const displayRating = userRating || item.communityRating || 0;
  const ratingCount   = item.ratingCount || 0;

  const initials = (item.author || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const tagsHtml = (item.tags || []).slice(0, 3)
    .map(t => `<span class="badge badge--tag">${escHtml(t)}</span>`).join('');

  const hasOnePager = !!item.onePagerUrl;

  card.innerHTML = `
    <div class="card-accent"></div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">${escHtml(item.title)}</h3>
        ${item.version ? `<span class="card-version">v${escHtml(item.version)}</span>` : ''}
      </div>
      <p class="card-description">${escHtml(item.description || '')}</p>
      <div class="card-badges">
        <span class="badge badge--tool">${escHtml(item.tool || '')}</span>
        ${item.customerGroup ? `<span class="badge badge--group">${escHtml(item.customerGroup)}</span>` : ''}
        ${item.task ? `<span class="badge badge--task">${escHtml(item.task)}</span>` : ''}
        ${tagsHtml}
      </div>
    </div>
    <div class="card-footer">
      <div class="card-author">
        <div class="author-avatar">${escHtml(initials)}</div>
        <span class="author-name">${escHtml(item.author || 'Unknown')}</span>
      </div>
      <div class="card-actions">
        ${hasOnePager ? `
          <button class="card-btn card-btn--outline one-pager-card-btn" title="View One-Pager">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            One-Pager
          </button>` : ''}
        <button class="card-btn card-btn--primary download-card-btn" title="Download skill file">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Download
        </button>
      </div>
    </div>
    <div class="card-rating-bar">
      ${starsDisplayHtml(displayRating)}
      <span class="rating-score">${displayRating > 0 ? displayRating.toFixed(1) : '—'}</span>
      ${ratingCount > 0 ? `<span class="rating-count">(${ratingCount})</span>` : ''}
    </div>
  `;

  // Card click → open modal (but not when clicking action buttons)
  card.addEventListener('click', e => {
    if (e.target.closest('.card-btn')) return;
    openModal(item);
  });
  card.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.card-btn')) openModal(item);
  });

  // Download button on card
  card.querySelector('.download-card-btn').addEventListener('click', e => {
    e.stopPropagation();
    downloadSkillFile(item);
  });

  // One-pager button on card (only rendered if url exists)
  const onePagerCardBtn = card.querySelector('.one-pager-card-btn');
  if (onePagerCardBtn) {
    onePagerCardBtn.addEventListener('click', e => {
      e.stopPropagation();
      window.open(item.onePagerUrl, '_blank', 'noopener,noreferrer');
    });
  }

  return card;
}

// ─────────────────────────────────────────────
// Open Modal
// ─────────────────────────────────────────────
function openModal(item) {
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

  DOM.modalTitle.textContent   = item.title;
  DOM.modalAuthor.textContent  = item.author || 'Unknown';
  DOM.modalDate.textContent    = formatDate(item.dateAdded);
  DOM.modalTags.innerHTML      = (item.tags || [])
    .map(t => `<span class="badge badge--tag">${escHtml(t)}</span>`).join('');
  DOM.skillDescription.textContent = item.description || '';

  // Download .md — use originalFilename if available so user gets the real name
  DOM.downloadBtn.onclick = () => downloadSkillFile(item);

  // Download zip — only show if zipFilename exists
  if (item.zipFilename) {
    DOM.downloadZipBtn.classList.remove('hidden');
    DOM.downloadZipBtn.onclick = () => downloadZipFile(item);
  } else {
    DOM.downloadZipBtn.classList.add('hidden');
  }

  // One-pager button — show only if url exists
  if (item.onePagerUrl) {
    DOM.onePagerBtn.classList.remove('hidden');
    DOM.onePagerBtn.onclick = () => window.open(item.onePagerUrl, '_blank', 'noopener,noreferrer');
  } else {
    DOM.onePagerBtn.classList.add('hidden');
  }

  // Ratings
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
// Download Skill File (.md)
// ─────────────────────────────────────────────
async function downloadSkillFile(item) {
  if (!item.filename) return;
  try {
    const res  = await fetch(`skill-files/${item.filename}`);
    const text = await res.text();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    // Derive a clean .md filename — strip any original extension and use .md
    const baseName = (item.originalFilename || item.filename).replace(/\.[^.]+$/, '');
    a.download = baseName + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    alert('Could not download the skill file. Please try again later.');
  }
}

// ─────────────────────────────────────────────
// Download Full Package (.zip)
// ─────────────────────────────────────────────
async function downloadZipFile(item) {
  if (!item.zipFilename) return;
  try {
    const res  = await fetch(`skill-files/${item.zipFilename}`);
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    // Use originalFilename (the zip name) if available, otherwise fall back
    a.download = item.originalFilename || item.zipFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    alert('Could not download the zip package. Please try again later.');
  }
}

// ─────────────────────────────────────────────
// Star Rating — Modal
// ─────────────────────────────────────────────
function renderModalStars(selected) {
  DOM.ratingStars.querySelectorAll('.star').forEach(star => {
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
const RATINGS_KEY = 'csm_skills_ratings';

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
// Helpers
// ─────────────────────────────────────────────
function starsDisplayHtml(rating) {
  let html = '<div class="stars-display">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="s${i <= Math.round(rating) ? ' filled' : ''}">&#9733;</span>`;
  }
  return html + '</div>';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

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

  DOM.toolFilter.addEventListener('change',  () => { STATE.activeTool  = DOM.toolFilter.value;  applyFilters(); });
  DOM.groupFilter.addEventListener('change', () => { STATE.activeGroup = DOM.groupFilter.value; applyFilters(); });
  DOM.taskFilter.addEventListener('change',  () => { STATE.activeTask  = DOM.taskFilter.value;  applyFilters(); });
  DOM.tagFilter.addEventListener('change',   () => { STATE.activeTag   = DOM.tagFilter.value;   applyFilters(); });

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
  DOM.modalOverlay.addEventListener('click', e => { if (e.target === DOM.modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !DOM.modalOverlay.classList.contains('hidden')) closeModal();
  });

  bindStarEvents();
}
