/**
 * Schema Generator for structured data
 * This utility creates structured data for better SEO
 */

interface PersonSchema {
  name: string;
  headline?: string;
  description?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  skills?: string[];
  alumniOf?: {
    name: string;
    url?: string;
  }[];
  image?: string;
}

interface ProjectSchema {
  name: string;
  description: string;
  url?: string;
  image?: string;
  creator?: {
    name: string;
    url?: string;
  };
  dateCreated?: string;
  keywords?: string[];
  codeRepository?: string;
  programmingLanguage?: string[];
}

// Generate Person schema
export const generatePersonSchema = (data: PersonSchema): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': data.name,
    'headline': data.headline,
    'description': data.description,
    'jobTitle': data.jobTitle,
    'url': data.url,
    'sameAs': data.sameAs || [],
    'knowsAbout': data.skills || [],
    'alumniOf': data.alumniOf?.map(edu => ({
      '@type': 'EducationalOrganization',
      'name': edu.name,
      'url': edu.url
    })) || [],
    'image': data.image
  };
  
  return JSON.stringify(schema);
};

// Generate SoftwareSourceCode schema for projects
export const generateProjectSchema = (data: ProjectSchema): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    'name': data.name,
    'description': data.description,
    'url': data.url,
    'image': data.image,
    'creator': data.creator ? {
      '@type': 'Person',
      'name': data.creator.name,
      'url': data.creator.url
    } : undefined,
    'dateCreated': data.dateCreated,
    'keywords': data.keywords || [],
    'codeRepository': data.codeRepository,
    'programmingLanguage': data.programmingLanguage || []
  };
  
  return JSON.stringify(schema);
};

// Generate website schema
export const generateWebsiteSchema = (): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://amaansyed27.tech/',
    'name': 'Amaan Syed | Software Engineer Portfolio',
    'description': 'Interactive OS-themed portfolio showcasing Amaan Syed\'s work and skills',
    'inLanguage': 'en-US',
    'author': {
      '@type': 'Person',
      'name': 'Amaan Syed'
    }
  };
  
  return JSON.stringify(schema);
};

export default {
  generatePersonSchema,
  generateProjectSchema,
  generateWebsiteSchema
};
