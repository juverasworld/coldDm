import { Workflow, ChevronRight } from 'lucide-react';
import Card from '../Card';
import { AutomationStep } from '../../utils/contentFilter';

interface AutomationFlowProps {
  steps: AutomationStep[];
}

export default function AutomationFlow({ steps }: AutomationFlowProps) {
  return (
    <Card>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Workflow className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Automation Roadmap</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
              </div>

              <div className="flex-1 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>

                <div className="flex flex-wrap gap-2">
                  {step.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-lg font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-transparent" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
        <div className="flex items-start space-x-3">
          <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-gray-600">
              Start with step 1 and master it before moving to the next. Building a solid foundation ensures better results as you scale.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
