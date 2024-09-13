import mongoose, { Document } from "mongoose";

export interface IList extends Document {
    name: string;
    board: mongoose.Types.ObjectId;
    position: number;
    cards: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}