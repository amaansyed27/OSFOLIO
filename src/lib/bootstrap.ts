/**
 * This file handles critical resource preloading
 * It improves page loading performance by preloading key assets
 */

const preloadCriticalAssets = () => {
  const criticalAssets = [
    // Critical fonts
    '/assets/fonts/main-font.woff2',
    
    // Critical icons
    '/assets/app_icons/system.ico',
    '/assets/app_icons/explorer.ico',
    
    // Critical images
    '/assets/preview.png',
  ];
  
  criticalAssets.forEach(asset => {
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Set the appropriate as attribute based on file extension
      if (asset.endsWith('.woff2')) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      } else if (asset.endsWith('.ico')) {
        link.as = 'image';
      } else if (asset.endsWith('.png') || asset.endsWith('.jpg')) {
        link.as = 'image';
      } else if (asset.endsWith('.css')) {
        link.as = 'style';
      } else if (asset.endsWith('.js')) {
        link.as = 'script';
      }
      
      link.href = asset;
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Failed to preload asset: ${asset}`, error);
    }
  });
};

// Execute preloading
export default preloadCriticalAssets;
