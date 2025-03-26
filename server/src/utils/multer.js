import multer from "multer";
import path from "path";
import fs from "fs";

// Function to configure storage dynamically
const configureStorage = () => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            let folder;
            if (file.fieldname === "video") {
                folder = "uploads/videos";
            } else if (file.fieldname === "thumbnail") {
                folder = "uploads/thumbnails";
            } else {
                folder = "uploads/misc"; // Default folder for unknown types
            }

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        }
    });
};

// Upload middleware for videos and thumbnails (2GB limit)
const uploadMedia = multer({
    storage: configureStorage(),
    limits: { fileSize: 2000 * 1024 * 1024 } // 2GB limit
});

// Upload middleware for avatars (5MB limit)
const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const folder = "uploads/avatars";
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `avatar-${uniqueSuffix}${ext}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export { uploadMedia, uploadAvatar };
