import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';

import { connectionToDb } from './db/connectToDb.js';
import { app, server } from './socket/socket.js'

dotenv.config()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRouter);

server.listen(PORT, () => {
    connectionToDb()
    console.log(`server is running on port ${PORT}`)
})