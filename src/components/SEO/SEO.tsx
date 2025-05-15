import { useEffect } from 'react';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  structuredData?: string;
  type?: 'website' | 'profile' | 'project';
}

export const SEO = ({
  title = 'Amaan Syed | Software Engineer & Developer Portfolio',
  description = 'Amaan Syed - Interactive OS-themed portfolio showcasing software engineering skills, projects, and professional experience',
  keywords = 'amaan, amaan syed, syed amaan, amaansyed27, portfolio, software engineer, developer, react, typescript, javascript, frontend, web development',
  ogImage = 'https://amaansyed27.tech/assets/preview.png',
  ogUrl = 'https://amaansyed27.tech/',
  structuredData,
  type = 'website'
}: SEOProps) => {  useEffect(() => {
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      description,
      keywords,
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:url': ogUrl,
      'og:type': type === 'profile' ? 'profile' : 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
      'twitter:url': ogUrl
    };
    
    Object.entries(metaTags).forEach(([name, content]) => {
      // Check if meta tag exists
      let metaTag = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      // If exists, update it
      if (metaTag) {
        if (metaTag.hasAttribute('name')) {
          metaTag.setAttribute('content', content);
        } else if (metaTag.hasAttribute('property')) {
          metaTag.setAttribute('content', content);
        }
      } 
      // If doesn't exist and is needed, create it
      else {
        metaTag = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    });
    
    // Add structured data
    let structuredDataScript = document.querySelector('script[data-type="application/ld+json"]');
    const jsonLdData = structuredData || (
      type === 'profile' ? 
        generatePersonSchema({
          name: 'Amaan Syed',
          jobTitle: 'Software Engineer',
          url: 'https://amaansyed27.tech/',
          skills: ['React', 'TypeScript', 'JavaScript', 'Web Development', 'Frontend Development'],
          sameAs: [
            'https://github.com/amaansyed27',
            'https://www.linkedin.com/in/amaansyed27/'
          ],
          image: ogImage
        }) : 
        generateWebsiteSchema()
    );
    
    if (structuredDataScript) {
      structuredDataScript.textContent = jsonLdData;
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      structuredDataScript.setAttribute('data-type', 'application/ld+json');
      structuredDataScript.textContent = jsonLdData;
      document.head.appendChild(structuredDataScript);
    }
    
  }, [title, description, keywords, ogImage, ogUrl, structuredData, type]);

  return null;
};

export default SEO;
