import express from 'express';
import User from '../models/User.ts';
import Dog from '../models/Dog.ts';
import { protect, admin } from '../middleware/auth.ts';

const router = express.Router();

// Get Dashboard Stats
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalDogs = await Dog.countDocuments();
        const pendingDogs = await Dog.countDocuments({ status: 'pending' });

        // In a real app, calculate revenue from Payment model
        const revenue = 42500;

        res.json({
            totalUsers,
            totalDogs,
            pendingDogs,
            revenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get All Dogs
router.get('/dogs', protect, admin, async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status && status !== 'all') {
            // @ts-ignore
            query = { status };
        }
        // Final_Pr Dog model uses 'ownerId'
        const dogs = await Dog.find(query).populate('ownerId', 'name email avatar');
        res.json(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Approve Dog Profile
router.put('/dogs/:id/approve', protect, admin, async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: 'Dog not found' });

        dog.status = 'approved';
        await dog.save();

        res.json({ message: 'Dog profile approved', dog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Reject Dog Profile
router.put('/dogs/:id/reject', protect, admin, async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: 'Dog not found' });

        dog.status = 'rejected';
        await dog.save();

        res.json({ message: 'Dog profile rejected', dog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
