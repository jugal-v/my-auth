import express from 'express';
import { connectDb } from './db/connectDb.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'; 

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '/frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
