import mongoose, { Document } from "mongoose";

export interface ICard extends Document {
    title: string;
    description?: string;
    listId: mongoose.Types.ObjectId;
    members: string[];
    dueDate?: Date;
    labels: string[];
    attachments: string[];
    comments: string[];
}