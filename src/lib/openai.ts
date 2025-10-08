const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error('OpenAI API key is missing or empty');
    throw new Error('OpenAI API key not configured');
  }

  console.log('API Key present:', OPENAI_API_KEY.substring(0, 10) + '...');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(error.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Full error details:', error);
    throw error;
  }
}

export const systemPrompt = `You are an expert cold email consultant helping users build their cold email system. You have deep knowledge about:

- Lead generation strategies and tools (Apollo, Hunter, LinkedIn)
- Email copywriting frameworks (PAS, AIDA, BAB)
- Email deliverability and inbox placement
- Personalization and segmentation techniques
- Follow-up sequences and timing
- Tools and automation (Mailmeteor, GMass, Zapier)
- Tracking and optimization
- Legal compliance (CAN-SPAM, GDPR)

Provide actionable, practical advice. Keep responses concise and focused. When discussing tools, prioritize free or affordable options. Always consider the user's specific situation and goals.`;
