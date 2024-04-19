const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Event = require('../models/Events');

// Create Event
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, startTime, endTime, isPublic } = req.body;
    try {
        const event = new Event({
            title,
            description,
            startTime,
            endTime,
            isPublic,
            createdBy: req.user.id
        });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get All Events
router.get('/', authMiddleware, async (req, res) => {
    try {
        const events = await Event.find().sort({ startTime: 1 });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Single Event
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Update Event
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, startTime, endTime, isPublic } = req.body;
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check user authorization
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, {
            $set: {
                title,
                description,
                startTime,
                endTime,
                isPublic
            }
        }, { new: true });

        res.json(event);
    } catch (err) {
        console.error(err);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Delete Event
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check user authorization
        if (event.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await event.remove();
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
