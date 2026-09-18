export function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (typeof value !== 'string') return (value as T) || fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function parseJsonString(value: unknown) {
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function toDateString(value: Date | string | null | undefined) {
  if (!value) return 'Not Available';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not Available';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
