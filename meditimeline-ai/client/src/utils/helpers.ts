export function formatDate(dateString?: string | null) {
  if (!dateString) return 'Not Available';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Not Available';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function statusTone(status: string) {
  switch (status) {
    case 'Processed':
    case 'VERIFIED':
      return 'bg-emerald-100 text-emerald-700';
    case 'Processing':
      return 'bg-amber-100 text-amber-700';
    case 'Needs Review':
    case 'NEEDS_REVIEW':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-200 text-slate-700';
  }
}
