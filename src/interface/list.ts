import mongoose, { Document } from "mongoose";

export interface IList extends Document {
    name: string;
    positions: number;
    boardId: mongoose.Types.ObjectId;
    cards: mongoose.Types.ObjectId[];
}