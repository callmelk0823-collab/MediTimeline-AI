import { Router } from 'express';
import { login, logout, me, verifyTotp } from '../controllers/authController.js';
import { getDashboardStats, getRecentDocuments } from '../controllers/dashboardController.js';
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import { getDocuments, getDocumentById, uploadDocument, deleteDocument, processDocumentById } from '../controllers/documentController.js';
import { getTimeline, getPatientTimeline, getEventById } from '../controllers/timelineController.js';
import { healthCheck } from '../controllers/healthController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', requireAuth, me);
router.post('/auth/verify-totp', requireAuth, verifyTotp);

router.get('/health', healthCheck);

router.use(requireAuth);

router.get('/patients', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', requireRole(['ADMIN', 'DOCTOR']), createPatient);
router.put('/patients/:id', requireRole(['ADMIN', 'DOCTOR']), updatePatient);
router.delete('/patients/:id', requireRole(['ADMIN']), deletePatient);

router.get('/documents', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getDocuments);
router.get('/documents/:id', getDocumentById);
router.post('/documents/upload', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), uploadDocument);
router.post('/documents/:id/process', requireRole(['ADMIN', 'DOCTOR']), processDocumentById);
router.delete('/documents/:id', requireRole(['ADMIN', 'DOCTOR']), deleteDocument);

router.get('/timeline', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getTimeline);
router.get('/patients/:id/timeline', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getPatientTimeline);
router.get('/events/:id', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getEventById);

router.get('/dashboard/stats', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getDashboardStats);
router.get('/dashboard/recent-documents', requireRole(['ADMIN', 'DOCTOR', 'STAFF']), getRecentDocuments);

export default router;
