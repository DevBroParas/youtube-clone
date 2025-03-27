import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

//load enviroment variables
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
// app.use(cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true
// }));

//Static file serving for uploaded videos and images
app.use('/uploads', express.static('uploads'));

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/users', userRoutes);

app.use((err, req,res,next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({message});
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});