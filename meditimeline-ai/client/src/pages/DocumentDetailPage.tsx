import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../services/api';
import type { Document } from '../types';
import { formatDate } from '../utils/helpers';

export default function DocumentDetailPage() {
  const { id } = useParams();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!id) return;
    getDocumentById(id).then(setDocument).catch(console.error);
  }, [id]);

  if (!document) return <div className="rounded-2xl bg-white p-8 text-slate-600">Loading document details...</div>;

  const firstEvent = document.medicalEvents?.[0];
  const extracted = firstEvent?.extractedData ? firstEvent.extractedData : {} as Record<string, unknown>;
  const testName = typeof extracted.testName === 'string' ? extracted.testName : 'Not Available';
  const resultValue = typeof extracted.result === 'string' || typeof extracted.result === 'number' ? extracted.result : null;
  const unitValue = typeof extracted.unit === 'string' ? extracted.unit : '';
  const medication = typeof extracted.medication === 'string' ? extracted.medication : 'Not Available';

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Document preview</h2>
          <button className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">View Original</button>
        </div>

        <div className="space-y-4 text-sm text-slate-700">
          <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs uppercase tracking-[0.08em] text-slate-400">Filename</span><span className="mt-1 block font-medium text-slate-800">{document.originalName}</span></div>
          <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs uppercase tracking-[0.08em] text-slate-400">Document ID</span><span className="mt-1 block font-medium text-slate-800">{document.id}</span></div>
          <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs uppercase tracking-[0.08em] text-slate-400">Document Type</span><span className="mt-1 block font-medium text-slate-800">{document.documentType}</span></div>
          <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs uppercase tracking-[0.08em] text-slate-400">Upload Date</span><span className="mt-1 block font-medium text-slate-800">{formatDate(document.uploadedAt)}</span></div>
          <div className="rounded-xl bg-slate-50 p-4"><span className="block text-xs uppercase tracking-[0.08em] text-slate-400">Processing Status</span><span className="mt-1 block font-medium text-slate-800">{document.processingStatus}</span></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Extracted Information</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Document Type</div><div className="mt-1 font-medium text-slate-800">{document.documentType}</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Document Date</div><div className="mt-1 font-medium text-slate-800">{formatDate(document.documentDate || document.uploadedAt)}</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Provider</div><div className="mt-1 font-medium text-slate-800">Synthetic Demo Provider</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Tests</div><div className="mt-1 font-medium text-slate-800">{testName}</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Results</div><div className="mt-1 font-medium text-slate-800">{resultValue !== null ? `${String(resultValue)} ${unitValue}`.trim() : 'Not Available'}</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.08em] text-slate-400">Medications</div><div className="mt-1 font-medium text-slate-800">{medication}</div></div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Source Traceability</div>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div>Document ID: {document.id}</div>
            <div>Extraction timestamp: {new Date().toISOString()}</div>
            <div>Source filename: {document.originalName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
