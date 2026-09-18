import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import router from './routes/index.js';
import { env } from './utils/env.js';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: env.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  name: 'meditimeline.sid',
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    maxAge: 60 * 60 * 1000,
  },
}));

app.use('/api/auth', authLimiter);

app.use('/api', router);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(env.port, () => {
  console.log(`MediTimeline AI server running on http://localhost:${env.port}`);
});
