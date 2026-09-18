import { useEffect, useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPatients } from '../services/api';
import type { Patient } from '../types';
import { formatDate } from '../utils/helpers';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPatients().then(setPatients).catch(console.error);
  }, []);

  const filtered = patients.filter((patient) => {
    const q = search.toLowerCase();
    return patient.name.toLowerCase().includes(q) || patient.patientCode.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Patients</p>
          <h1 className="text-3xl font-bold text-slate-900">Patient registry</h1>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-indigo-300"
              placeholder="Search by name or patient ID"
            />
          </div>
          <div className="flex gap-2 text-xs text-slate-500">
            <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-600">Filter</button>
            <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-600">Export</button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-5 py-3">Patient ID</th>
                <th className="px-5 py-3">Patient Name</th>
                <th className="px-5 py-3">Age</th>
                <th className="px-5 py-3">Gender</th>
                <th className="px-5 py-3">Documents</th>
                <th className="px-5 py-3">Events</th>
                <th className="px-5 py-3">Last Updated</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{patient.patientCode}</td>
                  <td className="px-5 py-4">{patient.name}</td>
                  <td className="px-5 py-4">{patient.age}</td>
                  <td className="px-5 py-4">{patient.gender}</td>
                  <td className="px-5 py-4">{patient.documents?.length || 0}</td>
                  <td className="px-5 py-4">{patient.events?.length || 0}</td>
                  <td className="px-5 py-4">{formatDate(patient.updatedAt)}</td>
                  <td className="px-5 py-4">
                    <Link to={`/patients/${patient.id}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
                      View Patient <ChevronRight className="h-3 w-3" />
                    </Link>
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
