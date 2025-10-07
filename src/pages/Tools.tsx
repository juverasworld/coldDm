import { useState } from 'react';
import {
  ExternalLink,
  Users,
  Search,
  Linkedin,
  Mail,
  Send,
  CheckCircle,
  Shield,
  Eye,
  BarChart3,
  Zap,
  GitBranch,
  Table,
  Database,
  MessageSquare,
  FileEdit,
  Wrench
} from 'lucide-react';
import { tools, categories } from '../data/tools';
import Card from '../components/Card';

const iconMap: Record<string, any> = {
  Users,
  Search,
  Linkedin,
  Mail,
  Send,
  CheckCircle,
  Shield,
  Eye,
  BarChart3,
  Zap,
  GitBranch,
  Table,
  Database,
  MessageSquare,
  FileEdit,
  Tool: Wrench
};

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = selectedCategory === 'all'
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Wrench;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cold Email Tool Stack
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the best free and affordable tools to build your complete
            cold email system.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              All Tools
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory !== 'all' && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-gray-600">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = getIcon(tool.icon);
            return (
              <Card key={tool.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tool.name}
                      </h3>
                      {tool.isFree && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Free Plan
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {tool.description}
                </p>

                {tool.pricing && (
                  <div className="mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-700">
                      <span className="font-medium">Pricing:</span> {tool.pricing}
                    </p>
                  </div>
                )}

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No tools found in this category.</p>
          </div>
        )}

        <Card className="mt-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-3">
              Build Your Complete Stack
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Most successful cold email systems use 3-5 tools working together.
              Start with the essentials and scale as you grow.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm">
                Lead Generation
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm">
                Email Sending
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm">
                Tracking
              </span>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm">
                CRM/Organization
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
