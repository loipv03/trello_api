import express from 'express'
import upload from '../config/cloudinary'
import { atmControllers } from '../controller/attachment';

const atmRouter = express.Router()

atmRouter.post('/attachments', upload.array('image'), atmControllers.createAttachment);

export default atmRouter