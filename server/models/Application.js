const db = require('../config/db');

class Application {
    static async existsActive(studentId) {
        // Active = pending or approved
        const [rows] = await db.execute(
            'SELECT * FROM applications WHERE student_id = ? AND status != "rejected"',
            [studentId]
        );
        return rows.length > 0;
    }

    static async create(studentId, hostelId) {
        const [result] = await db.execute(
            'INSERT INTO applications (student_id, hostel_id) VALUES (?, ?)',
            [studentId, hostelId]
        );
        return result.insertId;
    }

    static async updateStatus(id, status) {
        await db.execute('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    }

    static async getByStudent(studentId) {
        const [rows] = await db.execute(
            'SELECT a.id, a.status, a.created_at, h.name FROM applications a JOIN hostels h ON a.hostel_id = h.id WHERE a.student_id = ?',
            [studentId]
        );
        return rows;
    }

    static async getAllPending() {
        const [rows] = await db.execute(
            'SELECT a.id, a.student_id, a.hostel_id, a.status, a.created_at, u.name, h.name as hostel_name FROM applications a JOIN users u ON a.student_id = u.id JOIN hostels h ON a.hostel_id = h.id WHERE a.status = "pending" ORDER BY a.created_at ASC'
        );
        return rows;
    }
}

module.exports = Application;
