import { Request, Response, NextFunction } from 'express';
import Board from '../../model/board';
import mongoose from 'mongoose';
import { createError } from '../../utils/errorUtils';
import List from '../../model/list';
import Card from '../../model/card';
import Comment from '../../model/comment';
import Label from '../../model/label';
import Attachment from '../../model/attachment';
import { ICard } from '../../interface/card';
import { IAttachment } from '../../interface/attachment';
import { destroyImage } from '../../config/cloudinary';
import Workspace from '../../model/workspace';
import { IBoard } from '../../interface/board';

const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        // Kiểm tra xem workspace có tồn tại không
        const workspace = await Workspace.findById(id).populate('boards').session(session);
        if (!workspace) {
            return next(createError('Workspace not found', 404));
        }

        const idBoards = (workspace.boards as unknown as IBoard[]).map(board => board._id) as string[];

        // Lấy danh sách card liên quan
        const cards = await Card.find({ boardId: { $in: idBoards } }).session(session) as ICard[];
        const idCards = cards.map(card => card._id);

        // Xóa comments và labels
        await Comment.deleteMany({ cardId: { $in: idCards } }).session(session);
        await Label.deleteMany({ cardId: { $in: idCards } }).session(session);

        // Lấy các attachment
        const attachments = await Attachment.find({ cardId: { $in: idCards } }).session(session) as unknown as IAttachment[];
        const AttachmentURLs = attachments.map(attachment => attachment.url);

        if (AttachmentURLs.length) {
            for (const url of AttachmentURLs) {
                const publicId = url.replace(/https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\//, '').replace(/\.[^.]+$/, '');
                const result = await destroyImage(publicId, next);

                if (result.result !== 'ok') {
                    await session.abortTransaction();
                    return next(createError('Failed to delete attachment from Cloudinary', 400));
                }
            }
        }

        // Xóa attachments
        await Attachment.deleteMany({ cardId: { $in: idCards } }).session(session);

        // Xóa cards và lists
        await Card.deleteMany({ boardId: { $in: idBoards } }).session(session);
        await List.deleteMany({ boardId: { $in: idBoards } }).session(session);

        // Xóa board
        await Board.deleteMany({ workspaceId: id }).session(session);

        // Xóa workspace
        await Workspace.findByIdAndDelete(id).session(session);

        // Commit transaction
        await session.commitTransaction();
        res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
}

export default deleteWorkspace;
