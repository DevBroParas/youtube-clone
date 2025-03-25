import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Configure multer for file upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dist = file.fieldname === 'video' ? 'uploads/videos' : 'uploads/thumbnails';

        //Create directory if it doesn't exist
        if (!fs.existsSync(dist)) {
            fs.mkdirSync(dist, { recursive: true });
        }
        cb(null, dist);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
})

const upload = multer({
    storage,limits:{fileSize: 2000*1024*1024} // 2GB limit
})

export default upload;