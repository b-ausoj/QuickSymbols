// App state
let currentTab = 'symbols';
let currentDataset = symbols;
let filteredItems = [...symbols];

// DOM elements
const searchInput = document.getElementById('searchInput');
const symbolGrid = document.getElementById('symbolGrid');
const toast = document.getElementById('toast');
const resultsCount = document.getElementById('resultsCount');
const tabButtons = document.querySelectorAll('.tab-button');

// Placeholder text based on tab
const placeholders = {
    symbols: 'Search for symbols (e.g., arrow left, gamma, infinity)...',
    emojis: 'Search for emojis (e.g., smile, heart, fire, thumbs up)...'
};

// Initialize app
function init() {
    renderItems(filteredItems);
    setupEventListeners();
    registerServiceWorker();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Event delegation for symbol cards - single listener for all cards
    symbolGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.symbol-card');
        if (card) {
            const symbol = card.getAttribute('data-symbol');
            copyToClipboard(symbol, card);
        }
    });
}

// Switch between tabs
function switchTab(tab) {
    currentTab = tab;

    // Update active tab button
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update dataset
    currentDataset = tab === 'symbols' ? symbols : emojis;

    // Update placeholder
    searchInput.placeholder = placeholders[tab];

    // Clear search and show all items
    searchInput.value = '';
    filteredItems = [...currentDataset];
    renderItems(filteredItems);
}

// Handle search input
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        // Show all cards
        const allCards = symbolGrid.querySelectorAll('.symbol-card');
        allCards.forEach(card => card.classList.remove('hidden'));
        filteredItems = [...currentDataset];
    } else {
        // Split query into individual words
        const searchWords = query.split(/\s+/);

        // Filter and update visibility
        filteredItems = [];
        const allCards = symbolGrid.querySelectorAll('.symbol-card');

        allCards.forEach((card, index) => {
            const item = currentDataset[index];
            const matches = searchWords.every(searchWord =>
                item.names.some(name => name.toLowerCase().includes(searchWord))
            );

            if (matches) {
                card.classList.remove('hidden');
                filteredItems.push(item);
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateResultsCount();
}

// Update results count display
function updateResultsCount() {
    const itemType = currentTab === 'symbols' ? 'symbol' : 'emoji';
    const itemTypePlural = itemType + 's';
    const query = searchInput.value.trim();

    // Handle no results case
    let noResultsDiv = symbolGrid.querySelector('.no-results');

    if (filteredItems.length === 0) {
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.textContent = `No ${itemTypePlural} found. Try a different search term.`;
            symbolGrid.appendChild(noResultsDiv);
        }
        resultsCount.textContent = '';
    } else {
        // Remove no results message if it exists
        if (noResultsDiv) {
            noResultsDiv.remove();
        }

        // Update count
        if (query) {
            resultsCount.textContent = `Found ${filteredItems.length} ${filteredItems.length !== 1 ? itemTypePlural : itemType}`;
        } else {
            resultsCount.textContent = `${filteredItems.length} ${itemTypePlural} available`;
        }
    }
}

// Render items to grid
function renderItems(itemsToRender) {
    const itemType = currentTab === 'symbols' ? 'symbol' : 'emoji';
    const itemTypePlural = itemType + 's';

    if (itemsToRender.length === 0) {
        symbolGrid.innerHTML = `<div class="no-results">No ${itemTypePlural} found. Try a different search term.</div>`;
        resultsCount.textContent = '';
        return;
    }

    // Update results count
    const query = searchInput.value.trim();
    if (query) {
        resultsCount.textContent = `Found ${itemsToRender.length} ${itemsToRender.length !== 1 ? itemTypePlural : itemType}`;
    } else {
        resultsCount.textContent = `${itemsToRender.length} ${itemTypePlural} available`;
    }

    symbolGrid.innerHTML = itemsToRender.map(item => {
        const primaryName = item.names[0];
        const altNames = item.names.slice(1).join(', ');

        return `
            <div class="symbol-card" data-symbol="${item.symbol}" title="${item.names.join(', ')}">
                <div class="symbol">${item.symbol}</div>
                <div class="symbol-name">${primaryName}</div>
                ${altNames ? `<div class="symbol-alt-names">${altNames}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Copy to clipboard
async function copyToClipboard(text, element) {
    try {
        await navigator.clipboard.writeText(text);
        showToast();
        animateCard(element);
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        fallbackCopy(text);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textarea);
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Animate card on click
function animateCard(element) {
    element.classList.add('copied');
    setTimeout(() => {
        element.classList.remove('copied');
    }, 300);
}

// Register service worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus search on '/' key and select all text
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }

    // Clear search on Escape
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        handleSearch({ target: searchInput });
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
