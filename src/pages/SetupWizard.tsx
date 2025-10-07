import { useState, useEffect } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from 'lucide-react';
import { questions } from '../data/questions';
import Card from '../components/Card';

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');

  const totalSteps = questions.length;
  const currentQuestion = questions.find(q => q.step === currentStep);
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (currentQuestion) {
      const savedAnswer = responses[currentQuestion.id];
      setCurrentAnswer(savedAnswer || (currentQuestion.type === 'multiselect' ? [] : ''));
    }
  }, [currentStep, currentQuestion]);

  const handleNext = () => {
    if (currentQuestion) {
      setResponses(prev => ({
        ...prev,
        [currentQuestion.id]: currentAnswer
      }));
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    console.log('Setup complete!', responses);
    alert('Setup complete! Your personalized roadmap has been generated.');
  };

  const handleMultiSelect = (option: string) => {
    const current = currentAnswer as string[];
    if (current.includes(option)) {
      setCurrentAnswer(current.filter(item => item !== option));
    } else {
      setCurrentAnswer([...current, option]);
    }
  };

  const isAnswerValid = () => {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }
    return currentAnswer.trim().length > 0;
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Setup Wizard</h1>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-8">
          {questions.map((q, index) => (
            <div key={q.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  q.step < currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : q.step === currentStep
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {q.step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              {index < questions.length - 1 && (
                <div
                  className={`w-12 h-0.5 transition-colors ${
                    q.step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.text}
          </h2>

          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={currentAnswer as string}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}

          {currentQuestion.type === 'textarea' && (
            <textarea
              value={currentAnswer as string}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          )}

          {currentQuestion.type === 'select' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setCurrentAnswer(option)}
                  className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${
                    currentAnswer === option
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiselect' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleMultiSelect(option)}
                  className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${
                    (currentAnswer as string[]).includes(option)
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        (currentAnswer as string[]).includes(option)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {(currentAnswer as string[]).includes(option) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswerValid()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>{currentStep === totalSteps ? 'Complete' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
