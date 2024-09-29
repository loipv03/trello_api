import mongoose, { Document } from "mongoose";


export interface IBoard extends Document {
    name: string;
    description?: string;
    workspaceId: mongoose.Types.ObjectId;
    members: {
        userId: mongoose.Types.ObjectId;
        role: 'admin' | 'member' | 'viewer';
    }[];
    lists: string[];
    cards: string[];
}