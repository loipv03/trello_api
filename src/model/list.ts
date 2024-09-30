import mongoose, { Schema, model } from 'mongoose';
import { IList } from '../interface/list';
import mongoosePaginateV2 from 'mongoose-paginate-v2'

interface ListModel extends mongoose.Model<IList> {
    paginate(query: object, options: object): Promise<any>;
}

const listSchema: Schema<IList> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        positions: {
            type: Number,
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

listSchema.plugin(mongoosePaginateV2)

const List = model<IList, ListModel>('List', listSchema);
export default List;
