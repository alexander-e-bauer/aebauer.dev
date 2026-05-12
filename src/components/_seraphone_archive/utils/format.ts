// TypeScript
// src/utils/format.ts
export const formatDuration = (seconds?: number | null): string => {
  if (!seconds) return '0s';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

export const formatTime = (timestamp?: string | null): string => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (timestamp?: string | null): string => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const formatDateTime = (
  timestamp?: string | null,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return '';
  const fmt: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };
  return d.toLocaleString('en-US', fmt);
};

export const formatPhone = (value?: string | null): string => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  let d = digits;
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length === 10) return `(${d.slice(0, 3)})${d.slice(3, 6)}-${d.slice(6)}`;
  return value;
};

export const priorityClass = (priority?: string | null): string => {
  const p = priority?.toLowerCase();
  if (p === 'urgent' || p === 'high') return 'status-urgent';
  if (p === 'medium') return 'status-high';
  return 'status-normal';
};

export const sentimentClass = (s?: string | null): string => {
  const v = s?.toLowerCase();
  if (v === 'positive' || v === 'very_positive') return 'status-positive';
  if (v === 'negative' || v === 'very_negative') return 'status-negative';
  return 'status-normal';
};

export const statusClass = (s?: string | null): string => {
  const v = s?.toLowerCase();
  if (v === 'completed' || v === 'finished') return 'status-completed';
  if (v === 'active' || v === 'in-progress') return 'status-active';
  return 'status-normal';
};