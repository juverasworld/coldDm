import { Check } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessAnimationProps {
  onComplete: () => void;
}

export default function SuccessAnimation({ onComplete }: SuccessAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] animate-fade-in">
      <div className="relative">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="absolute inset-0 w-32 h-32 bg-green-500 rounded-full opacity-20 animate-ping" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 animate-slide-up">
        Setup Complete!
      </h2>
      <p className="text-lg text-gray-600 mt-3 animate-slide-up-delay">
        Preparing your personalized dashboard...
      </p>
    </div>
  );
}
