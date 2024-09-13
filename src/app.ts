import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import connectDB from './config/database'

dotenv.config();

const mongoURI: string = process.env.MONGODB_URI as string;

const app = express()

app.use(express.json())
app.use(cors())


connectDB(mongoURI)



export const viteNodeApp = app