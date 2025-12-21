import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Assume installed
import { UserModel, DogModel, MatchModel } from '../models/Schemas.ts';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret';

// --- Auth Routes ---
router.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user: any = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// --- Middleware ---
const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

// --- Dog Routes ---
router.get('/dogs', authMiddleware, async (req, res) => {
    // Basic filter logic
    const { breed, minAge, maxAge } = req.query;
    const query: any = { status: 'approved' };
    if (breed) query.breed = breed;
    if (minAge || maxAge) {
        query.age = {};
        if (minAge) query.age.$gte = Number(minAge);
        if (maxAge) query.age.$lte = Number(maxAge);
    }

    const dogs = await DogModel.find(query).populate('ownerId', 'name profileImage');
    res.json(dogs);
});

router.post('/dogs', authMiddleware, async (req: any, res) => {
    try {
        const dog = await DogModel.create({ ...req.body, ownerId: req.user.id });
        res.status(201).json(dog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// --- Match Routes ---
router.post('/matches', authMiddleware, async (req: any, res) => {
    try {
        const { receiverDogId, initiatorDogId } = req.body;
        // Verify ownership logic omitted for brevity
        const match = await MatchModel.create({
            initiatorDogId,
            receiverDogId,
            initiatorOwnerId: req.user.id,
            // You would normally look up the receiver owner ID here
        });
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send match request' });
    }
});

export default router;