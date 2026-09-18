import { useEffect, useState } from 'react';
import { Activity, FileText, Users, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getDashboardStats, getDocuments, getPatients } from '../services/api';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import type { DashboardStats, Document, Patient } from '../types';
import { formatDate } from '../utils/helpers';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const load = async () => {
      const [statsData, patientData, docData] = await Promise.all([
        getDashboardStats(),
        getPatients(),
        getDocuments(),
      ]);
      setStats(statsData);
      setPatients(patientData);
      setDocuments(docData);
    };

    load().catch(console.error);
  }, []);

  const chartData = [
    { name: 'Lab', count: 2 },
    { name: 'Prescription', count: 2 },
    { name: 'Imaging', count: 1 },
    { name: 'Discharge', count: 1 },
    { name: 'Clinical', count: 1 },
    { name: 'Other', count: 1 },
  ];

  const timelineData = [
    { month: 'Jan', events: 6 },
    { month: 'Feb', events: 8 },
    { month: 'Mar', events: 4 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Good evening</p>
        <h1 className="text-3xl font-bold text-slate-900">Medical document intelligence overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Patients" value={String(stats?.totalPatients ?? 0)} hint="3 active demo patients" icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Documents" value={String(stats?.totalDocuments ?? 0)} hint="12 extracted documents" icon={<FileText className="h-4 w-4" />} />
        <StatCard title="Medical Events" value={String(stats?.totalEvents ?? 0)} hint="Chronological events tracked" icon={<Activity className="h-4 w-4" />} />
        <StatCard title="Needs Review" value={String(stats?.needsReview ?? 0)} hint="Items needing verification" icon={<AlertTriangle className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Documents by Type</h2>
            <span className="text-xs text-slate-500">Synthetic distribution</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Timeline Activity</h2>
            <span className="text-xs text-slate-500">Last 3 months</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="events" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Documents</h2>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white">View All <ArrowUpRight className="h-4 w-4" /></button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-5 py-3">Document</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 5).map((doc) => (
                <tr key={doc.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{doc.originalName}</td>
                  <td className="px-5 py-4">{patients.find((p) => p.id === doc.patientId)?.name || 'Synthetic patient'}</td>
                  <td className="px-5 py-4">{doc.documentType}</td>
                  <td className="px-5 py-4">{formatDate(doc.documentDate || doc.uploadedAt)}</td>
                  <td className="px-5 py-4"><StatusBadge status={doc.processingStatus} /></td>
                  <td className="px-5 py-4">
                    <a href={`/documents/${doc.id}`} className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
