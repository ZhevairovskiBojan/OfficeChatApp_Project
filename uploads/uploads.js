const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware to authenticate and authorize
const authMiddleware = require('./middleware/authMiddleware'); // Adjust this path as necessary

// Serve files securely from the uploads directory
router.use('/uploads', authMiddleware, express.static(path.join(__dirname, '..', 'uploads')));

// Route to access uploaded files explicitly
router.get('/uploads/:filename', authMiddleware, (req, res) => {
    const filename = path.basename(req.params.filename);  // Prevent directory traversal attacks
    const filePath = path.join(__dirname, '..', 'uploads', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.status(404).send('File not found.');
            } else {
                console.error(err);  // Log the error for server-side inspection
                res.status(500).send('Server error');
            }
        }
    });
});

module.exports = router;
