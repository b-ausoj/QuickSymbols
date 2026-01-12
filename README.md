# QuickSymbols

A simple web app for quickly copying math symbols and emojis to your clipboard.

🔗 **Live App**: [https://quick-symbol.vercel.app/](https://quick-symbol.vercel.app/)

## About

I created this because I often needed to copy math symbols or emojis and couldn't find a simple static website for it. Built with Claude.

## Features

- 250+ math symbols, Greek letters, and operators
- 900+ emojis across all categories
- Search by name
- One-click copy to clipboard
- Dark mode
- PWA support for offline use
- Keyboard shortcuts: `/` to search, `Escape` to clear

## Running Locally

Open `index.html` in a browser, or use a local server:

```bash
python -m http.server 8000
# or
npx serve
```

## Deployment

This is a static site that works with any host (Vercel, Netlify, GitHub Pages, etc.).

## Customization

Add symbols or emojis in [symbols.js](symbols.js) or [emojis.js](emojis.js):

```javascript
{ symbol: '∞', names: ['infinity', 'infinite'] }
```

## License

Free to use and modify.
