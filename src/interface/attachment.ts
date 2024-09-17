import mongoose, { Document } from "mongoose";

export interface IAttachment extends Document {
    filename: string;
    url: string;
    fileType: string;
    size: number;
    cardId: mongoose.Types.ObjectId;
}