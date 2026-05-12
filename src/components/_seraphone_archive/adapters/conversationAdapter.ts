// TypeScript
// src/adapters/conversationAdapter.ts
import type { Conversation, FullConversationData } from '../types/conversation';

type AnyObj = Record<string, any>;

export const adaptConversation = (raw: AnyObj): Conversation => ({
  id: raw.id,
  call_sid: raw.call_sid ?? raw.sid,
  caller_name: raw.caller_name ?? raw.name ?? null,
  caller_phone: raw.caller_phone ?? raw.phone ?? null,
  caller_company: raw.caller_company ?? null,

  // ✅ ADD THESE ADDRESS FIELDS
  caller_address: raw.caller_address ?? null,
  caller_city: raw.caller_city ?? null,
  caller_state: raw.caller_state ?? null,
  caller_zip: raw.caller_zip ?? null,
  caller_country: raw.caller_country ?? null,
  caller_email: raw.caller_email ?? null,

  call_summary: raw.call_summary ?? null,
  call_priority: raw.call_priority ?? raw.priority ?? null,
  call_sentiment: raw.call_sentiment ?? raw.sentiment ?? null,
  call_status: raw.call_status ?? raw.status ?? null,

  duration_seconds: raw.duration_seconds ?? raw.duration_sec ?? null,
  created_at: raw.created_at ?? null,
  start_time: raw.start_time ?? null,

  is_technical_issue: !!raw.is_technical_issue,
  is_billing_issue: !!raw.is_billing_issue,
  is_product_inquiry: !!raw.is_product_inquiry,
  needs_followup: !!raw.needs_followup,
  callback_number: raw.callback_number ?? null,
  callback_requested: !!raw.callback_requested,

  key_points: raw.key_points ?? null,
  action_items: raw.action_items ?? null,
  topics_discussed: raw.topics_discussed ?? null,
});

export const adaptConversationArray = (arr: AnyObj[] | undefined): Conversation[] =>
  Array.isArray(arr) ? arr.map(adaptConversation) : [];

export const parseStringOrArray = (v: unknown): string[] => {
  if (Array.isArray(v)) return v as string[];
  if (typeof v === 'string' && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed;
    } catch { /* ignore */ }
    return [v];
  }
  return [];
};

export const adaptFullConversation = (raw: AnyObj): FullConversationData => ({
  conversation: adaptConversation(raw.conversation ?? raw),
  dialogue_entries: Array.isArray(raw.dialogue_entries) ? raw.dialogue_entries : [],
  routing_decisions: Array.isArray(raw.routing_decisions) ? raw.routing_decisions : [],
});
