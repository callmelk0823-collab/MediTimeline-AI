import type { Request, Response } from 'express';
import { z } from 'zod';
import { parseJsonString } from '../utils/formatters.js';
import { prisma } from '../utils/prisma.js';

const patientSchema = z.object({
  patientCode: z.string().min(1),
  name: z.string().min(1),
  age: z.number().min(0),
  gender: z.string().min(1),
});

export async function getPatients(_req: Request, res: Response) {
  const patients = await prisma.patient.findMany({
    include: {
      documents: true,
      events: true,
    },
  });

  const normalized = patients.map((patient) => ({
    ...patient,
    events: patient.events.map((event) => ({ ...event, extractedData: parseJsonString(event.extractedData) })),
  }));

  return res.json({ success: true, data: normalized, message: 'Patients retrieved successfully' });
}

export async function getPatientById(req: Request, res: Response) {
  const patientId = String(req.params.id);
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      documents: true,
      events: true,
    },
  });

  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found', error: 'Patient not found' });
  }

  const normalized = {
    ...patient,
    events: patient.events.map((event) => ({ ...event, extractedData: parseJsonString(event.extractedData) })),
  };

  return res.json({ success: true, data: normalized, message: 'Patient retrieved successfully' });
}

export async function createPatient(req: Request, res: Response) {
  const parsed = patientSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid patient payload', error: parsed.error.issues.map((issue) => issue.message).join(', ') });
  }

  const patient = await prisma.patient.create({ data: parsed.data });
  return res.status(201).json({ success: true, data: patient, message: 'Patient created successfully' });
}

export async function updatePatient(req: Request, res: Response) {
  const parsed = patientSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid patient payload', error: parsed.error.issues.map((issue) => issue.message).join(', ') });
  }

  const patientId = String(req.params.id);
  const patient = await prisma.patient.update({
    where: { id: patientId },
    data: parsed.data,
  });

  return res.json({ success: true, data: patient, message: 'Patient updated successfully' });
}

export async function deletePatient(req: Request, res: Response) {
  const patientId = String(req.params.id);
  await prisma.patient.delete({ where: { id: patientId } });
  return res.json({ success: true, message: 'Patient deleted successfully' });
}
