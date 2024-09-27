import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { createError } from '../utils/errorUtils';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req: Request, _file) => {
        const folder = req.path === '/uploadAvatar' ? 'avatar' : 'attachment'
        return {
            folder: `trello/${folder}`,
            allowed_formats: ['jpg', 'png', 'jpeg']
        }
    }
});

export const destroyImage = async (public_id: string, next: NextFunction) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        return next(error)
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
