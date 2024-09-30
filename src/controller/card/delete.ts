import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { createError } from '../../utils/errorUtils';
import List from '../../model/list';
import { IList } from '../../interface/list';
import { ErrorResponse } from '../../middleware/errorMiddleware'
import Comment from '../../model/comment';
import Label from '../../model/label';
import Attachment from '../../model/attachment';
import { IAttachment } from '../../interface/attachment';
import { destroyImage } from '../../config/cloudinary';
import Card from '../../model/card';


const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    let errResponse: ErrorResponse
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { id } = req.params;

        const card = await Card.findById<IList>(id).session(session)

        if (!card) {
            errResponse = createError('Card not found', 404);
            return next(errResponse);
        }

        await Promise.all([
            Comment.deleteMany({ cardId: id }).session(session),
            Label.deleteMany({ cardId: id }).session(session)
        ]);

        const attachments = await Attachment.find({ cardId: id }).session(session) as unknown as IAttachment[];
        const AttachmentURLs = attachments.map(attachment => attachment.url);

        if (AttachmentURLs.length) {
            for (const url of AttachmentURLs) {
                const publicId = url.replace(/https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\//, '').replace(/\.[^.]+$/, '');
                const result = await destroyImage(publicId, next);

                if (result.result !== 'ok') {
                    await session.abortTransaction();
                    return next(createError('Failed to delete old avatar', 400));
                }
            }
        }

        const cardPosition = card.positions;
        await Promise.all([
            Attachment.deleteMany({ cardId: id }).session(session),
            Card.findByIdAndDelete(id).session(session),
            List.findByIdAndDelete(id).session(session),
            Card.updateMany(
                { positions: { $gt: cardPosition } },
                { $inc: { positions: -1 } },
                { session }
            )
        ]);

        await session.commitTransaction();
        res.status(200).json({ message: 'List deleted successfully' });
    } catch (err) {
        await session.abortTransaction()
        next(err);
    } finally {
        session.endSession()
    }
}

export default deleteCard