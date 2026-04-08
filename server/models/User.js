const db = require('../config/db');

class User {
    static async create(name, email, password, role = 'student') {
        const verificationStatus = role === 'employee' ? 'pending' : 'verified';
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role, verification_status) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, role, verificationStatus]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT id, name, email, role, created_at FROM users');
        return rows;
    }
}

module.exports = User;
