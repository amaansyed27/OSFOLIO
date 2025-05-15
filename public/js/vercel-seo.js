// SEO Configuration for amaansyed27.vercel.app
// This script enhances SEO for the secondary Vercel domain
// It will run only when the site is loaded on the Vercel domain

(function() {
  // Check if we're on the Vercel domain
  if (typeof window !== 'undefined' && 
      window.location.hostname.includes('vercel.app')) {
    
    // Log the visit
    console.log('Visitor on Vercel domain');
    
    // 1. Enhance meta tags for Vercel domain
    const enhanceMetaTags = () => {
      // Update title to emphasize mobile development
      document.title = "Amaan Syed | Mobile App Developer | Kotlin & Flutter Expert";
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          'Mobile app development portfolio of Amaan Syed. Specializing in Kotlin, Jetpack Compose, Flutter, and cross-platform solutions with KMP.');
      }
      
      // Add mobile-specific keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 
          'amaan, amaan syed, mobile app developer, kotlin developer, flutter expert, jetpack compose, kmp, cross-platform development');
      }
    };
    
    // 2. Add specialized structured data
    const addSpecializedStructuredData = () => {
      const specializedData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Amaan Syed",
        "url": "https://amaansyed27.vercel.app/",
        "sameAs": ["https://amaansyed27.tech/"],
        "jobTitle": "Mobile App Developer",
        "knowsAbout": [
          "Kotlin", 
          "Jetpack Compose", 
          "Flutter", 
          "Kotlin Multiplatform",
          "Android Development"
        ],
        "description": "Mobile app developer specializing in Kotlin, Flutter, and cross-platform solutions"
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(specializedData);
      document.head.appendChild(script);
    };
    
    // 3. Add mobile app development specific meta tags
    const addMobileSpecificTags = () => {
      const mobileMetaTags = [
        { name: 'apple-itunes-app', content: 'app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL' },
        { name: 'application-name', content: 'Amaan Syed Mobile Portfolio' },
        { name: 'msapplication-tooltip', content: 'Mobile App Development Portfolio' },
        { name: 'mobile-web-app-capable', content: 'yes' }
      ];
      
      mobileMetaTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      });
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        enhanceMetaTags();
        addSpecializedStructuredData();
        addMobileSpecificTags();
      });
    } else {
      enhanceMetaTags();
      addSpecializedStructuredData();
      addMobileSpecificTags();
    }
  }
})();
