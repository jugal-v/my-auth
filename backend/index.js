import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000
app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.use(express.json()) //allows us to parse json from incoming payloads
app.use(cookieParser()) //allows us to parse incoming cookies

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDb()
    console.log(`Server is running on port ${PORT}`);
})

