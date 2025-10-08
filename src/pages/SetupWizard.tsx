import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { wizardSteps } from '../config/wizardSteps';
import { saveWizardResponses, syncToSupabase } from '../utils/wizardStorage';
import ProgressBar from '../components/wizard/ProgressBar';
import WizardQuestion from '../components/wizard/WizardQuestion';
import SuccessAnimation from '../components/wizard/SuccessAnimation';

export default function SetupWizard() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const currentStep = wizardSteps[currentStepIndex];
  const currentValue = responses[currentStep.id] || (currentStep.type === 'multiple' ? [] : '');

  const handleChange = (value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [currentStep.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < wizardSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    saveWizardResponses(responses);
    await syncToSupabase(responses);
    setShowSuccess(true);
  };

  const handleSuccessComplete = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
        <SuccessAnimation onComplete={handleSuccessComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          {currentStepIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}

          <ProgressBar currentStep={currentStepIndex} totalSteps={wizardSteps.length} />
        </div>

        <WizardQuestion
          step={currentStep}
          value={currentValue}
          onChange={handleChange}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
