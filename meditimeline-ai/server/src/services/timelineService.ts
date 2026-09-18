import { prisma } from '../utils/prisma.js';

export const timelineService = {
  async createEvent(document: any, event: any, reviewStatus: string) {
    const created = await prisma.medicalEvent.create({
      data: {
        patientId: document.patientId,
        documentId: document.id,
        eventType: event.eventType,
        eventDate: event.eventDate,
        title: event.title,
        description: event.description,
        extractedData: JSON.stringify(event.extractedData || {}),
        reviewStatus,
      },
    });

    return created;
  },
};
