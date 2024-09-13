import mongoose, { Document } from 'mongoose';

export interface ILabel extends Document {
    name: string;
    color: string;
    board: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
