import { ArrowRight, FileSearch, Workflow, CalendarClock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { title: 'Document Intelligence', text: 'Extract structured information from medical documents.', icon: FileSearch },
  { title: 'Automated Extraction', text: 'Identify dates, tests, medications, procedures and other explicitly mentioned information.', icon: Workflow },
  { title: 'Chronological Timeline', text: 'Organize extracted events into an easy-to-understand timeline.', icon: CalendarClock },
  { title: 'Source Traceability', text: 'Every extracted event links back to the original document.', icon: ShieldCheck },
];

const steps = ['Upload Document', 'Extract Text', 'Structure Information', 'Validate', 'Generate Timeline'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
              <FileSearch className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">MediTimeline AI</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Explore Demo</Link>
            <Link to="/upload" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500">Upload Document</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-24 px-6 pb-20">
        <section className="grid items-center gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Synthetic Demo</span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">MediTimeline AI</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Transform scattered medical documents into a structured, chronological patient history.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-500">
                Explore Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/upload" className="rounded-full border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50">Upload Document</Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <div className="rounded-2xl bg-slate-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium text-slate-500">Patient Timeline</div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Verified</span>
              </div>
              <div className="space-y-4">
                {[
                  ['10 Jan 2026', 'Laboratory Test', 'Hemoglobin 12.4 g/dL'],
                  ['15 Jan 2026', 'Prescription', 'Levothyroxine 50 mcg'],
                  ['28 Jan 2026', 'Follow-up', 'Routine review scheduled'],
                ].map(([date, type, note]) => (
                  <div key={date} className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-xs uppercase tracking-[0.12em] text-slate-400">{date}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{type}</div>
                    <div className="mt-1 text-sm text-slate-600">{note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-6 md:grid-cols-4">
            {features.map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{index + 1}</div>
                <div className="font-medium text-slate-800">{step}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-8 text-center text-slate-700">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 inline-flex rounded-full bg-white p-2 text-indigo-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-lg font-medium">
              MediTimeline AI is a hackathon prototype for document organization and information extraction. It is not a diagnostic or treatment tool.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
