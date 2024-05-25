import multer from "multer";
import path from 'path';

const random = () =>{
    return Math.floor(Math.random() * 10000 + 10000);
}

const maxSize = 50 * 1024 * 1024;

export default {
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            // o primeiro parametro é para receber erros
            cb(null, path.resolve(__dirname, '..', '..', 'static', 'files'))
        },
        filename: (req, file, cb) =>{
            cb(null, `${Date.now()}_${random()}${path.extname(file.originalname)}`)
        },
    }),
    fileFilter: (req, file, cb) =>{
        console.log(file);
        const allowedMimetypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/svg+xml",
            "image/x-icon",
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.ms-powerpoint"
        ];

        const allowedRegexPattern = new RegExp(`(${allowedMimetypes.join('|')})`);

        if(!allowedRegexPattern.test(file.mimetype) || !file.mimetype){
            return cb(new multer.MulterError('Arquivo do tipo invalido'));
        };

        return cb(null, true);
    },
    limits: { fileSize: maxSize }
};