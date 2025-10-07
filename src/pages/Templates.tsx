import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { templates } from '../data/templates';
import Card from '../components/Card';

export default function Templates() {
  const [selectedFramework, setSelectedFramework] = useState<'PAS' | 'AIDA' | 'BAB'>('PAS');
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedTemplate = templates.find(t => t.framework === selectedFramework);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateEmail = () => {
    if (!selectedTemplate) return '';

    let content = selectedTemplate.content;
    let subject = selectedTemplate.subject;

    Object.entries(customValues).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, value || `{{${key}}}`);
      subject = subject.replace(regex, value || `{{${key}}}`);
    });

    return { subject, content };
  };

  const { subject, content } = generateEmail();

  const frameworks = [
    { id: 'PAS', name: 'PAS', description: 'Problem-Agitate-Solution' },
    { id: 'AIDA', name: 'AIDA', description: 'Attention-Interest-Desire-Action' },
    { id: 'BAB', name: 'BAB', description: 'Before-After-Bridge' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email Template Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose a proven framework, customize the variables, and generate
            ready-to-use cold email templates.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {frameworks.map((framework) => (
              <Card
                key={framework.id}
                className={`cursor-pointer transition-all ${
                  selectedFramework === framework.id
                    ? 'ring-2 ring-blue-600 bg-blue-50'
                    : 'hover:shadow-md'
                }`}
                hover={selectedFramework !== framework.id}
              >
                <button
                  onClick={() => setSelectedFramework(framework.id as any)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {framework.name}
                    </h3>
                    <FileText className={`w-6 h-6 ${
                      selectedFramework === framework.id
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <p className="text-sm text-gray-600">{framework.description}</p>
                </button>
              </Card>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Customize Variables
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  {selectedTemplate.description}
                </p>

                <div className="space-y-4">
                  {selectedTemplate.variables.map((variable) => (
                    <div key={variable}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {variable.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={customValues[variable] || ''}
                        onChange={(e) =>
                          setCustomValues(prev => ({
                            ...prev,
                            [variable]: e.target.value
                          }))
                        }
                        placeholder={`Enter ${variable.toLowerCase().replace(/_/g, ' ')}`}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Generated Email
                  </h2>
                  <button
                    onClick={() => handleCopy(`Subject: ${subject}\n\n${content}`, 'email')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    {copiedId === 'email' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Line
                    </label>
                    <div className="relative">
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 font-medium text-gray-900">
                        {subject}
                      </div>
                      <button
                        onClick={() => handleCopy(subject, 'subject')}
                        className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copiedId === 'subject' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Body
                    </label>
                    <div className="relative">
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap text-gray-900 min-h-[300px]">
                        {content}
                      </div>
                      <button
                        onClick={() => handleCopy(content, 'body')}
                        className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copiedId === 'body' ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="mt-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Pro Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep subject lines under 50 characters</li>
                  <li>• Personalize at least 3 elements per email</li>
                  <li>• End with a clear, single call-to-action</li>
                  <li>• Test different frameworks with your audience</li>
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
