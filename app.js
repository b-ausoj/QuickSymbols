// App state
let filteredSymbols = [...symbols];

// DOM elements
const searchInput = document.getElementById('searchInput');
const symbolGrid = document.getElementById('symbolGrid');
const toast = document.getElementById('toast');
const resultsCount = document.getElementById('resultsCount');

// Initialize app
function init() {
    renderSymbols(filteredSymbols);
    setupEventListeners();
    registerServiceWorker();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
}

// Handle search input
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        filteredSymbols = [...symbols];
    } else {
        filteredSymbols = symbols.filter(item => {
            return item.names.some(name => name.toLowerCase().includes(query));
        });
    }

    renderSymbols(filteredSymbols);
}

// Render symbols to grid
function renderSymbols(symbolsToRender) {
    if (symbolsToRender.length === 0) {
        symbolGrid.innerHTML = '<div class="no-results">No symbols found. Try a different search term.</div>';
        resultsCount.textContent = '';
        return;
    }

    // Update results count
    const query = searchInput.value.trim();
    if (query) {
        resultsCount.textContent = `Found ${symbolsToRender.length} symbol${symbolsToRender.length !== 1 ? 's' : ''}`;
    } else {
        resultsCount.textContent = `${symbolsToRender.length} symbols available`;
    }

    symbolGrid.innerHTML = symbolsToRender.map(item => {
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

    // Add click listeners to all symbol cards
    document.querySelectorAll('.symbol-card').forEach(card => {
        card.addEventListener('click', () => {
            const symbol = card.getAttribute('data-symbol');
            copyToClipboard(symbol, card);
        });
    });
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
    // Focus search on '/' key
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
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
