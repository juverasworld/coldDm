import { Shield, CheckCircle } from 'lucide-react';
import Card from '../Card';

interface DeliverabilityTipsProps {
  tips: string[];
}

export default function DeliverabilityTips({ tips }: DeliverabilityTipsProps) {
  return (
    <Card>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Deliverability Tips</h2>
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">{tip}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Remember:</span> Email deliverability is the foundation of successful cold email campaigns. Follow these tips to ensure your emails reach the inbox, not spam.
        </p>
      </div>
    </Card>
  );
}
