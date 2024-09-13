import mongoose, { Document } from "mongoose";

export interface IAttachment extends Document {
    filename: string;
    url: string;
    fileType: string;
    size: number;
    card: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date
}