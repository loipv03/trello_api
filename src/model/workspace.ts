import mongoose, { model, Schema } from "mongoose";
import { IWorkspace } from "../interface/workspace";
import mongoosePaginate from 'mongoose-paginate-v2'

interface WorkspaceModel extends mongoose.Model<IWorkspace> {
    paginate(query: object, options: object): Promise<any>;
}

const workspaceSchema = new Schema<IWorkspace>({
    name: { type: String, required: true },
    description: { type: String },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
        },
    ],
    members: [
        {
            _id: false,
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            role: {
                type: String,
                enum: ['admin', 'member', 'viewer'],
                default: 'member',
            },
        }
    ],
}, { timestamps: true, versionKey: false });

workspaceSchema.plugin(mongoosePaginate)

const Workspace = model<IWorkspace, WorkspaceModel>('Workspace', workspaceSchema);
export default Workspace;