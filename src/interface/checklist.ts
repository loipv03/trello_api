import mongoose, { Document } from "mongoose";

export interface IChecklistItem {
    title: string;
    isChecked: boolean;
}

export interface IChecklist extends Document {
    title: string;
    card: mongoose.Types.ObjectId;
    items: IChecklistItem[];
    createdAt: Date;
    updatedAt: Date;
}