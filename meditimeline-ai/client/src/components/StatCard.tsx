import type { ReactNode } from 'react';

export default function StatCard({ title, value, hint, icon }: { title: string; value: string; hint: string; icon: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </div>
  );
}
