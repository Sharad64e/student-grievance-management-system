import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Student Grievance Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
