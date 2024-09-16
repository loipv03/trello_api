import mongoose, { model, Schema } from "mongoose";
import { ILabel } from "../interface/label";

const labelSchema: Schema<ILabel> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
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

const Label = model<ILabel>('Label', labelSchema);
export default Label;