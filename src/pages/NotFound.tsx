import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from '@/components/SEO/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <SEO 
        title="Page Not Found | Amaan Syed"
        description="The page you are looking for doesn't exist. Return to Amaan Syed's portfolio homepage."
        keywords="amaan syed, 404, page not found, error page"
        type="website"
      />
      <div className="text-center p-6 max-w-md">
        <div className="mb-6">
          <span className="inline-block text-6xl font-mono font-bold text-red-500 border-4 border-red-500 px-4 py-2 rounded-md">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <p className="text-gray-400 mb-8">You might have mistyped the address or the page may have been relocated.</p>
        <a 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
