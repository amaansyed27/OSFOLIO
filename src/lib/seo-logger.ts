/**
 * SEO Analytics and Crawler Detection
 * This utility helps track search engine crawler visits
 */

type Crawler = {
  name: string;
  userAgentPattern: RegExp;
};

// List of known search engine bots and their user agent patterns
const knownCrawlers: Crawler[] = [
  { name: 'Googlebot', userAgentPattern: /Googlebot/i },
  { name: 'Bingbot', userAgentPattern: /Bingbot/i },
  { name: 'DuckDuckBot', userAgentPattern: /DuckDuckBot/i },
  { name: 'Baiduspider', userAgentPattern: /Baiduspider/i },
  { name: 'YandexBot', userAgentPattern: /YandexBot/i },
  { name: 'Slurp (Yahoo)', userAgentPattern: /Slurp/i },
];

/**
 * Detects if the current visitor is a search engine crawler
 */
export const detectCrawler = (): { isCrawler: boolean; crawlerName: string | null } => {
  if (typeof navigator === 'undefined') {
    return { isCrawler: false, crawlerName: null };
  }
  
  const userAgent = navigator.userAgent;
  
  for (const crawler of knownCrawlers) {
    if (crawler.userAgentPattern.test(userAgent)) {
      return { isCrawler: true, crawlerName: crawler.name };
    }
  }
  
  return { isCrawler: false, crawlerName: null };
};

/**
 * Records crawler visits for analytics purposes
 */
export const logCrawlerVisit = () => {
  const { isCrawler, crawlerName } = detectCrawler();
  
  if (isCrawler && crawlerName) {
    console.info(`Search engine visit detected: ${crawlerName}`);
    
    // You can implement server logging here
    // For example, sending an analytics event
    try {
      const analyticsData = {
        event: 'crawler_visit',
        crawler: crawlerName,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };
      
      // Optional: Send this data to your analytics service
      // This is just a placeholder - implement according to your analytics solution
      if (window.gtag) {
        window.gtag('event', 'crawler_visit', {
          crawler: crawlerName,
          page_path: window.location.pathname
        });
      }
      
      localStorage.setItem('last_crawler_visit', JSON.stringify(analyticsData));
    } catch (err) {
      // Ignore storage errors, which might happen in incognito mode
    }
  }
};

export default { detectCrawler, logCrawlerVisit };
