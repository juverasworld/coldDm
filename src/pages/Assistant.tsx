import { BookOpen, Lightbulb, Mail, Target } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import Card from '../components/Card';

export default function Assistant() {
  const suggestions = [
    {
      icon: Target,
      title: 'Finding Leads',
      question: 'What\'s the best way to find quality leads for cold email?'
    },
    {
      icon: Mail,
      title: 'Writing Emails',
      question: 'How do I write a cold email that gets replies?'
    },
    {
      icon: Lightbulb,
      title: 'Improve Deliverability',
      question: 'How can I make sure my emails land in the inbox?'
    },
    {
      icon: BookOpen,
      title: 'Follow-up Strategy',
      question: 'What\'s the ideal follow-up sequence for cold emails?'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Cold Email Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get expert advice on strategy, copywriting, tools, and optimization.
            Ask anything about building your cold email system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatBox />
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Questions
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <suggestion.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {suggestion.question}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                What I Can Help With
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Lead generation strategies</li>
                <li>• Email copywriting and templates</li>
                <li>• Tool recommendations</li>
                <li>• Deliverability optimization</li>
                <li>• Follow-up sequences</li>
                <li>• Personalization techniques</li>
                <li>• Tracking and analytics</li>
                <li>• Legal compliance</li>
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Personalize every email</li>
                <li>• Keep it short and scannable</li>
                <li>• Focus on their problem, not your solution</li>
                <li>• Test everything before scaling</li>
                <li>• Follow up 3-4 times minimum</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
