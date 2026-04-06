const User = require('../models/User');
const Compatibility = require('../models/Compatibility');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user exists
        const exists = await User.findByEmail(email);
        if (exists) return res.status(400).json({ error: 'User already exists' });

        const userId = await User.create(name, email, password, role);
        if (role === 'student') {
            await Compatibility.create(userId);
        }

        res.status(201).json({ id: userId, name, email, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ id: user.id, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
