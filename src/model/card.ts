import mongoose, { Schema, model } from 'mongoose';
import { ICard } from '../interface/card';

const cardSchema: Schema<ICard> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
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

const Card = model<ICard>('Card', cardSchema);
export default Card;
