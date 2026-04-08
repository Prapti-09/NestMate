const Application = require('../models/Application');

const apply = async (req, res) => {
    try {
        const { user_id, hostel_id, hostel_name, room_type, monthly_payment } = req.body;
        // Check if student has an active application
        const active = await Application.existsActive(user_id);
        if (active) return res.status(403).json({ error: 'You already have an active or approved application.' });

        console.log("Incoming Booking Request:", req.body);
        const id = await Application.create(user_id, hostel_id, room_type);
        res.status(201).json({ id, message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Backend Error: " + error.message });
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

const deleteApplication = async (req, res) => {
    try {
        await Application.deleteApplication(req.params.id);
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { apply, getStudentApplications, getAllPending, deleteApplication };
