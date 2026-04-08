const db = require('../config/db');

class Hostel {
    static async create(name, type, total_rooms, total_capacity) {
        const [result] = await db.execute(
            'INSERT INTO hostels (name, type, total_rooms, total_capacity) VALUES (?, ?, ?, ?)',
            [name, type, total_rooms, total_capacity]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute(`
            SELECT h.*, 
                IFNULL((SELECT COUNT(*) FROM rooms WHERE hostel_id = h.id AND occupied_count < capacity), 0) as available_rooms
            FROM hostels h
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM hostels WHERE id = ?', [id || null]);
        return rows[0];
    }
}

class Room {
    static async create(hostel_id, room_number, capacity) {
        const [result] = await db.execute(
            'INSERT INTO rooms (hostel_id, room_number, capacity) VALUES (?, ?, ?)',
            [hostel_id, room_number, capacity]
        );
        return result.insertId;
    }

    static async findByHostel(hostelId) {
        const [rows] = await db.execute('SELECT * FROM rooms WHERE hostel_id = ?', [hostelId || null]);
        return rows;
    }

    static async findByAvailable(hostelId) {
        // Find rooms with capacity available
        const [rows] = await db.execute(
            'SELECT * FROM rooms WHERE hostel_id = ? AND occupied_count < capacity',
            [hostelId || null]
        );
        return rows;
    }

    static async incrementOccupancy(roomId) {
        await db.execute('UPDATE rooms SET occupied_count = occupied_count + 1 WHERE id = ?', [roomId || null]);
    }
}

module.exports = { Hostel, Room };
