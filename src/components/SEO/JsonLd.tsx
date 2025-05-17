import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  type: 'Person' | 'WebSite' | 'SoftwareSourceCode' | 'Article';
  data: Record<string, any>;
}

/**
 * A component for adding JSON-LD structured data
 */
export const JsonLd = ({ type, data }: JsonLdProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

/**
 * BreadcrumbList generator for better navigation structure
 */
export const BreadcrumbJsonLd = ({ items }: { items: { name: string, item: string }[] }) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.item,
  }));

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};