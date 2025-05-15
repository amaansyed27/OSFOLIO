import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  author?: string;
  children?: React.ReactNode;
}

/**
 * A component for managing document head metadata to improve SEO.
 * This component provides more control than basic SEO meta tags.
 */
const Head = ({
  title = 'Amaan Syed | Software Engineer & Developer Portfolio',
  description = 'Amaan Syed - Interactive OS-themed portfolio showcasing software engineering skills, projects, and professional experience',
  keywords = 'amaan, amaan syed, syed amaan, amaansyed27, portfolio, software engineer, developer, react, frontend, web development, interactive portfolio',
  canonical = 'https://amaansyed27.tech/',
  image = 'https://amaansyed27.tech/assets/preview.png',
  author = 'Amaan Syed',
  children,
}: HeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional head elements */}
      {children}
    </Helmet>
  );
};

export default Head;
