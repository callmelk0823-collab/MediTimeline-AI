export default function StatusBadge({ status }: { status: string }) {
  const palette = {
    Processed: 'bg-emerald-100 text-emerald-700',
    Processing: 'bg-amber-100 text-amber-700',
    'Needs Review': 'bg-rose-100 text-rose-700',
    Failed: 'bg-red-100 text-red-700',
    VERIFIED: 'bg-emerald-100 text-emerald-700',
    NEEDS_REVIEW: 'bg-rose-100 text-rose-700',
    NOT_AVAILABLE: 'bg-slate-200 text-slate-700',
  } as Record<string, string>;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${palette[status] || palette['NOT_AVAILABLE']}`}>
      {status}
    </span>
  );
}
