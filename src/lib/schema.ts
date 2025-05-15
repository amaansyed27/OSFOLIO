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
    'headline': data.headline || 'Software & Mobile App Developer specializing in Kotlin, Flutter, and React',
    'description': data.description || 'Developer with expertise in cross-platform mobile apps and web development',
    'jobTitle': data.jobTitle || 'Software & Mobile App Developer',
    'url': data.url,
    'sameAs': data.sameAs || [],
    'knowsAbout': data.skills || [
      'React', 
      'TypeScript', 
      'Kotlin', 
      'Jetpack Compose', 
      'Flutter', 
      'Kotlin Multiplatform', 
      'Mobile App Development', 
      'Cross-Platform Development'
    ],
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
    'name': 'Amaan Syed | Software & Mobile App Developer Portfolio',
    'description': 'Interactive OS-themed portfolio showcasing Amaan Syed\'s mobile and web development skills',
    'inLanguage': 'en-US',
    'author': {
      '@type': 'Person',
      'name': 'Amaan Syed',
      'jobTitle': 'Software & Mobile App Developer'
    },
    'keywords': [
      'mobile app development', 
      'kotlin', 
      'jetpack compose', 
      'flutter', 
      'kotlin multiplatform', 
      'kmp', 
      'cross-platform', 
      'os inspired portfolio', 
      'android development', 
      'amaan syed',
      'amaansyed27'
    ],
    'additionalType': 'CreativeWork',
    'alternateName': ['OS-Inspired Portfolio', 'OSFOLIO', 'Amaan Syed Dev Portfolio']
  };
  
  return JSON.stringify(schema);
};

export default {
  generatePersonSchema,
  generateProjectSchema,
  generateWebsiteSchema
};
