import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatientById, getPatientTimeline } from '../services/api';
import type { MedicalEvent, Patient } from '../types';
import { formatDate } from '../utils/helpers';
import StatusBadge from '../components/StatusBadge';

export default function PatientDetailPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [events, setEvents] = useState<MedicalEvent[]>([]);

  useEffect(() => {
    if (!id) return;
    Promise.all([getPatientById(id), getPatientTimeline(id)]).then(([patientData, timelineData]) => {
      setPatient(patientData);
      setEvents(timelineData);
    }).catch(console.error);
  }, [id]);

  if (!patient) return <div className="rounded-2xl bg-white p-8 text-slate-600">Loading patient profile...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-indigo-600">Patient Information</p>
        <div className="mt-4 grid gap-4 md:grid-cols-5">
          <div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Patient ID</div><div className="mt-1 font-semibold text-slate-800">{patient.patientCode}</div></div>
          <div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Name</div><div className="mt-1 font-semibold text-slate-800">{patient.name}</div></div>
          <div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Age</div><div className="mt-1 font-semibold text-slate-800">{patient.age}</div></div>
          <div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Gender</div><div className="mt-1 font-semibold text-slate-800">{patient.gender}</div></div>
          <div><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Documents</div><div className="mt-1 font-semibold text-slate-800">{patient.documents?.length || 0}</div></div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-500">Recent activity</div>
              <div className="mt-2 text-sm text-slate-700">{events.length > 0 ? events[0].title : 'No events yet'}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-500">Document summary</div>
              <div className="mt-2 text-sm text-slate-700">{patient.documents?.length || 0} documents on file</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Timeline</h2>
          <div className="mt-4 space-y-3">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-slate-800">{event.title}</div>
                  <StatusBadge status={event.reviewStatus} />
                </div>
                <div className="mt-1 text-xs text-slate-500">{formatDate(event.eventDate)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
