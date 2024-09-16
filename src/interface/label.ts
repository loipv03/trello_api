import mongoose, { Document } from 'mongoose';

export interface ILabel extends Document {
    name: string;
    color: string;
    cardId?: mongoose.Types.ObjectId;
}
