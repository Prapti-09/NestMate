require('dotenv').config({ path: '../server/.env' });
const db = require('../server/config/db');

async function seedSingleRooms() {
    try {
        console.log('Inserting Single Rooms...');
        
        // Hostels: 1 (Nelson Mandela), 2 (Kalpana Chawla), 3 (CV Raman)
        const hostels = [1, 2, 3];
        
        for (const h of hostels) {
            await db.execute(
                'INSERT INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (?, ?, ?, ?)',
                [h, '105-S', 1, 0]
            );
            await db.execute(
                'INSERT INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (?, ?, ?, ?)',
                [h, '106-S', 1, 0]
            );
            await db.execute(
                'INSERT INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (?, ?, ?, ?)',
                [h, '107-S', 1, 0]
            );
        }
        
        console.log('Single rooms added successfully.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedSingleRooms();
