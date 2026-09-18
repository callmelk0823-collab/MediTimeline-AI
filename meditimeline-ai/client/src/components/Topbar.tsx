import { Bell, Search, Menu } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden rounded-lg border border-slate-200 p-2 text-slate-600">
          <Menu className="h-4 w-4" />
        </button>
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          Search patient or document
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-slate-200 p-2 text-slate-600">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">AI</div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Demo Analyst</div>
            <div className="text-xs text-slate-500">Synthetic Mode</div>
          </div>
        </div>
      </div>
    </header>
  );
}
