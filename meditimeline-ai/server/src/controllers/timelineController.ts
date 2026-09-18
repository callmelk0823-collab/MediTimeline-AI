import type { Request, Response } from 'express';
import { parseJsonString } from '../utils/formatters.js';
import { prisma } from '../utils/prisma.js';

export async function getTimeline(_req: Request, res: Response) {
  const events = await prisma.medicalEvent.findMany({
    include: { patient: true, document: true },
    orderBy: { eventDate: 'desc' },
  });

  const normalized = events.map((event) => ({
    ...event,
    extractedData: parseJsonString(event.extractedData),
  }));

  return res.json({ success: true, data: normalized, message: 'Timeline retrieved successfully' });
}

export async function getPatientTimeline(req: Request, res: Response) {
  const patientId = String(req.params.id);
  const events = await prisma.medicalEvent.findMany({
    where: { patientId },
    include: { document: true },
    orderBy: { eventDate: 'desc' },
  });

  const normalized = events.map((event) => ({
    ...event,
    extractedData: parseJsonString(event.extractedData),
  }));

  return res.json({ success: true, data: normalized, message: 'Patient timeline retrieved successfully' });
}

export async function getEventById(req: Request, res: Response) {
  const eventId = String(req.params.id);
  const event = await prisma.medicalEvent.findUnique({
    where: { id: eventId },
    include: { patient: true, document: true },
  });

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found', error: 'Event not found' });
  }

  return res.json({ success: true, data: { ...event, extractedData: parseJsonString(event.extractedData) }, message: 'Event retrieved successfully' });
}
