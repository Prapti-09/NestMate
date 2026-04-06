const db = require('../config/db');

class Allocation {
    static async create(applicationId, roomId) {
        const [result] = await db.execute(
            'INSERT INTO allocations (application_id, room_id) VALUES (?, ?)',
            [applicationId, roomId]
        );
        return result.insertId;
    }

    static async getByStudent(studentId) {
        const [rows] = await db.execute(
            'SELECT a.id, r.room_number, h.name as hostel_name FROM allocations a JOIN applications ap ON a.application_id = ap.id JOIN rooms r ON a.room_id = r.id JOIN hostels h ON r.hostel_id = h.id WHERE ap.student_id = ?',
            [studentId]
        );
        return rows[0];
    }
}

class StaffLog {
    static async record(employeeId, action) {
        await db.execute(
            'INSERT INTO staff_logs (employee_id, action) VALUES (?, ?)',
            [employeeId, action]
        );
    }

    static async getPerformance(employeeId) {
        const [rows] = await db.execute(
            'SELECT action, COUNT(*) as count FROM staff_logs WHERE employee_id = ? GROUP BY action',
            [employeeId]
        );
        return rows;
    }
}

module.exports = { Allocation, StaffLog };
