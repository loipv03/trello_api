import mongoose, { Schema, model } from 'mongoose';
import { IList } from '../interface/list';

const listSchema: Schema<IList> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
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

const List = model<IList>('List', listSchema);
export default List;
