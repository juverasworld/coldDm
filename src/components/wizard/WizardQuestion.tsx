import { WizardStep } from '../../config/wizardSteps';
import { Check } from 'lucide-react';

interface WizardQuestionProps {
  step: WizardStep;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onNext: () => void;
}

export default function WizardQuestion({ step, value, onChange, onNext }: WizardQuestionProps) {
  const handleOptionClick = (option: string) => {
    if (step.type === 'multiple') {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(option)) {
        onChange(currentValues.filter(v => v !== option));
      } else {
        onChange([...currentValues, option]);
      }
    } else {
      onChange(option);
      setTimeout(onNext, 300);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const isSelected = (option: string): boolean => {
    if (Array.isArray(value)) {
      return value.includes(option);
    }
    return value === option;
  };

  const canProceed = (): boolean => {
    if (step.type === 'text') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    if (step.type === 'multiple') {
      return Array.isArray(value) && value.length > 0;
    }
    return typeof value === 'string' && value.length > 0;
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-bounce-subtle">{step.icon}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{step.question}</h2>
      </div>

      {step.type === 'text' ? (
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={typeof value === 'string' ? value : ''}
            onChange={handleTextChange}
            placeholder={step.placeholder}
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            autoFocus
          />
          <button
            onClick={onNext}
            disabled={!canProceed()}
            className="w-full mt-4 px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`p-6 text-left rounded-xl border-2 transition-all transform hover:scale-105 ${
                  isSelected(option)
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">{option}</span>
                  {isSelected(option) && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {step.type === 'multiple' && (
            <button
              onClick={onNext}
              disabled={!canProceed()}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
}
