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

const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const board = await Board.findById(id).populate('lists').populate('cards').session(session);
        if (!board) {
            const err = createError('Board not found', 404);
            return next(err);
        }

        const idcards = (board.cards as unknown as ICard[]).map(card => card._id) as string[];

        const [_comment, _label, attachments] = await Promise.all([
            Comment.deleteMany({ cardId: { $in: idcards } }).session(session),
            Label.deleteMany({ cardId: { $in: idcards } }).session(session),
            Attachment.find({ cardId: { $in: idcards } }).session(session) as unknown as IAttachment[]
        ])
        const AttachmentURLs = attachments.map(attachment => attachment.url);

        if (AttachmentURLs.length) {
            AttachmentURLs.map(async (url) => {
                const publicId = url.replace(/https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\//, '').replace(/\.[^.]+$/, '');
                const result = await destroyImage(publicId, next);

                if (result.result !== 'ok') {
                    await session.abortTransaction();
                    return next(createError('Failed to delete old avatar', 400));
                }
            })
        }

        await Attachment.deleteMany({ cardId: { $in: idcards } }).session(session);

        await Promise.all([
            Card.deleteMany({ boardId: id }).session(session),
            List.deleteMany({ boardId: id }).session(session),
            Workspace.updateMany(
                { boards: id },
                { $pull: { boards: id } }
            ).session(session),
        ])

        await Board.findByIdAndDelete(id).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: 'Board deleted successfully'
        });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
}

export default deleteBoard;
