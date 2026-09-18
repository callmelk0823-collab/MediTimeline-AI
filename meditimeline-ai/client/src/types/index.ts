export type Patient = {
  id: string;
  patientCode: string;
  name: string;
  age: number;
  gender: string;
  documents?: Document[];
  events?: MedicalEvent[];
  createdAt?: string;
  updatedAt?: string;
};

export type Document = {
  id: string;
  patientId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  documentType: string;
  documentDate?: string | null;
  processingStatus: string;
  uploadedAt: string;
  processedAt?: string | null;
  patient?: Patient;
  medicalEvents?: MedicalEvent[];
};

export type MedicalEvent = {
  id: string;
  patientId: string;
  documentId: string;
  eventType: string;
  eventDate: string;
  title: string;
  description: string;
  extractedData: Record<string, unknown>;
  reviewStatus: string;
  createdAt: string;
  patient?: Patient;
  document?: Document;
};

export type DashboardStats = {
  totalPatients: number;
  totalDocuments: number;
  totalEvents: number;
  needsReview: number;
};
