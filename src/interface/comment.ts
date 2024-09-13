import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
    text: string;
    user: mongoose.Types.ObjectId;
    card: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date
}