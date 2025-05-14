
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add dark mode class to the document
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
