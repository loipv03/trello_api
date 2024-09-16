import mongoose, { Document } from "mongoose";

export interface ICard extends Document {
    title: string;
    description?: string;
    listId: mongoose.Types.ObjectId;
    members: string[];
    startDate: Date;
    dueDate?: Date;
    labels: string[];
    attachments: string[];
    comments: string[];
}