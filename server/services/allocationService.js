const Compatibility = require('../models/Compatibility');
const { Room } = require('../models/HostelRoom');
const Application = require('../models/Application');
const { Allocation, StaffLog } = require('../models/AllocationStaff');

class AllocationService {
    static async smartAllocate(appId, empId) {
        // Force valid numbers
        const applicationId = parseInt(appId);
        const employeeId = parseInt(empId);
        
        console.log(`Starting smart allocation for Application #${applicationId} by Employee #${employeeId}`);

        const allApps = await Application.getAllPending();
        const app = allApps.find(a => a.id == applicationId);
        if (!app) throw new Error(`Application #${applicationId} not found or already processed`);

        // 1. Get student's profile (Warning only if missing)
        const studentComp = await Compatibility.findByUserId(app.student_id);
        if (!studentComp) {
            console.warn(`${app.user_name || 'Student'} has not completed compatibility questionnaire. Proceeding with default matching.`);
        }

        // 2. Find available rooms in the hostel
        const rooms = await Room.findByAvailable(app.hostel_id);
        if (!rooms || rooms.length === 0) throw new Error(`No rooms available in Hostel #${app.hostel_id} (${app.hostel_name})`);

        let bestRoom = rooms[0];
        
        // 3. Simple matching logic (with Room Type Support!)
        let requestedSingle = app.room_type === 'Single';
        
        for (const room of rooms) {
            // Check if room has beds available
            if (room.occupied_count < room.capacity) {
                // If they want single, prioritize capacity = 1. Else prioritize capacity > 1.
                if (requestedSingle && room.capacity === 1) {
                    bestRoom = room;
                    break;
                } else if (!requestedSingle && room.capacity > 1) {
                    bestRoom = room;
                    break;
                }
            }
        }
        
        // Fallback if specific room type match not found
        if (!bestRoom || bestRoom.occupied_count >= bestRoom.capacity) {
             bestRoom = rooms.find(r => r.occupied_count < r.capacity);
        }

        if (!bestRoom || !bestRoom.id) {
            throw new Error(`Critical: Room data is corrupt for Hostel #${app.hostel_id}`);
        }

        console.log(`Allocating Room #${bestRoom.id} (${bestRoom.room_number}) to Student #${app.student_id}`);

        // 4. Perform the allocation
        await Allocation.create(applicationId, bestRoom.id);
        await Room.incrementOccupancy(bestRoom.id);
        await Application.updateStatus(applicationId, 'approved');
        
        // 5. Log the staff action (Silently, don't crash if log fails)
        try {
            await StaffLog.record(employeeId, 'allocated');
        } catch (logErr) {
            console.error('Logging failed, but allocation proceeded:', logErr.message);
        }

        return { 
            roomNumber: bestRoom.room_number, 
            hostel: app.hostel_name,
            studentName: app.user_name 
        };
    }
}

module.exports = AllocationService;
