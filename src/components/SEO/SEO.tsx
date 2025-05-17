import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
  title = 'Amaan Syed | Software & Mobile App Developer | OS-Inspired UI',
  description = 'Amaan Syed - Interactive OS-themed portfolio showcasing mobile app development with Kotlin, Flutter, and web projects using React and TypeScript',
  keywords = 'amaan, amaan syed, syed amaan, amaansyed27, portfolio, mobile app developer, kotlin, jetpack compose, flutter, kmp, kotlin multiplatform, react, typescript, os inspired portfolio, android development, cross-platform development',
  ogImage = 'https://amaansyed27.tech/assets/preview.png',
  ogUrl = 'https://amaansyed27.tech/',
  structuredData,
  type = 'website'
}: SEOProps) => {
  // Generate schema based on type
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
  
  // Map type to OG type
  const ogType = type === 'profile' ? 'profile' : 'website';
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:url" content={ogUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {jsonLdData}
      </script>
    </Helmet>
  );
};

export default SEO;
