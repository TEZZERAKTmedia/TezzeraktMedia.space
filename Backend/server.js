import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js'; // Import email routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use email routes
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
