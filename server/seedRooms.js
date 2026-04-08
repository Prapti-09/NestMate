const db = require('./config/db');

async function seedRooms() {
    try {
        console.log("Seeding rooms into database...");
        // Add rooms to Hostel 1 (Nelson Mandela Hall)
        await db.execute("INSERT IGNORE INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (1, '101-A', 2, 0)");
        await db.execute("INSERT IGNORE INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (1, '102-B', 2, 0)");
        
        // Add rooms to Hostel 2 (Kalpana Chawla Hall)
        await db.execute("INSERT IGNORE INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (2, '201-A', 2, 0)");
        await db.execute("INSERT IGNORE INTO rooms (hostel_id, room_number, capacity, occupied_count) VALUES (2, '202-B', 2, 0)");
        
        console.log("Rooms added successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Failed to seed rooms:", err);
        process.exit(1);
    }
}

seedRooms();
