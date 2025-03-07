import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js'; // Ensure the correct file path

dotenv.config();

const app = express();
app.use(express.json());

// Allow CORS for both localhost (development) and your production domain
const allowedOrigins = [
  'http://localhost:3010', // Dev frontend
  'https://tezzeraktmedia.space', // Production frontend
  'https://www.tezzeraktmedia.space' // Production frontend with www
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use email routes
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
