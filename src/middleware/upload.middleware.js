import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/submissions";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpeg",
    "image/png",
    "video/mp4",
];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    cb(
        new Error("Unsupported file format."),
        false
    );
};

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
    fileFilter,
});

export default upload;