# OSFOLIO - OS-themed Portfolio

OSFOLIO is an interactive operating system-themed portfolio website built with React, TypeScript, and Tailwind CSS. It simulates a desktop environment with apps representing different sections of a personal portfolio, complete with windows, taskbar, and desktop icons.

## Features

- 🖥️ Complete OS-style interface with desktop icons, taskbar, and window management
- 🪟 Draggable, resizable, and minimizable windows with macOS-inspired controls
- 📱 Responsive design with dedicated mobile UI for smaller devices
- 🚀 Smooth animations and transitions using Framer Motion
- 🎨 Beautiful UI components built with shadcn/ui and Radix UI
- 💬 Interactive chat application with multi-user support
- 🤖 AI assistant (OSCAR) for answering questions about the portfolio owner
- 🌙 Dark mode support with custom theming
- 💻 Boot screen simulation for an immersive experience
- 🎯 Taskbar with active app tracking and quick launch capabilities

## Applications

OSFOLIO includes several "applications" that showcase different aspects of the portfolio:

- **About** - Terminal-style interface with personal information presented as command outputs
- **Experience** - Professional work history at Android Club, makemycards.com, and more
- **Education** - Academic background at VIT and certifications from various institutions
- **Skills** - Technical skills with visual level indicators for Android, Kotlin, Figma, and more
- **Projects** - Showcase of work including Dataweave, Hola, Sentinel, and Joto with details
- **Achievements** - Awards and recognitions including Android Club Winter of Code win
- **Contact** - Form to get in touch with links to social profiles and contact information
- **Chat** - Interactive multi-user chat application with real-time messaging
- **Oscar** - AI assistant that answers questions about Amaan's background and skills

## Technical Architecture

### Core Technologies
- **React 18** - Modern UI library with hooks for state management
- **TypeScript** - Type-safe JavaScript for improved developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Animation library for fluid transitions
- **shadcn/ui** - Reusable component collection based on Radix UI
- **React Router** - Navigation and routing between pages
- **Vite** - Fast build tool and dev server

### UI Components
- **Radix UI Primitives** - Accessible components including toast, dialog, and menu
- **Custom Window Component** - Draggable and resizable windows with animations
- **Taskbar** - Dynamic app management with open app tracking
- **Desktop Icons** - Interactive launch icons for applications
- **Terminal Emulator** - Command-line style interface for About section
- **Responsive Layout System** - Adapts between desktop and mobile views

### State Management
- **React Context** - For global application state
- **React Query** - For potential data fetching and caching
- **React Hooks** - Custom hooks including useIsMobile for responsive behavior

## Visual Design

OSFOLIO features a modern, dark-themed UI inspired by popular operating systems:

- **Desktop Environment** - Dark background with animated ASCII art
- **Glass-morphism** - Translucent window effects with backdrop blur
- **macOS-inspired Window Controls** - Red, yellow, and green buttons for window management
- **Custom Accent Colors** - Teal accents (var(--os-accent)) throughout the interface
- **Responsive Mobile Layout** - App-grid view optimized for touch interfaces

## Project Structure

The project is organized into the following main directories:

- `/src/components/Applications` - Individual portfolio section apps (About, Skills, Projects, etc.)
- `/src/components/OperatingSystem` - OS interface components (Window, Taskbar, DesktopIcon, BootScreen)
- `/src/components/ui` - Reusable UI components from shadcn/ui and custom components
- `/src/hooks` - Custom React hooks including useIsMobile and useToast
- `/src/lib` - Utility functions including the cn utility for class merging
- `/src/pages` - Main application pages including Index and NotFound

## Mobile Experience

On mobile devices, OSFOLIO transforms into a touch-friendly interface with:

- App grid layout for easy access to portfolio sections
- Bottom navigation bar with quick access buttons
- Dedicated information page with navigation guidance
- Optimized viewing experience for small screens
- Quick access to OSCAR AI assistant

## Desktop Experience

The desktop version provides a full OS simulation with:

- Dynamic window management (dragging, resizing, minimizing)
- Desktop icons arranged in a customizable grid
- Taskbar with active application tracking
- Boot animation sequence when first loading the site
- Animated desktop background with ASCII art
- Window focus management with z-index control

## About the Developer

OSFOLIO showcases the portfolio of Amaan Syed, a tech enthusiast and Native Android Developer from Pune, India. His experience includes:

- Android development with Kotlin and Java
- UI/UX design using Figma
- Project experience at Android Club, VIT Bhopal
- Education at Vellore Institute of Technology
- Multiple projects including Dataweave, Hola, Sentinel, and Joto
