const allowedEventTypes = new Set([
  'LABORATORY_TEST',
  'PRESCRIPTION',
  'IMAGING',
  'PROCEDURE',
  'DIAGNOSIS_MENTIONED',
  'FOLLOW_UP',
  'DISCHARGE',
  'CLINICAL_NOTE',
  'OTHER',
]);

const allowedReviewStatus = new Set(['VERIFIED', 'NEEDS_REVIEW', 'NOT_AVAILABLE']);

export const validationService = {
  validate(extracted: any, patientId: string, documentId: string) {
    const eventType = allowedEventTypes.has(extracted.eventType) ? extracted.eventType : 'OTHER';
    const reviewStatus = allowedReviewStatus.has(extracted.reviewStatus) ? extracted.reviewStatus : 'NEEDS_REVIEW';

    const event = {
      patientId,
      documentId,
      eventType,
      eventDate: extracted.eventDate && !Number.isNaN(new Date(extracted.eventDate).getTime()) ? new Date(extracted.eventDate) : new Date(),
      title: extracted.title || 'Document Event',
      description: extracted.description || 'No explicit description available.',
      extractedData: extracted.extractedData || { note: 'Not Available' },
      reviewStatus,
    };

    return {
      event,
      reviewStatus,
      isValid: Boolean(patientId && documentId),
    };
  },
};
