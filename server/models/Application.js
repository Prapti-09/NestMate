const db = require('../config/db');

class Application {
    static async existsActive(studentId) {
        // Active = pending or approved
        const [rows] = await db.execute(
            'SELECT * FROM applications WHERE student_id = ? AND status != \'rejected\'',
            [studentId !== undefined ? studentId : null]
        );
        return rows.length > 0;
    }

    static async create(userId, hostelId, roomType = 'Shared') {
        // Convert and Validate
        const sId = parseInt(userId);
        const hId = parseInt(hostelId);
        
        if (!sId || !hId) {
            throw new Error(`Invalid Data: student_id(${userId}) or hostel_id(${hostelId}) is missing.`);
        }
        
        const [result] = await db.execute(
            'INSERT INTO applications (student_id, hostel_id, room_type, status) VALUES (?, ?, ?, \'pending\')',
            [sId !== undefined && !isNaN(sId) ? sId : null, hId !== undefined && !isNaN(hId) ? hId : null, roomType !== undefined ? roomType : 'Shared']
        );
        return result.insertId;
    }

    static async updateStatus(id, status) {
        await db.execute('UPDATE applications SET status = ? WHERE id = ?', [status !== undefined ? status : null, id !== undefined ? id : null]);
    }

    static async getByStudent(studentId) {
        const [rows] = await db.execute(
            'SELECT a.id, a.status, a.created_at, h.name FROM applications a JOIN hostels h ON a.hostel_id = h.id WHERE a.student_id = ?',
            [studentId !== undefined ? studentId : null]
        );
        return rows;
    }

    static async getAllPending() {
        const [rows] = await db.execute(`
            SELECT 
                a.id, 
                a.student_id,
                a.hostel_id,
                a.status, 
                a.room_type,
                a.created_at, 
                u.name as user_name, 
                u.email as user_email,
                h.name as hostel_name
            FROM applications a 
            JOIN users u ON a.student_id = u.id 
            JOIN hostels h ON a.hostel_id = h.id 
            WHERE a.status IN ('pending', 'received')
            ORDER BY a.created_at DESC
        `);
        return rows;
    }

    static async deleteApplication(id) {
        // First check if they were already allocated a room, and free up that bed!
        const [allocs] = await db.execute('SELECT room_id FROM allocations WHERE application_id = ?', [id]);
        if (allocs.length > 0) {
            await db.execute('UPDATE rooms SET occupied_count = occupied_count - 1 WHERE id = ?', [allocs[0].room_id]);
            await db.execute('DELETE FROM allocations WHERE application_id = ?', [id]);
        }
        // Then delete the application itself
        await db.execute('DELETE FROM applications WHERE id = ?', [id]);
    }
}

module.exports = Application;
