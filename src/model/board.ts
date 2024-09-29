import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IBoard } from '../interface/board';

interface BoardModel extends mongoose.Model<IBoard> {
    paginate(query: object, options: object): Promise<any>;
}

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
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true,
        },
        members: [
            {
                _id: false,
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                role: {
                    type: String,
                    enum: ['admin', 'member', 'viewer'],
                    default: 'member',
                },
            }
        ],
        lists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'List',
            },
        ],
        cards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

boardSchema.plugin(mongoosePaginate)

const Board = model<IBoard, BoardModel>('Board', boardSchema);
export default Board;
