# QuickSymbol

A clean, fast web app for searching and copying math symbols, Greek letters, and emojis to your clipboard.

🔗 **Live App**: [https://quick-symbol.vercel.app/](https://quick-symbol.vercel.app/)

## Features

- **Comprehensive Database**:
  - 250+ math symbols, Greek letters, arrows, operators, and more
  - 900+ emojis across all categories (smileys, animals, food, travel, objects, etc.)
- **Tabbed Interface**: Switch between Symbols and Emojis with a single click
- **Instant Search**: Search by name in either tab
  - Symbols: "alpha", "arrow left", "infinity", "integral"
  - Emojis: "smile", "heart", "fire", "thumbs up", "pizza"
- **One-Click Copy**: Click any symbol or emoji to instantly copy it to your clipboard
- **Dark Mode**: Easy on the eyes with a clean dark interface
- **PWA Support**: Install as a Progressive Web App for offline access
- **Keyboard Shortcuts**:
  - Press `/` to focus search
  - Press `Escape` to clear search
- **Responsive Design**: Works on desktop, tablet, and mobile

## How to Use

### Running Locally

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```
3. Navigate to `http://localhost:8000`

### Installing as PWA

1. Open the app in Chrome, Edge, or Safari
2. Look for the "Install" button in the address bar
3. Click to install the app to your device
4. Launch from your app drawer or home screen

### Deploying

This is a static web app that can be deployed to any hosting service:

- **GitHub Pages**: Push to a repo and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from Git or drag and drop
- **Any static host**: Upload all files to your web server

## File Structure

```
CopyToClipboard/
├── index.html          # Main HTML file
├── styles.css          # Dark mode styling
├── app.js             # Main application logic with tab switching
├── symbols.js         # Math symbols & Greek letters database (250+ items)
├── emojis.js          # Emoji database (900+ items)
├── manifest.json      # PWA manifest
├── service-worker.js  # Service worker for offline support
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
└── README.md          # This file
```

## Customization

### Adding More Symbols or Emojis

Edit `symbols.js` or `emojis.js` and add entries to their respective arrays:

```javascript
// In symbols.js
{ symbol: '∞', names: ['infinity', 'infinite'] }

// In emojis.js
{ symbol: '🚀', names: ['rocket', 'space', 'launch'] }
```

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --accent: #6366f1;  /* Change accent color */
    --bg-primary: #1a1a1a;  /* Change background */
}
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

PWA installation requires Chrome/Edge on desktop, or Safari on iOS.

## License

Free to use and modify.
