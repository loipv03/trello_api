import mongoose, { Schema, Document, model } from 'mongoose';
import { IBoard } from '../interface/board';

const boardSchema: Schema<IBoard> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project', // Liên kết với model Project
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Liên kết với model User
            },
        ],
        lists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'List', // Liên kết với model List
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Board = model<IBoard>('Board', boardSchema);
export default Board;
