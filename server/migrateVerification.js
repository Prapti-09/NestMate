const db = require('./config/db');

async function run() {
    try {
        console.log("Adding verification_status to users table...");
        await db.execute("ALTER TABLE users ADD COLUMN verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'verified'");
        console.log("Migration successful!");
    } catch (e) {
        if (e.code === 'ER_DUP_FIELDNAME') {
            console.log("Column verification_status already exists. Skipping.");
        } else {
            console.error("Migration failed:", e);
        }
    } finally {
        process.exit();
    }
}

run();
