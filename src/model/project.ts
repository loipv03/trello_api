import mongoose, { Schema, model } from "mongoose";
import { IProject } from '../interface/project'

const projectSchema: Schema<IProject> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        boards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Board',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Project = model<IProject>('Project', projectSchema);
export default Project;