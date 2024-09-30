import mongoose, { Schema, model } from 'mongoose';
import { ICard } from '../interface/card';
import mongoosePaginateV2 from 'mongoose-paginate-v2'

interface CardModel extends mongoose.Model<ICard> {
    paginate(query: object, options: object): Promise<any>;
}


const cardSchema: Schema<ICard> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        positions: {
            type: Number,
            required: true
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
            required: true,
        },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        startDate: {
            type: Date,
            default: Date.now
        },
        dueDate: {
            type: Date,
            default: ''
        },
        labels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Label',
            },
        ],
        attachments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

cardSchema.plugin(mongoosePaginateV2)

const Card = model<ICard, CardModel>('Card', cardSchema);
export default Card;
