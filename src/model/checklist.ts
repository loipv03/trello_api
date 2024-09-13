import mongoose, { Schema, model } from 'mongoose';

import { IChecklist, IChecklistItem } from '../interface/checklist';

const checklistItemSchema: Schema<IChecklistItem> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        isChecked: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
        timestamps: true,
        versionKey: false
    },

);

const checklistSchema: Schema<IChecklist> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true,
        },
        items: [checklistItemSchema],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Checklist = model<IChecklist>('Checklist', checklistSchema);
export default Checklist;
