import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//load environment variables
dotenv.config();

//Import routes
import authRoutes from './routes/auth.route.js';
import videoRoutes from './routes/video.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/api/v1/uploads/avatars', express.static(path.join(uploadsPath, 'avatars')));
app.use('/api/v1/uploads/thumbnails', express.static(path.join(uploadsPath, 'thumbnails')));

// Logging middleware
app.use('/api/v1/uploads', (req, res, next) => {
    console.log(`File request received for: ${req.url}`);
    next();
});
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));

// Single static file serving middleware
app.use('/api/v1/uploads', express.static(path.join(process.cwd(), 'uploads')));

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({message});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});