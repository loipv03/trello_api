import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/database'
import errorHandler from './middleware/errorMiddleware';
import boardRouter from './router/board';
import listRouter from './router/list';
import cardRouter from './router/card';
import labelRouter from './router/label';
import commentRouter from './router/comment';

dotenv.config();

const mongoURI: string = process.env.MONGODB_URI as string;

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', boardRouter)
app.use('/api', listRouter)
app.use('/api', cardRouter)
app.use('/api', labelRouter)
app.use('/api', commentRouter)

app.use(errorHandler);

connectDB(mongoURI)

export const viteNodeApp = app