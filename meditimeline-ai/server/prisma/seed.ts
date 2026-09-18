import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

const prisma = new PrismaClient();

const syntheticPatients = [
  { patientCode: 'P-1001', name: 'Aarav Kumar', age: 45, gender: 'Male' },
  { patientCode: 'P-1002', name: 'Ananya Rao', age: 32, gender: 'Female' },
  { patientCode: 'P-1003', name: 'Karthik Raj', age: 51, gender: 'Male' },
];

async function main() {
  await prisma.medicalEvent.deleteMany();
  await prisma.extractionRecord.deleteMany();
  await prisma.document.deleteMany();
  await prisma.patient.deleteMany();

  const createdPatients = await Promise.all(
    syntheticPatients.map((patient) => prisma.patient.create({ data: patient }))
  );

  const uploadDir = path.resolve(process.cwd(), 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });

  const docs = [
    {
      patientId: createdPatients[0].id,
      filename: 'lab_report_001.pdf',
      originalName: 'lab_report_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 124000,
      documentType: 'Laboratory Report',
      documentDate: new Date('2026-01-10T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-01-11T00:00:00.000Z'),
      processedAt: new Date('2026-01-11T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[0].id,
      filename: 'prescription_001.pdf',
      originalName: 'prescription_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 98000,
      documentType: 'Prescription',
      documentDate: new Date('2026-01-15T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-01-16T00:00:00.000Z'),
      processedAt: new Date('2026-01-16T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[0].id,
      filename: 'followup_note_001.pdf',
      originalName: 'followup_note_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 110000,
      documentType: 'Clinical Note',
      documentDate: new Date('2026-01-28T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-01-29T00:00:00.000Z'),
      processedAt: new Date('2026-01-29T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[1].id,
      filename: 'imaging_report_001.pdf',
      originalName: 'imaging_report_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 154000,
      documentType: 'Imaging Report',
      documentDate: new Date('2026-02-03T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-02-04T00:00:00.000Z'),
      processedAt: new Date('2026-02-04T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[1].id,
      filename: 'lab_report_002.pdf',
      originalName: 'lab_report_002.pdf',
      mimeType: 'application/pdf',
      fileSize: 118000,
      documentType: 'Laboratory Report',
      documentDate: new Date('2026-02-08T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-02-09T00:00:00.000Z'),
      processedAt: new Date('2026-02-09T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[1].id,
      filename: 'prescription_002.pdf',
      originalName: 'prescription_002.pdf',
      mimeType: 'application/pdf',
      fileSize: 96000,
      documentType: 'Prescription',
      documentDate: new Date('2026-02-12T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-02-13T00:00:00.000Z'),
      processedAt: new Date('2026-02-13T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[2].id,
      filename: 'discharge_summary_001.pdf',
      originalName: 'discharge_summary_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 168000,
      documentType: 'Discharge Summary',
      documentDate: new Date('2026-03-01T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-03-02T00:00:00.000Z'),
      processedAt: new Date('2026-03-02T01:00:00.000Z'),
    },
    {
      patientId: createdPatients[2].id,
      filename: 'clinical_note_001.pdf',
      originalName: 'clinical_note_001.pdf',
      mimeType: 'application/pdf',
      fileSize: 103000,
      documentType: 'Clinical Note',
      documentDate: new Date('2026-03-05T00:00:00.000Z'),
      processingStatus: 'Processed',
      uploadedAt: new Date('2026-03-06T00:00:00.000Z'),
      processedAt: new Date('2026-03-06T01:00:00.000Z'),
    },
  ];

  const createdDocs = await Promise.all(
    docs.map((doc) => prisma.document.create({ data: doc }))
  );

  const events = [
    {
      patientId: createdPatients[0].id,
      documentId: createdDocs[0].id,
      eventType: 'LABORATORY_TEST',
      eventDate: new Date('2026-01-10T00:00:00.000Z'),
      title: 'Laboratory Test',
      description: 'Hemoglobin result mentioned in laboratory report.',
      extractedData: JSON.stringify({ testName: 'Hemoglobin', result: '12.4', unit: 'g/dL' }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[0].id,
      documentId: createdDocs[1].id,
      eventType: 'PRESCRIPTION',
      eventDate: new Date('2026-01-15T00:00:00.000Z'),
      title: 'Prescription',
      description: 'Prescription information recorded from medication list.',
      extractedData: JSON.stringify({ medication: 'Levothyroxine', dosage: '50 mcg', frequency: 'Once daily' }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[0].id,
      documentId: createdDocs[2].id,
      eventType: 'FOLLOW_UP',
      eventDate: new Date('2026-01-28T00:00:00.000Z'),
      title: 'Follow-up',
      description: 'Follow-up notes mention stable symptoms and routine review.',
      extractedData: JSON.stringify({ followUpPlan: 'Routine review scheduled', symptoms: 'Stable' }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[1].id,
      documentId: createdDocs[3].id,
      eventType: 'IMAGING',
      eventDate: new Date('2026-02-03T00:00:00.000Z'),
      title: 'Imaging Report',
      description: 'Chest imaging impression documented in report.',
      extractedData: JSON.stringify({ modality: 'Chest X-ray', impression: 'No acute abnormality mentioned' }),
      reviewStatus: 'NEEDS_REVIEW',
    },
    {
      patientId: createdPatients[1].id,
      documentId: createdDocs[4].id,
      eventType: 'LABORATORY_TEST',
      eventDate: new Date('2026-02-08T00:00:00.000Z'),
      title: 'Laboratory Test',
      description: 'Fasting glucose result recorded in laboratory report.',
      extractedData: JSON.stringify({ testName: 'Fasting Glucose', result: '98', unit: 'mg/dL' }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[1].id,
      documentId: createdDocs[5].id,
      eventType: 'PRESCRIPTION',
      eventDate: new Date('2026-02-12T00:00:00.000Z'),
      title: 'Prescription',
      description: 'Medication list includes antihistamine prescription.',
      extractedData: JSON.stringify({ medication: 'Cetirizine', dosage: '10 mg', frequency: 'Once daily' }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[2].id,
      documentId: createdDocs[6].id,
      eventType: 'DISCHARGE',
      eventDate: new Date('2026-03-01T00:00:00.000Z'),
      title: 'Discharge Summary',
      description: 'Discharge summary includes follow-up guidance and medication change.',
      extractedData: JSON.stringify({ dischargeSummary: 'Follow-up in 2 weeks', medications: ['Metformin'] }),
      reviewStatus: 'VERIFIED',
    },
    {
      patientId: createdPatients[2].id,
      documentId: createdDocs[7].id,
      eventType: 'CLINICAL_NOTE',
      eventDate: new Date('2026-03-05T00:00:00.000Z'),
      title: 'Clinical Note',
      description: 'Clinical note documents patient reported improvement.',
      extractedData: JSON.stringify({ note: 'Patient reports improved energy and no new symptoms' }),
      reviewStatus: 'VERIFIED',
    },
  ];

  await prisma.medicalEvent.createMany({ data: events });

  const extractionRecords = createdDocs.map((doc) => ({
    documentId: doc.id,
    provider: 'mockExtractionProvider',
    rawText: `Synthetic demo record for ${doc.originalName}`,
    structuredData: JSON.stringify({ source: doc.originalName }),
    confidence: 0.96,
  }));

  await prisma.extractionRecord.createMany({ data: extractionRecords });

  console.log('Seed completed with synthetic patient data and demo documents.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
