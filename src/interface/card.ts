import mongoose, { Document } from "mongoose";

export interface ICard extends Document {
    title: string;
    description?: string;
    positions: number;
    listId: mongoose.Types.ObjectId;
    boardId: mongoose.Types.ObjectId;
    members: string[];
    startDate: Date;
    dueDate?: Date;
    labels: string[];
    attachments: string[];
    comments: string[];
}