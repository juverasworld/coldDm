export interface Template {
  id: string;
  name: string;
  framework: 'PAS' | 'AIDA' | 'BAB';
  subject: string;
  content: string;
  variables: string[];
  description: string;
}

export const templates: Template[] = [
  {
    id: '1',
    name: 'Problem-Agitate-Solution',
    framework: 'PAS',
    subject: 'Quick question about {{PAIN_POINT}} at {{COMPANY}}',
    content: `Hi {{FIRST_NAME}},

I noticed that {{COMPANY}} is {{OBSERVATION}}.

Most {{INDUSTRY}} companies struggle with {{PAIN_POINT}}, which leads to {{CONSEQUENCE}}. This can be frustrating, especially when {{AGITATION}}.

I help companies like yours {{SOLUTION}} without {{OBJECTION}}.

Would you be open to a quick 15-minute chat to explore if this could work for {{COMPANY}}?

Best,
{{YOUR_NAME}}`,
    variables: ['FIRST_NAME', 'COMPANY', 'OBSERVATION', 'INDUSTRY', 'PAIN_POINT', 'CONSEQUENCE', 'AGITATION', 'SOLUTION', 'OBJECTION', 'YOUR_NAME'],
    description: 'Identify a problem, make it worse, then present your solution'
  },
  {
    id: '2',
    name: 'Attention-Interest-Desire-Action',
    framework: 'AIDA',
    subject: '{{COMPANY}} + {{YOUR_COMPANY}}: {{BENEFIT}}?',
    content: `Hi {{FIRST_NAME}},

I noticed {{ATTENTION_HOOK}} – impressive work!

We recently helped {{SIMILAR_COMPANY}} {{ACHIEVEMENT}} by {{METHOD}}.

I believe we could help {{COMPANY}} achieve {{DESIRED_OUTCOME}} through {{APPROACH}}.

Are you available for a quick call next week to discuss how this might work for you?

Looking forward to connecting,
{{YOUR_NAME}}`,
    variables: ['FIRST_NAME', 'COMPANY', 'YOUR_COMPANY', 'BENEFIT', 'ATTENTION_HOOK', 'SIMILAR_COMPANY', 'ACHIEVEMENT', 'METHOD', 'DESIRED_OUTCOME', 'APPROACH', 'YOUR_NAME'],
    description: 'Grab attention, build interest, create desire, prompt action'
  },
  {
    id: '3',
    name: 'Before-After-Bridge',
    framework: 'BAB',
    subject: 'From {{BEFORE_STATE}} to {{AFTER_STATE}}',
    content: `Hi {{FIRST_NAME}},

Before: Most {{INDUSTRY}} companies struggle with {{PROBLEM}}, spending {{TIME_COST}} and losing {{MONEY_COST}}.

After: Imagine if {{COMPANY}} could {{IDEAL_OUTCOME}} with {{BENEFIT_1}} and {{BENEFIT_2}}.

Bridge: We help companies transition from {{BEFORE_STATE}} to {{AFTER_STATE}} using {{METHOD}}.

{{SOCIAL_PROOF}} did this and saw {{RESULT}}.

Would you be interested in learning how we could do the same for {{COMPANY}}?

Best regards,
{{YOUR_NAME}}`,
    variables: ['FIRST_NAME', 'BEFORE_STATE', 'AFTER_STATE', 'INDUSTRY', 'PROBLEM', 'TIME_COST', 'MONEY_COST', 'COMPANY', 'IDEAL_OUTCOME', 'BENEFIT_1', 'BENEFIT_2', 'METHOD', 'SOCIAL_PROOF', 'RESULT', 'YOUR_NAME'],
    description: 'Show current state, paint ideal future, bridge the gap'
  }
];
