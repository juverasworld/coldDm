import { useState } from 'react';
import { ExternalLink, Wrench, X } from 'lucide-react';
import Card from '../Card';
import { RecommendedTool } from '../../utils/contentFilter';

interface RecommendedToolsProps {
  tools: RecommendedTool[];
}

export default function RecommendedTools({ tools }: RecommendedToolsProps) {
  const [selectedTool, setSelectedTool] = useState<RecommendedTool | null>(null);

  return (
    <>
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Wrench className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Recommended Tools</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedTool(tool)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  tool.pricing === 'Free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {tool.pricing}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
              <p className="text-xs text-blue-600 font-medium">{tool.reason}</p>
            </div>
          ))}
        </div>
      </Card>

      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedTool.name}</h3>
                <span className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${
                  selectedTool.pricing === 'Free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {selectedTool.pricing}
                </span>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                <p className="text-gray-600">{selectedTool.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Why we recommend it</h4>
                <p className="text-gray-600">{selectedTool.reason}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {selectedTool.category}
                </span>
              </div>

              <a
                href={selectedTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
