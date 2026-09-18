import { prisma } from '../utils/prisma.js';
import { mockOCRService } from './ocrService.js';
import { mockExtractionProvider } from './mockExtractionProvider.js';
import { documentClassifier } from './documentClassifier.js';
import { validationService } from './validationService.js';
import { timelineService } from './timelineService.js';

export async function processDocument(documentId: string) {
  const document = await prisma.document.findUnique({ where: { id: documentId } });
  if (!document) {
    throw new Error('Document not found');
  }

  const uploadPath = `./uploads/${document.filename}`;
  const ocrResult = await mockOCRService.extractText(uploadPath);

  const classified = documentClassifier.classify(document.originalName, ocrResult.text);
  const extraction = await mockExtractionProvider.extractStructuredData({
    documentId: document.id,
    patientId: document.patientId,
    filePath: uploadPath,
    text: ocrResult.text,
    documentType: classified.documentType,
    originalName: document.originalName,
  });

  const validation = validationService.validate(extraction, document.patientId, document.id);
  const timelineEvent = await timelineService.createEvent(document, validation.event, validation.reviewStatus);

  await prisma.document.update({
    where: { id: documentId },
    data: {
      processingStatus: 'Processed',
      processedAt: new Date(),
    },
  });

  return {
    document,
    ocrResult,
    classified,
    extraction,
    validation,
    timelineEvent,
  };
}
