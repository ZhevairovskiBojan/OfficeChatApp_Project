const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware'); 
const User = require("../models/User"); 


router.get('/profile', async (req, res) => { // authMiddlewarw after testing
    try {
    
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/update-profile',  async (req, res) => { // authMiddlewarw after testing
    try {
        const { name, email } = req.body;  
        const user = await User.findByIdAndUpdate(req.user.id, 
            { $set: { name, email }}, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;