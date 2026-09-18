import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: Number(process.env.MAX_FILE_SIZE || 10 * 1024 * 1024),
  sessionSecret: process.env.SESSION_SECRET || 'dev-session-secret-change-me',
  jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret-change-me',
  totpEncryptionKey: process.env.TOTP_ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef',
  demoAdminEmail: process.env.DEMO_ADMIN_EMAIL || 'admin@meditimeline.ai',
  demoAdminUsername: process.env.DEMO_ADMIN_USERNAME || 'admin',
  demoAdminPassword: process.env.DEMO_ADMIN_PASSWORD || 'Admin@123',
  demoDoctorEmail: process.env.DEMO_DOCTOR_EMAIL || 'doctor@meditimeline.ai',
  demoDoctorUsername: process.env.DEMO_DOCTOR_USERNAME || 'doctor',
  demoDoctorPassword: process.env.DEMO_DOCTOR_PASSWORD || 'Doctor@123',
  demoStaffEmail: process.env.DEMO_STAFF_EMAIL || 'staff@meditimeline.ai',
  demoStaffUsername: process.env.DEMO_STAFF_USERNAME || 'staff',
  demoStaffPassword: process.env.DEMO_STAFF_PASSWORD || 'Staff@123',
};
