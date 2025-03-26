import multer from "multer";
import path from "path";
import fs from "fs";

// Function to configure storage dynamically
const configureStorage = (folder, prefix) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, `${prefix}-${uniqueSuffix}${ext}`);
        }
    });
};

// Upload middleware for videos and thumbnails (2GB limit)
const uploadMedia = multer({
    storage: configureStorage('uploads/videos', 'video'),
    limits: { fileSize: 2000 * 1024 * 1024 } // 2GB limit
});

// Upload middleware for avatars (5MB limit)
const uploadAvatar = multer({
    storage: configureStorage('uploads/avatars', 'avatar'),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export { uploadMedia, uploadAvatar };

