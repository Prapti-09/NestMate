require('dotenv').config({ path: '../server/.env' });
const db = require('../server/config/db');

async function migrate() {
    try {
        console.log('Adding room_type to applications table...');
        await db.execute("ALTER TABLE applications ADD COLUMN room_type VARCHAR(50) DEFAULT 'Shared'");
        console.log('Migration successful.');
        process.exit();
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column already exists!');
            process.exit();
        }
        console.error(err);
        process.exit(1);
    }
}

migrate();
