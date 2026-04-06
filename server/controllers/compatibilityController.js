const Compatibility = require('../models/Compatibility');

const updateCompatibility = async (req, res) => {
    try {
        const { userId, sleep, clean, study, social, noise } = req.body;
        await Compatibility.update(userId, { sleep, clean, study, social, noise });
        res.json({ message: 'Compatibility updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCompatibility = async (req, res) => {
    try {
        const profile = await Compatibility.findByUserId(req.params.userId);
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { updateCompatibility, getCompatibility };
