import multer from "multer";
import { Request } from 'express'

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {

    const allowedTypes = ['iamge/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Tipo de arquivo inválido'));
    }

}

export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // %MB
    }
}).single('avatar')