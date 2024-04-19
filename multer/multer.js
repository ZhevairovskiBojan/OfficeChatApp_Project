const express = require('express');
const multer = require('multer');

const router = express.Router();

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.send({ message: "File uploaded successfully!", file: req.file });
    } catch(err) {
        res.status(400).send({ message: "Failed to upload file.", error: err });
    }
});

module.exports = router;
