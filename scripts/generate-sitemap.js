// This script generates a sitemap.xml file for better SEO
import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const baseUrl = 'https://amaansyed27.tech';
  const today = new Date().toISOString().split('T')[0];
  
  // List all routes (currently just the main route and any other explicit routes)
  const routes = [
    '',
    // Add any other routes your application has here
  ];
  
  // Create XML content
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xmlContent += '  <url>\n';
    xmlContent += `    <loc>${baseUrl}${route ? `/${route}` : ''}</loc>\n`;
    xmlContent += `    <lastmod>${today}</lastmod>\n`;
    xmlContent += '    <changefreq>monthly</changefreq>\n';
    xmlContent += '    <priority>1.0</priority>\n';
    xmlContent += '  </url>\n';
  });
  
  xmlContent += '</urlset>';
  
  // Write to file in the public directory
  fs.writeFileSync(path.resolve('./public/sitemap.xml'), xmlContent);
  console.log('Sitemap generated successfully!');
};

generateSitemap();
