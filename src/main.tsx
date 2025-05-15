
import { createRoot } from 'react-dom/client';
import { Workbox } from 'workbox-window';
import App from './App.tsx';
import './index.css';
import preloadCriticalAssets from './lib/bootstrap';
import { logCrawlerVisit } from './lib/seo-logger';

// Add dark mode class to the document
document.documentElement.classList.add('dark');

// Preload critical assets for performance
preloadCriticalAssets();

// Log search engine crawler visits
logCrawlerVisit();

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/sw.js');
    wb.register().catch(err => console.error('Service worker registration failed:', err));
  });
}

createRoot(document.getElementById("root")!).render(<App />);
