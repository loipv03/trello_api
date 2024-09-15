import mongoose, { Document } from "mongoose";

export interface IList extends Document {
    name: string;
    boardId: mongoose.Types.ObjectId;
    cards: mongoose.Types.ObjectId[];
}