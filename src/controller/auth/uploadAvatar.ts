import { Response, NextFunction } from 'express';
import User from '../../model/user';
import { AuthenticatedRequest } from '../../interface/user';
import { createError } from '../../utils/errorUtils';
import { destroyImage } from '../../config/cloudinary';

const uploadAvatar = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const idUser = req.user_id;

    try {
        if (!req.file) {
            return next(createError('No file uploaded', 400));
        }

        const user = await User.findById(idUser);
        if (!user) {
            return next(createError('User not found', 404));
        }

        const oldAvatar = user.avatar as string;

        if (oldAvatar) {
            const publicId = oldAvatar.replace(/https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\//, '').replace(/\.[^.]+$/, '');
            const result = await destroyImage(publicId, next);

            if (result.result !== 'ok') {
                return next(createError('Failed to delete old avatar', 400));
            }
        }



        user.avatar = req.file.path;
        await user.save();

        return res.status(200).json({
            message: 'Avatar updated successfully',
        });

    } catch (error) {
        next(error);
    }
};

export default uploadAvatar;
