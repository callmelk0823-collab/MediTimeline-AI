import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocuments } from '../services/api';
import type { Document } from '../types';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    getDocuments().then(setDocuments).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Documents</p>
        <h1 className="text-3xl font-bold text-slate-900">Document registry</h1>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
            {documents.map((doc) => (
              <tr key={doc.id} className="border-t border-slate-200">
                <td className="px-5 py-4 font-medium text-slate-800">{doc.originalName}</td>
                <td className="px-5 py-4">{doc.patient?.name || 'Synthetic patient'}</td>
                <td className="px-5 py-4">{doc.documentType}</td>
                <td className="px-5 py-4">{formatDate(doc.documentDate || doc.uploadedAt)}</td>
                <td className="px-5 py-4"><StatusBadge status={doc.processingStatus} /></td>
                <td className="px-5 py-4">
                  <Link to={`/documents/${doc.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
