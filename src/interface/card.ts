import mongoose, { Document } from "mongoose";

export interface ICard extends Document {
    title: string;
    description?: string;
    list: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    dueDate?: Date;
    labels: string[];
    attachments: string[];
    comments: { user: mongoose.Types.ObjectId; text: string; createdAt: Date }[];
    createdAt: Date;
    updatedAt: Date;
}