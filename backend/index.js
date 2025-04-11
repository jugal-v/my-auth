import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000
app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDb()
    console.log(`Server is running on port ${PORT}`);
})

