import mongoose, { Document } from "mongoose";


export interface IBoard extends Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
    lists: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}