import { ChangeEvent, useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PROCESS_STEPS = [
  'Upload',
  'OCR/Text extraction',
  'Document classification',
  'Information extraction',
  'Validation',
  'Timeline generation',
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('Ready');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setProgress(15);
    setStatus('Uploading...');

    const formData = new FormData();
    formData.append('patientId', 'cm7v3rydd0000');
    formData.append('documentType', 'Laboratory Report');
    formData.append('file', selectedFile);

    try {
      const uploadRes = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProgress(55);
      setStatus('Document uploaded');
      const docId = uploadRes.data.data.id;
      await api.post(`/documents/${docId}/process`);
      setProgress(100);
      setStatus('Timeline event created');
      navigate('/timeline');
    } catch (error) {
      setStatus('Upload failed');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-indigo-600">Upload</p>
        <h1 className="text-3xl font-bold text-slate-900">Upload a medical document</h1>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
          <div className="rounded-full bg-indigo-100 p-4 text-indigo-600">
            <UploadCloud className="h-8 w-8" />
          </div>
          <div>
            <div className="text-xl font-semibold text-slate-900">Drag & Drop Medical Document</div>
            <div className="mt-1 text-sm text-slate-500">or choose a file</div>
          </div>
          <input type="file" accept=".pdf,image/png,image/jpg,image/jpeg" className="hidden" onChange={handleFileChange} />
        </label>

        {selectedFile ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium text-slate-800">{selectedFile.name}</div>
                <div className="text-xs text-slate-500">{selectedFile.type || 'Unknown type'} • {(selectedFile.size / 1024).toFixed(1)} KB</div>
              </div>
              <button onClick={handleUpload} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                {isUploading ? 'Processing...' : 'Upload'}
              </button>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>{status}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Processing steps</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{index + 1}</div>
              <div className="text-sm text-slate-700">{step}</div>
              {progress > index * 15 ? <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" /> : <Loader2 className="ml-auto h-4 w-4 animate-spin text-slate-400" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
