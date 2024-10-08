import mongoose, { Schema, model } from 'mongoose';
import { IComment } from '../interface/comment';

const commentSchema: Schema<IComment> = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;
