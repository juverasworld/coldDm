import { WizardResponses } from '../config/wizardSteps';
import { tools } from '../data/tools';
import { templates } from '../data/templates';

export interface RecommendedTool {
  name: string;
  description: string;
  category: string;
  pricing: string;
  url: string;
  reason: string;
}

export interface PersonalizedTemplate {
  title: string;
  subject: string;
  body: string;
  useCase: string;
}

export interface AutomationStep {
  step: number;
  title: string;
  description: string;
  tools: string[];
}

export function getRecommendedTools(responses: WizardResponses): RecommendedTool[] {
  const { goal, budget_preference, experience_level, current_tools } = responses;

  const filtered = tools.filter(tool => {
    if (budget_preference === 'Free tools only' && tool.pricing !== 'Free') {
      return false;
    }

    if (budget_preference === 'Premium tools preferred' && tool.pricing === 'Free') {
      return false;
    }

    if (current_tools && Array.isArray(current_tools) && current_tools.includes(tool.name)) {
      return false;
    }

    return true;
  });

  const scored = filtered.map(tool => {
    let score = 0;
    let reason = '';

    if (goal === 'Book more clients' && tool.category === 'Lead Generation') {
      score += 3;
      reason = 'Perfect for finding potential clients';
    }

    if (goal === 'Grow newsletter' && tool.category === 'Email Tools') {
      score += 3;
      reason = 'Great for newsletter campaigns';
    }

    if (experience_level === 'Complete beginner' && tool.pricing === 'Free') {
      score += 2;
      reason = 'Beginner-friendly and free to start';
    }

    if (tool.category === 'Lead Generation') score += 1;
    if (tool.category === 'Email Tools') score += 1;

    return { ...tool, score, reason: reason || 'Recommended based on your goals' };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ score, ...tool }) => tool);
}

export function getPersonalizedTemplates(responses: WizardResponses): PersonalizedTemplate[] {
  const { goal, niche } = responses;
  const nicheText = niche || 'your industry';

  const allTemplates = templates.filter(template => {
    if (goal === 'Book more clients' && template.category === 'Sales') return true;
    if (goal === 'Grow newsletter' && template.category === 'Content') return true;
    if (goal === 'Recruit talent' && template.category === 'Recruiting') return true;
    return template.category === 'General';
  });

  return allTemplates.slice(0, 3).map(template => ({
    ...template,
    body: template.body.replace(/\[Industry\]/g, nicheText)
  }));
}

export function getAutomationFlow(responses: WizardResponses): AutomationStep[] {
  const { goal, experience_level } = responses;

  const baseFlow: AutomationStep[] = [
    {
      step: 1,
      title: 'Build Your Lead List',
      description: 'Find and collect contact information for your target audience',
      tools: ['Apollo', 'Hunter', 'LinkedIn Sales Navigator']
    },
    {
      step: 2,
      title: 'Clean & Verify Emails',
      description: 'Ensure your email list is accurate and up-to-date',
      tools: ['NeverBounce', 'ZeroBounce', 'Hunter Email Verifier']
    },
    {
      step: 3,
      title: 'Personalize Your Emails',
      description: 'Add custom variables and tailored messaging',
      tools: ['GPT-4', 'Clay', 'Snov.io']
    },
    {
      step: 4,
      title: 'Send Email Campaigns',
      description: 'Launch your cold email sequence with proper timing',
      tools: ['Mailmeteor', 'GMass', 'Lemlist']
    },
    {
      step: 5,
      title: 'Track & Optimize',
      description: 'Monitor open rates, replies, and conversions',
      tools: ['Google Analytics', 'Mailmeteor Reports', 'Reply.io']
    }
  ];

  if (experience_level === 'Complete beginner') {
    return baseFlow.map(step => ({
      ...step,
      tools: step.tools.slice(0, 2)
    }));
  }

  return baseFlow;
}

export function getDeliverabilityTips(responses: WizardResponses): string[] {
  const { experience_level, email_volume } = responses;

  const tips: string[] = [
    'Use a custom domain (not Gmail/Outlook) for cold emails',
    'Warm up your email account gradually before sending campaigns',
    'Keep your email list clean - remove bounces immediately',
  ];

  if (experience_level === 'Complete beginner') {
    tips.push(
      'Start with 20-50 emails per day and gradually increase',
      'Set up SPF, DKIM, and DMARC records for your domain',
      'Avoid spam trigger words like "free", "guaranteed", "act now"'
    );
  }

  if (email_volume === 'More than 10,000') {
    tips.push(
      'Use multiple sending accounts to distribute volume',
      'Implement a robust IP warming strategy',
      'Monitor sender reputation with tools like Google Postmaster'
    );
  }

  return tips;
}
