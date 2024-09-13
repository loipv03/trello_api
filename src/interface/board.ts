import mongoose, { Document } from "mongoose";


export interface IBoard extends Document {
    name: string;
    description?: string;
    project: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    lists: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}