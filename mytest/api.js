import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 8080;

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
}

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    //返回id，文件名，文件大小
    res.json({
        id: req.file.filename,
        text: req.file.originalname,
        a: req.file.size
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});