// utils.ts
export function toStringArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string') as string[];
  if (typeof value === 'string') {
    const t = value.trim();
    if (!t) return [];
    if (t.startsWith('[')) {
      try {
        const parsed = JSON.parse(t);
        return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string') : [t];
      } catch {
        return [t];
      }
    }
    return t.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

export function formatDuration(sec: number | null | undefined) {
  if (sec == null) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s.toString().padStart(2,'0')}s`;
}

export function formatTime(d: Date | null) {
  if (!d) return '—';
  return d.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
}

export function formatDateTime(d: Date | null) {
  if (!d) return '—';
  return d.toLocaleString(undefined, { hour12:false });
}

export function truncate(text: string, max = 120) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + '…';
}

export function copyText(value: string) {
  navigator.clipboard?.writeText(value).catch(() => {});
}

export function cls(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function similarityBucket(v: number) {
  if (v >= 0.8) return 'high';
  if (v >= 0.5) return 'med';
  return 'low';
}

export function highlightFragments(text: string, query: string): string {
  if (!query.trim()) return text;
  const terms = query
    .split(/\s+/)
    .filter(Boolean)
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.join('|')})`, 'ig');
  return text.replace(re, '<mark>$1</mark>');
}
