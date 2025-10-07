export interface Question {
  id: string;
  step: number;
  text: string;
  type: 'text' | 'select' | 'textarea' | 'multiselect';
  options?: string[];
  placeholder?: string;
  nextStep?: number;
}

export const questions: Question[] = [
  {
    id: '1',
    step: 1,
    text: 'What\'s your name?',
    type: 'text',
    placeholder: 'Enter your name',
    nextStep: 2
  },
  {
    id: '2',
    step: 2,
    text: 'Who are you selling to?',
    type: 'textarea',
    placeholder: 'Example: SaaS founders, marketing agencies, e-commerce stores...',
    nextStep: 3
  },
  {
    id: '3',
    step: 3,
    text: 'What problem do you solve?',
    type: 'textarea',
    placeholder: 'Describe the main problem your service or product solves...',
    nextStep: 4
  },
  {
    id: '4',
    step: 4,
    text: 'What\'s your offer?',
    type: 'textarea',
    placeholder: 'Example: Web design, SEO consulting, lead generation...',
    nextStep: 5
  },
  {
    id: '5',
    step: 5,
    text: 'How many emails do you want to send daily?',
    type: 'select',
    options: ['1-50 emails/day', '50-100 emails/day', '100-200 emails/day', '200+ emails/day'],
    nextStep: 6
  },
  {
    id: '6',
    step: 6,
    text: 'What stage are you at?',
    type: 'select',
    options: [
      'Just getting started',
      'Have a list but no emails sent',
      'Sending emails but low response rate',
      'Optimizing an existing system'
    ],
    nextStep: 7
  },
  {
    id: '7',
    step: 7,
    text: 'What\'s your biggest challenge with cold email?',
    type: 'multiselect',
    options: [
      'Finding quality leads',
      'Writing effective emails',
      'Getting emails into inbox',
      'Getting replies',
      'Tracking and follow-up',
      'Scaling the system'
    ]
  }
];
