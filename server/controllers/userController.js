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

        const verification_status = role === 'employee' ? 'pending' : 'verified';
        res.status(201).json({ id: userId, name, email, role, verification_status });
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

        if (user.role === 'employee' && user.verification_status !== 'verified') {
            return res.status(403).json({ 
                error: user.verification_status === 'pending' 
                  ? 'Sent to admin for verification' 
                  : 'Registration rejected by admin' 
            });
        }

        res.json({ id: user.id, name: user.name, role: user.role, verification_status: user.verification_status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
