import { useEffect, useState } from 'react';
import { getTimeline } from '../services/api';
import type { MedicalEvent } from '../types';
import { formatDate } from '../utils/helpers';
import StatusBadge from '../components/StatusBadge';

export default function TimelinePage() {
  const [events, setEvents] = useState<MedicalEvent[]>([]);

  useEffect(() => {
    getTimeline().then(setEvents).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Timeline</p>
        <h1 className="text-3xl font-bold text-slate-900">Medical event chronology</h1>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-indigo-200">
            <div className="relative flex items-start gap-4">
              <div className="mt-1 h-4 w-4 rounded-full border-4 border-indigo-600 bg-white" />
              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.12em] text-slate-400">{formatDate(event.eventDate)}</div>
                    <div className="mt-1 text-xl font-semibold text-slate-900">{event.title}</div>
                  </div>
                  <StatusBadge status={event.reviewStatus} />
                </div>
                <div className="mt-3 text-sm text-slate-600">{event.description}</div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs uppercase tracking-[0.08em] text-slate-400">Event Type</div>
                    <div className="mt-1 font-medium text-slate-800">{event.eventType}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs uppercase tracking-[0.08em] text-slate-400">Source Document</div>
                    <div className="mt-1 font-medium text-slate-800">{event.document?.originalName || 'Document'}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs uppercase tracking-[0.08em] text-slate-400">Status</div>
                    <div className="mt-1 font-medium text-slate-800">{event.reviewStatus}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
