const Application = require('../models/Application');

const apply = async (req, res) => {
    try {
        const { studentId, hostelId } = req.body;
        // Check if student has an active application
        const active = await Application.existsActive(studentId);
        if (active) return res.status(403).json({ error: 'You already have an active or approved application. You can only re-apply if rejected.' });

        const id = await Application.create(studentId, hostelId);
        res.status(201).json({ id, message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentApplications = async (req, res) => {
    try {
        const apps = await Application.getByStudent(req.params.id);
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPending = async (req, res) => {
    try {
        const apps = await Application.getAllPending();
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { apply, getStudentApplications, getAllPending };
