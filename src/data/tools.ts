export interface Tool {
  id: string;
  category: string;
  name: string;
  description: string;
  link: string;
  isFree: boolean;
  icon: string;
  pricing?: string;
}

export const tools: Tool[] = [
  {
    id: '1',
    category: 'lead_generation',
    name: 'Apollo.io',
    description: 'Find and verify B2B contact information with access to 250M+ contacts',
    link: 'https://apollo.io',
    isFree: true,
    icon: 'Users',
    pricing: 'Free plan: 50 credits/month'
  },
  {
    id: '2',
    category: 'lead_generation',
    name: 'Hunter.io',
    description: 'Find professional email addresses and verify them instantly',
    link: 'https://hunter.io',
    isFree: true,
    icon: 'Search',
    pricing: 'Free plan: 25 searches/month'
  },
  {
    id: '3',
    category: 'lead_generation',
    name: 'LinkedIn Sales Navigator',
    description: 'Advanced LinkedIn search for targeted lead generation',
    link: 'https://business.linkedin.com/sales-solutions/sales-navigator',
    isFree: false,
    icon: 'Linkedin',
    pricing: 'Free trial available'
  },
  {
    id: '4',
    category: 'email_sending',
    name: 'Mailmeteor',
    description: 'Send personalized mass emails directly from Gmail using Google Sheets',
    link: 'https://mailmeteor.com',
    isFree: true,
    icon: 'Mail',
    pricing: 'Free plan: 75 emails/day'
  },
  {
    id: '5',
    category: 'email_sending',
    name: 'GMass',
    description: 'Email marketing and mail merge tool that works inside Gmail',
    link: 'https://gmass.co',
    isFree: true,
    icon: 'Send',
    pricing: 'Free trial available'
  },
  {
    id: '6',
    category: 'email_verification',
    name: 'NeverBounce',
    description: 'Verify email addresses to improve deliverability and reduce bounces',
    link: 'https://neverbounce.com',
    isFree: true,
    icon: 'CheckCircle',
    pricing: 'Free plan: 1000 verifications'
  },
  {
    id: '7',
    category: 'email_verification',
    name: 'ZeroBounce',
    description: 'Email validation and deliverability platform',
    link: 'https://zerobounce.net',
    isFree: true,
    icon: 'Shield',
    pricing: 'Free plan: 100 credits'
  },
  {
    id: '8',
    category: 'tracking',
    name: 'Mailtrack',
    description: 'Email tracking for Gmail - see when emails are opened',
    link: 'https://mailtrack.io',
    isFree: true,
    icon: 'Eye',
    pricing: 'Free plan available'
  },
  {
    id: '9',
    category: 'tracking',
    name: 'Streak CRM',
    description: 'CRM built into Gmail for tracking emails and managing pipelines',
    link: 'https://streak.com',
    isFree: true,
    icon: 'BarChart3',
    pricing: 'Free plan available'
  },
  {
    id: '10',
    category: 'automation',
    name: 'Zapier',
    description: 'Connect apps and automate workflows without code',
    link: 'https://zapier.com',
    isFree: true,
    icon: 'Zap',
    pricing: 'Free plan: 100 tasks/month'
  },
  {
    id: '11',
    category: 'automation',
    name: 'Make (Integromat)',
    description: 'Visual platform to automate workflows across apps',
    link: 'https://make.com',
    isFree: true,
    icon: 'GitBranch',
    pricing: 'Free plan: 1000 operations/month'
  },
  {
    id: '12',
    category: 'data_management',
    name: 'Google Sheets',
    description: 'Organize and manage your prospect lists and campaign data',
    link: 'https://sheets.google.com',
    isFree: true,
    icon: 'Table',
    pricing: 'Completely free'
  },
  {
    id: '13',
    category: 'data_management',
    name: 'Airtable',
    description: 'Spreadsheet-database hybrid for managing contacts and campaigns',
    link: 'https://airtable.com',
    isFree: true,
    icon: 'Database',
    pricing: 'Free plan available'
  },
  {
    id: '14',
    category: 'copywriting',
    name: 'ChatGPT',
    description: 'AI assistant for writing and refining cold email copy',
    link: 'https://chat.openai.com',
    isFree: true,
    icon: 'MessageSquare',
    pricing: 'Free plan available'
  },
  {
    id: '15',
    category: 'copywriting',
    name: 'Hemingway Editor',
    description: 'Make your emails bold and clear by simplifying complex sentences',
    link: 'https://hemingwayapp.com',
    isFree: true,
    icon: 'FileEdit',
    pricing: 'Completely free'
  }
];

export const categories = [
  { id: 'lead_generation', name: 'Lead Generation', description: 'Find and collect prospect information' },
  { id: 'email_verification', name: 'Email Verification', description: 'Validate emails before sending' },
  { id: 'email_sending', name: 'Email Sending', description: 'Send personalized mass emails' },
  { id: 'tracking', name: 'Email Tracking', description: 'Track opens, clicks, and replies' },
  { id: 'automation', name: 'Automation', description: 'Automate repetitive tasks' },
  { id: 'data_management', name: 'Data Management', description: 'Organize prospect and campaign data' },
  { id: 'copywriting', name: 'Copywriting Tools', description: 'Write better email copy' }
];
