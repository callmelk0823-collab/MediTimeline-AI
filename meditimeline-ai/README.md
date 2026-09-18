# MediTimeline AI

MediTimeline AI is a hackathon prototype for organizing synthetic medical documents into a structured patient timeline with source traceability. The system extracts information explicitly mentioned in the uploaded documents and organizes it chronologically without diagnosing conditions or recommending treatment.

## Features

- Landing page and polished SaaS-style dashboard
- Patient list and patient detail drill-down
- Timeline view with event filters and source traceability
- Upload workflow for PDF/JPG/PNG docs with progress UI
- Mock OCR and deterministic extraction pipeline for demo mode
- Prisma + SQLite persistence with seeded synthetic demo data
- REST API for patients, documents, timeline, dashboard, and health checks
- Responsive design tailored for desktop, tablet, and mobile

## Technology Stack

Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Axios

Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Multer
- Zod

## Architecture

- Frontend in `client/`
- Backend in `server/`
- Shared project root scripts for development and database tasks

## Folder Structure

```text
meditimeline-ai/
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── server/
│   ├── src/
│   ├── prisma/
│   ├── uploads/
│   ├── .env.example
│   └── package.json
├── README.md
├── package.json
└── .gitignore
```

## Database Setup

The backend uses SQLite with Prisma.

1. Open the server folder.
2. Create a `.env` from `.env.example`.
3. Run Prisma migrations.
4. Seed the database.

## Installation

```bash
npm install
npm run install:all
```

## Environment Variables

Server `.env` example:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL="file:./dev.db"
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## How to Run Frontend

```bash
cd client
npm install
npm run dev
```

## How to Run Backend

```bash
cd server
npm install
npm run dev
```

## How to Seed Database

```bash
npm run db:migrate
npm run db:seed
```

## API Documentation

Base URL: `http://localhost:4000/api`

- `GET /api/health`
- `GET /api/patients`
- `GET /api/patients/:id`
- `GET /api/documents`
- `GET /api/documents/:id`
- `POST /api/documents/upload`
- `POST /api/documents/:id/process`
- `GET /api/timeline`
- `GET /api/patients/:id/timeline`
- `GET /api/events/:id`
- `GET /api/dashboard/stats`
- `GET /api/dashboard/recent-documents`

## Demo Flow

1. Open the landing page.
2. Click "Explore Demo".
3. Open the dashboard.
4. Browse patients and select one.
5. Open a patient timeline.
6. Click an event to see extracted information and source traceability.
7. Navigate to Upload.
8. Upload a synthetic demo PDF.
9. Watch the processing progress.
10. View the resulting timeline entry with source link.

## Limitations

- This is a prototype and should not be used for real clinical workflows.
- The mock extraction engine is deterministic and demo-only.
- No external OCR or AI API is required for the application to function.

## Privacy Disclaimer

MediTimeline AI is a hackathon prototype for document organization and information extraction. Do not upload real patient information. All demo data is synthetic and fictional.
