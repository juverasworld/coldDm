import { useState } from 'react';
import { Mail, Copy, Check, X } from 'lucide-react';
import Card from '../Card';
import { PersonalizedTemplate } from '../../utils/contentFilter';

interface EmailTemplatesProps {
  templates: PersonalizedTemplate[];
}

export default function EmailTemplates({ templates }: EmailTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PersonalizedTemplate | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
        </div>

        <div className="space-y-3">
          {templates.map((template, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Subject: {template.subject}</p>
                  <p className="text-xs text-green-600 font-medium">{template.useCase}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(`Subject: ${template.subject}\n\n${template.body}`, index);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedTemplate.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedTemplate.useCase}</p>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Subject Line</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedTemplate.subject}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email Body</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedTemplate.body}</p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(`Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`, -1)}
                className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                {copiedIndex === -1 ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
