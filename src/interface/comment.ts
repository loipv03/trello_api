import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
    text: string;
    userId: mongoose.Types.ObjectId;
    cardId: mongoose.Types.ObjectId;
}