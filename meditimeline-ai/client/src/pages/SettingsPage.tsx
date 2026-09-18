export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Settings</p>
        <h1 className="text-3xl font-bold text-slate-900">Application settings</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Application</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Mode</span><span className="font-semibold text-indigo-700">Demo Mode</span></div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"><span>Data source</span><span className="font-semibold text-indigo-700">Using synthetic data</span></div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"><span>AI Provider</span><span className="font-semibold text-slate-600">Not configured</span></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Privacy</h2>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Do not upload real patient information into this hackathon prototype.
          </div>
        </div>
      </div>
    </div>
  );
}
