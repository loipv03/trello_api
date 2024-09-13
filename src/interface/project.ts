import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
    boards: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
