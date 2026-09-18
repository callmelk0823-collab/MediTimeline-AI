import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { z } from 'zod';
import { parseJsonString } from '../utils/formatters.js';
import { prisma } from '../utils/prisma.js';
import { processDocument } from '../services/documentProcessor.js';
import { env } from '../utils/env.js';

const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.resolve(process.cwd(), env.uploadDir);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: env.maxFileSize },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Unsupported file type. Please upload PDF, PNG, JPG, or JPEG.'));
      return;
    }
    cb(null, true);
  },
});

export const uploadDocument = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload a valid file', error: 'No file provided' });
      }

      const uploadSchema = z.object({ patientId: z.string().min(1), documentType: z.string().min(1), documentDate: z.string().optional() });
      const parsed = uploadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: 'Invalid upload payload', error: parsed.error.issues.map((issue) => issue.message).join(', ') });
      }

      const document = await prisma.document.create({
        data: {
          patientId: parsed.data.patientId,
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
          documentType: parsed.data.documentType,
          documentDate: parsed.data.documentDate ? new Date(parsed.data.documentDate) : null,
          processingStatus: 'Processing',
          uploadedAt: new Date(),
          processedAt: null,
        },
      });

      return res.status(201).json({
        success: true,
        data: document,
        message: 'Document uploaded successfully',
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: 'Upload failed', error: error.message || 'Unexpected upload error' });
    }
  },
];

export async function getDocuments(_req: Request, res: Response) {
  const documents = await prisma.document.findMany({ include: { patient: true } });
  return res.json({ success: true, data: documents, message: 'Documents retrieved successfully' });
}

export async function getDocumentById(req: Request, res: Response) {
  const documentId = String(req.params.id);
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { patient: true, medicalEvents: true, extractionRecords: true },
  });

  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found', error: 'Document not found' });
  }

  const normalized = {
    ...document,
    medicalEvents: document.medicalEvents.map((event) => ({
      ...event,
      extractedData: parseJsonString(event.extractedData),
    })),
    extractionRecords: document.extractionRecords.map((record) => ({
      ...record,
      structuredData: parseJsonString(record.structuredData),
    })),
  };

  return res.json({ success: true, data: normalized, message: 'Document retrieved successfully' });
}

export async function deleteDocument(req: Request, res: Response) {
  const documentId = String(req.params.id);
  const document = await prisma.document.findUnique({ where: { id: documentId } });
  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found', error: 'Document not found' });
  }

  const filePath = path.resolve(process.cwd(), env.uploadDir, document.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await prisma.document.delete({ where: { id: documentId } });
  return res.json({ success: true, message: 'Document deleted successfully' });
}

export async function processDocumentById(req: Request, res: Response) {
  try {
    const result = await processDocument(String(req.params.id));
    return res.json({ success: true, data: result, message: 'Document processed successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Processing failed', error: error.message || 'Document processing error' });
  }
}
