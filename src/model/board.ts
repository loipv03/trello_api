import mongoose, { Schema, Document, model } from 'mongoose';
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
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        lists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'List',
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
