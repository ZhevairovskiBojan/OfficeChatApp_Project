const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware to authenticate and authorize
// const authMiddleware = require("../middleware/authMiddleware"); 

const multer = require('multer');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => { //authMiddleware
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(201).send(`File uploaded successfully: ${req.file.path}`);
});



// Route to access uploaded files explicitly
router.get('/uploads/:filename', (req, res) => { //authMiddleware
    const filename = path.basename(req.params.filename);  // Prevent directory traversal attacks
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            if (err.code === "ENOENT") {
                
                res.status(404).json({ message: 'File not found' });
            } else {
                console.error(err);  // Log the error for server-side inspection
                res.status(500).json({ message: 'Server error', error: err.message });
            }
        }
    });
});

module.exports = router;
