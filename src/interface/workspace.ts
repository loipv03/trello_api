import mongoose from "mongoose";

export interface IWorkspace extends Document {
    name: string;
    description?: string;
    boards: string[];
    members: {
        userId: mongoose.Types.ObjectId;
        role: 'admin' | 'member' | 'viewer';
    }[];
    createdAt: Date;
    updatedAt: Date;
}