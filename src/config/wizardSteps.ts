export interface WizardStep {
  id: string;
  question: string;
  icon: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  placeholder?: string;
}

export const wizardSteps: WizardStep[] = [
  {
    id: 'goal',
    question: 'What\'s your primary goal with cold email?',
    icon: '💡',
    type: 'single',
    options: [
      'Book more clients',
      'Grow newsletter',
      'Recruit talent',
      'Raise funding',
      'Partner outreach',
      'Other'
    ]
  },
  {
    id: 'niche',
    question: 'What\'s your industry or niche?',
    icon: '🎯',
    type: 'text',
    placeholder: 'e.g., SaaS, Real Estate, Marketing Agency...'
  },
  {
    id: 'experience_level',
    question: 'What\'s your cold email experience level?',
    icon: '🧠',
    type: 'single',
    options: [
      'Complete beginner',
      'Some experience',
      'Advanced user'
    ]
  },
  {
    id: 'budget_preference',
    question: 'What\'s your budget preference?',
    icon: '💰',
    type: 'single',
    options: [
      'Free tools only',
      'Open to paid tools',
      'Premium tools preferred'
    ]
  },
  {
    id: 'email_volume',
    question: 'How many cold emails do you plan to send per month?',
    icon: '📧',
    type: 'single',
    options: [
      'Less than 500',
      '500 - 2,000',
      '2,000 - 10,000',
      'More than 10,000'
    ]
  },
  {
    id: 'current_tools',
    question: 'What tools are you currently using? (Select all that apply)',
    icon: '🛠️',
    type: 'multiple',
    options: [
      'Gmail',
      'Outlook',
      'LinkedIn',
      'Apollo',
      'Hunter',
      'Mailmeteor',
      'GMass',
      'Lemlist',
      'Instantly',
      'None yet'
    ]
  }
];

export interface WizardResponses {
  goal?: string;
  niche?: string;
  experience_level?: string;
  budget_preference?: string;
  email_volume?: string;
  current_tools?: string[];
}
