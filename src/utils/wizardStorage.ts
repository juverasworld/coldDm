import { supabase } from '../lib/supabase';
import { WizardResponses } from '../config/wizardSteps';

const STORAGE_KEY = 'cold_email_os_wizard';
const SESSION_ID_KEY = 'cold_email_os_session';

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function getWizardResponses(): WizardResponses | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function saveWizardResponses(responses: WizardResponses): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
}

export function clearWizardResponses(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isWizardCompleted(): boolean {
  const responses = getWizardResponses();
  return responses !== null && Object.keys(responses).length >= 5;
}

export async function syncToSupabase(responses: WizardResponses): Promise<void> {
  const sessionId = getSessionId();

  try {
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('user_profiles')
        .update({
          ...responses,
          wizard_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);
    } else {
      await supabase
        .from('user_profiles')
        .insert({
          session_id: sessionId,
          ...responses,
          wizard_completed: true
        });
    }
  } catch (error) {
    console.error('Failed to sync to Supabase:', error);
  }
}

export async function loadFromSupabase(): Promise<WizardResponses | null> {
  const sessionId = getSessionId();

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('goal, niche, experience_level, budget_preference, email_volume, current_tools')
      .eq('session_id', sessionId)
      .eq('wizard_completed', true)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      saveWizardResponses(data as WizardResponses);
      return data as WizardResponses;
    }
  } catch (error) {
    console.error('Failed to load from Supabase:', error);
  }

  return null;
}
