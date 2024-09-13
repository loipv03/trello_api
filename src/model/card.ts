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
            required: false,
        },
        list: {
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
        dueDate: {
            type: Date,
            required: false,
        },
        labels: [
            {
                type: String,
                required: false,
            },
        ],
        attachments: [
            {
                type: String,
                required: false,
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
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
