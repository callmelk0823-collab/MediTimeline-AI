import type { ExtractionResult } from './extractionService.js';

export const mockExtractionProvider = {
  async extractStructuredData({ documentType, text }: { documentType: string; text: string; documentId: string; patientId: string; filePath: string; originalName: string }) {
    const lowerText = text.toLowerCase();

    if (documentType.toLowerCase().includes('laboratory')) {
      return {
        eventType: 'LABORATORY_TEST',
        eventDate: '2026-01-10',
        title: 'Laboratory Test',
        description: 'Hemoglobin result mentioned in laboratory report.',
        extractedData: {
          testName: 'Hemoglobin',
          result: '12.4',
          unit: 'g/dL',
        },
        reviewStatus: 'VERIFIED',
        rawText: text,
      } satisfies ExtractionResult & { rawText: string };
    }

    if (documentType.toLowerCase().includes('prescription')) {
      return {
        eventType: 'PRESCRIPTION',
        eventDate: '2026-01-15',
        title: 'Prescription',
        description: 'Prescription information documented for medication list.',
        extractedData: {
          medication: 'Levothyroxine',
          dosage: '50 mcg',
          frequency: 'Once daily',
        },
        reviewStatus: 'VERIFIED',
        rawText: text,
      } satisfies ExtractionResult & { rawText: string };
    }

    if (documentType.toLowerCase().includes('imaging')) {
      return {
        eventType: 'IMAGING',
        eventDate: '2026-02-03',
        title: 'Imaging Report',
        description: 'Imaging report mentions no acute abnormality.',
        extractedData: {
          modality: 'Chest X-ray',
          impression: 'No acute abnormality mentioned',
        },
        reviewStatus: 'NEEDS_REVIEW',
        rawText: text,
      } satisfies ExtractionResult & { rawText: string };
    }

    if (lowerText.includes('follow-up') || lowerText.includes('follow up')) {
      return {
        eventType: 'FOLLOW_UP',
        eventDate: '2026-01-28',
        title: 'Follow-up',
        description: 'Follow-up information mentions routine review.',
        extractedData: {
          followUpPlan: 'Routine review scheduled',
          symptoms: 'Stable',
        },
        reviewStatus: 'VERIFIED',
        rawText: text,
      } satisfies ExtractionResult & { rawText: string };
    }

    return {
      eventType: 'OTHER',
      eventDate: null,
      title: 'Document Extracted',
      description: 'Document text was processed but no explicit date or event was confidently identified.',
      extractedData: { note: 'Not Available' },
      reviewStatus: 'NOT_AVAILABLE',
      rawText: text,
    } satisfies ExtractionResult & { rawText: string };
  },
};
