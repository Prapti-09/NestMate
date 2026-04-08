const db = require('../config/db');

class Compatibility {
    static async create(userId) {
        // Initialize with defaults
        await db.execute('INSERT INTO compatibility (user_id) VALUES (?)', [userId]);
    }

    static async update(userId, data) {
        const { sleep, clean, study, social, noise } = data;
        await db.execute(
            'UPDATE compatibility SET sleep = ?, clean = ?, study = ?, social = ?, noise = ? WHERE user_id = ?',
            [sleep, clean, study, social, noise, userId]
        );
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute('SELECT * FROM compatibility WHERE user_id = ?', [userId || null]);
        return rows[0];
    }

    // Scoring Logic (Advanced)
    static calculateMatchPercentage(p1, p2) {
        let totalWeights = 0;
        let matchedWeights = 0;

        const attributes = {
            sleep: 40,  // Sleeping habits are most important for roommates
            clean: 30,  // Cleanliness is critical
            study: 10,
            social: 10,
            noise: 10
        };

        for (const [attr, weight] of Object.entries(attributes)) {
            totalWeights += weight;
            if (p1[attr] === p2[attr]) {
                matchedWeights += weight;
            }
        }

        return Math.round((matchedWeights / totalWeights) * 100);
    }
}

module.exports = Compatibility;