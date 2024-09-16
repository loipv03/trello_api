import mongoose, { Document } from "mongoose";


export interface IBoard extends Document {
    name: string;
    description?: string;
    members: {
        userId: mongoose.Types.ObjectId;
        role: 'Admin' | 'Member' | 'Viewer';
    }[];
    lists: string[];
}