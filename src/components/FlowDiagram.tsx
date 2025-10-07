import { ArrowRight, Database, Mail, BarChart3, Users } from 'lucide-react';
import Card from './Card';

interface FlowStep {
  icon: typeof Users;
  title: string;
  description: string;
  color: string;
}

export default function FlowDiagram() {
  const steps: FlowStep[] = [
    {
      icon: Users,
      title: 'Lead Generation',
      description: 'Find prospects on LinkedIn or Apollo',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Organize in Google Sheets',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Sending',
      description: 'Send via Mailmeteor or GMass',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Track & Optimize',
      description: 'Monitor opens and replies',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-white">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Your Cold Email System Pipeline</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-1">
              <div className={`${step.color} rounded-xl p-4 text-center`}>
                <step.icon className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs opacity-75">{step.description}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-gray-400 mx-2 hidden md:block" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-900">
          <strong>Pro Tip:</strong> Start with 20-50 highly targeted prospects before scaling.
          Quality over quantity always wins in cold outreach.
        </p>
      </div>
    </Card>
  );
}
