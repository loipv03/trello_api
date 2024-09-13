import mongoose, { Schema, model } from 'mongoose';
import { IAttachment } from '../interface/attachment';

const attachmentSchema: Schema<IAttachment> = new Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        card: {
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

const Attachment = model<IAttachment>('Attachment', attachmentSchema);
export default Attachment;
