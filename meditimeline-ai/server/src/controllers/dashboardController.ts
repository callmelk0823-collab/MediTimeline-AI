import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export async function getDashboardStats(_req: Request, res: Response) {
  const [patientCount, documentCount, eventCount, needsReviewCount] = await Promise.all([
    prisma.patient.count(),
    prisma.document.count(),
    prisma.medicalEvent.count(),
    prisma.medicalEvent.count({ where: { reviewStatus: 'NEEDS_REVIEW' } }),
  ]);

  return res.json({
    success: true,
    data: {
      totalPatients: patientCount,
      totalDocuments: documentCount,
      totalEvents: eventCount,
      needsReview: needsReviewCount,
    },
    message: 'Dashboard stats retrieved successfully',
  });
}

export async function getRecentDocuments(_req: Request, res: Response) {
  const documents = await prisma.document.findMany({
    include: { patient: true },
    orderBy: { uploadedAt: 'desc' },
    take: 8,
  });

  return res.json({
    success: true,
    data: documents,
    message: 'Recent documents retrieved successfully',
  });
}
