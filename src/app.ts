import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectDB from './config/database'
import errorHandler from './middleware/errorMiddleware';
import boardRouter from './router/board';
import listRouter from './router/list';
import cardRouter from './router/card';
import labelRouter from './router/label';
import commentRouter from './router/comment';
import atmRouter from './router/attachment';
import authRouter from './router/auth';
import cron from 'node-cron';
import cronSchedule from './utils/cron'
import workspaceRouter from './router/workspace';

dotenv.config();

const mongoURI: string = process.env.MONGODB_URI as string;

const app = express()

app.use(cookieParser());

app.use(express.json())
app.use(cors({
    origin: 'https://trello-app-1.vercel.app',
    credentials: true,
}))

app.use('/api', boardRouter)
app.use('/api', listRouter)
app.use('/api', cardRouter)
app.use('/api', labelRouter)
app.use('/api', commentRouter)
app.use('/api', atmRouter)
app.use('/api', authRouter)
app.use('/api', workspaceRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB(mongoURI);
        cron.schedule('* * * * *', async () => {
            await cronSchedule();
        });

        if (process.env.NODE_ENV === 'production') {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();

export const viteNodeApp = app