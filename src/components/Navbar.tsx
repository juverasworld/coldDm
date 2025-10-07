import { Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Cold Email OS</span>
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/setup"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/setup')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              My Setup
            </Link>
            <Link
              to="/templates"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/templates')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Templates
            </Link>
            <Link
              to="/tools"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/tools')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Tools
            </Link>
            <Link
              to="/assistant"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/assistant')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              AI Assistant
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
