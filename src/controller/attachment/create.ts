import { Request, Response, NextFunction } from 'express';
import Attachment from '../../model/attachment';
import Card from '../../model/card';
import attachmentSchema from '../../schema/attachment';
import { ErrorResponse } from '../../middleware/errorMiddleware';
import { createError } from '../../utils/errorUtils';
import { Document } from 'mongoose';
import { IAttachment } from '../../interface/attachment';

const createAttachments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files || !Array.isArray(req.files)) {
            const err: ErrorResponse = createError("No files uploaded or invalid files format", 400);
            return next(err);
        }

        const attachments: (Document<unknown, {}, IAttachment> & IAttachment & Required<{ _id: unknown }>)[] = [];
        const cardId = req.body.cardId;

        for (const file of req.files) {
            const { originalname: filename, path: url, mimetype: fileType, size } = file;

            const attachmentData = {
                filename,
                url,
                fileType,
                size,
                cardId
            };

            const { error } = attachmentSchema.validate(attachmentData, { abortEarly: false });

            if (error) {
                const err: ErrorResponse = createError('Validation Error', 400, error.details.map(err => err.message));
                return next(err);
            }

            const newAttachment = await Attachment.create(attachmentData);
            attachments.push(newAttachment);
        }

        await Card.findByIdAndUpdate(
            cardId,
            { $push: { attachments: { $each: attachments.map((atm: IAttachment) => atm._id) } } }
        )

        return res.status(201).json({
            message: 'Upload successfully',
            attachments,
        });
    } catch (err) {
        next(err);
    }
};

export default createAttachments;
