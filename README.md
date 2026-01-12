# Symbol Clipboard

A clean, fast web app for searching and copying math symbols and Greek letters to your clipboard.

## Features

- **Comprehensive Symbol Database**: 250+ math symbols, Greek letters, arrows, operators, and more
- **Instant Search**: Search by name (e.g., "alpha", "arrow left", "infinity")
- **One-Click Copy**: Click any symbol to instantly copy it to your clipboard
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
├── app.js             # Main application logic
├── symbols.js         # Symbol database
├── manifest.json      # PWA manifest
├── service-worker.js  # Service worker for offline support
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
└── README.md          # This file
```

## Customization

### Adding More Symbols

Edit `symbols.js` and add entries to the `symbols` array:

```javascript
{ symbol: '∞', names: ['infinity', 'infinite'] }
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
