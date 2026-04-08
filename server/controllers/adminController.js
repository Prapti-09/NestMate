const db = require('../config/db');

const getAdminDashboard = async (req, res) => {
    try {
        // Summary Stats
        const [usersCount] = await db.execute('SELECT COUNT(*) as count FROM users');
        const [hostelsCount] = await db.execute('SELECT COUNT(*) as count FROM hostels');
        const [appsCount] = await db.execute('SELECT COUNT(*) as count FROM applications');
        const [allocCount] = await db.execute('SELECT COUNT(*) as count FROM allocations');
        
        res.json({
            users: usersCount[0].count,
            hostels: hostelsCount[0].count,
            applications: appsCount[0].count,
            allocations: allocCount[0].count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdminHostels = async (req, res) => {
    try {
        const [hostels] = await db.execute('SELECT * FROM hostels');
        const results = [];
        for (const hostel of hostels) {
            const [rooms] = await db.execute('SELECT COUNT(*) as count FROM rooms WHERE hostel_id = ?', [hostel.id]);
            results.push({ ...hostel, rooms_count: rooms[0].count });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdminStaff = async (req, res) => {
    try {
        const [staff] = await db.execute('SELECT id, name, email, verification_status FROM users WHERE role = "employee" ORDER BY CASE WHEN verification_status = "pending" THEN 1 ELSE 2 END, created_at DESC');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStaffVerification = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await db.execute('UPDATE users SET verification_status = ? WHERE id = ?', [status, id]);
        res.json({ message: `Staff verification updated to ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAdminDashboard, getAdminHostels, getAdminStaff, updateStaffVerification };
