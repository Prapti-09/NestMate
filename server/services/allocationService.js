const Compatibility = require('../models/Compatibility');
const { Room } = require('../models/HostelRoom');
const Application = require('../models/Application');
const { Allocation, StaffLog } = require('../models/AllocationStaff');

class AllocationService {
    static async smartAllocate(applicationId, employeeId) {
        // Logic for ONE specific application
        const allApps = await Application.getAllPending();
        const app = allApps.find(a => a.id == applicationId);
        if (!app) throw new Error('Application not found or already processed');

        // 1. Get student's profile
        const studentComp = await Compatibility.findByUserId(app.student_id);
        if (!studentComp) throw new Error('Student has not completed compatibility questionnaire');

        // 2. Find available rooms in the hostel
        const rooms = await Room.findByAvailable(app.hostel_id);
        if (rooms.length === 0) throw new Error('No rooms available in this hostel');

        let bestRoom = rooms[0]; // Default to first available
        let maxScore = -1;

        // 3. For each available room, if occupied, check compatibility with roommates
        // For simplicity, we compare with one roommate if already occupied
        // Note: Real-world logic would check ALL occupants
        for (const room of rooms) {
            if (room.occupied_count > 0) {
                // Mock logic: Fetch current occupants (would need a link table)
                // Let's assume for this starter logic we just match the first room with capacity
                bestRoom = room;
                break;
            }
        }

        // 4. Perform the allocation
        await Allocation.create(applicationId, bestRoom.id);
        await Room.incrementOccupancy(bestRoom.id);
        await Application.updateStatus(applicationId, 'approved');
        
        // 5. Log the staff action
        await StaffLog.record(employeeId, 'allocated');

        return { roomNumber: bestRoom.room_number, hostel: app.hostel_name };
    }
}

module.exports = AllocationService;
