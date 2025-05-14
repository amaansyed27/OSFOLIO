/**
 * View Switcher - Helper for mobile view transitions
 * This script helps manage view transitions on mobile devices
 */

// Listen for orientation changes
window.addEventListener('orientationchange', function() {
    // Allow time for the orientation change to complete
    setTimeout(function() {
        // Dispatch a custom event that components can listen for
        const event = new CustomEvent('orientationChanged', {
            detail: {
                isLandscape: window.innerWidth > window.innerHeight,
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        window.dispatchEvent(event);
    }, 300);
});

// Helper functions for view transitions
const ViewSwitcher = {
    // Get preferred orientation based on content
    getPreferredOrientation: function(contentType) {
        // Different content might work better in different orientations
        const orientationPreferences = {
            'text': 'portrait',
            'image': 'landscape',
            'video': 'landscape',
            'form': 'portrait',
            'default': 'any'
        };
        
        return orientationPreferences[contentType] || orientationPreferences.default;
    },
    
    // Check if device is in landscape mode
    isLandscape: function() {
        return window.innerWidth > window.innerHeight;
    },
    
    // Add touch-friendly classes to elements
    enhanceForTouch: function() {
        // Find all interactive elements
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        
        // Add appropriate classes for touch interactions
        interactiveElements.forEach(element => {
            element.classList.add('touch-friendly');
            
            // Don't add no-select to form elements
            if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
                element.classList.add('no-select');
            }
        });
    }
};

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile devices
    if (window.innerWidth <= 768) {
        ViewSwitcher.enhanceForTouch();
    }
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViewSwitcher;
}