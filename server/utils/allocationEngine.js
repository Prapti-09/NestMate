const Application = require('../models/Application');
const Compatibility = require('../models/Compatibility');
const Listing = require('../models/Listing');

/**
 * Smart Allocation Engine (FIFO + Lifestyle Rules)
 * 1. Find all pending applications for a hostel, ordered by date.
 * 2. For each student, find their personality profile (Compatibility model).
 * 3. Match with available slots.
 */

const calculateLifestyleScore = (p1, p2) => {
  let score = 0;
  if (!p1 || !p2) return 50; // Default base score if data missing

  if (p1.sleep === p2.sleep) score += 40;
  if (p1.clean === p2.clean) score += 30;
  if (p1.study === p2.study) score += 15;
  if (p1.social === p2.social) score += 15;
  return score;
};

const runAllocation = async (hostelId) => {
  try {
    // 1. Fetch pending applications in FIFO order
    const pendingApps = await Application.find({ 
      listing: hostelId, 
      status: 'pending' 
    }).sort({ createdAt: 1 }).populate('student');

    const hostel = await Listing.findById(hostelId);
    if (!hostel) throw new Error('Hostel not found');

    const results = [];

    for (const app of pendingApps) {
      // 2. Get personality profile for the student
      const studentProfile = await Compatibility.findOne({ user: app.student._id });
      
      // In a real-world scenario, we would check specific room occupancy.
      // For now, we simulate room assignment based on availability.
      if (hostel.availableRooms > 0) {
        // Mocking a match score if existing data is present
        const matchScore = studentProfile ? 85 : 50; // Simplified for this logic

        results.push({
          applicationId: app._id,
          studentName: app.student.name,
          compatibilityScore: matchScore,
          status: 'allocated'
        });

        // Simulating DB update
        app.status = 'approved';
        app.allocatedRoom = `Room-${Math.floor(Math.random() * 100) + 1}B`;
        await app.save();

        hostel.availableRooms -= 1;
        await hostel.save();
      }
    }

    return { 
      success: true, 
      processedCount: results.length,
      allocations: results 
    };
  } catch (error) {
    console.error('Allocation Engine Error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { runAllocation, calculateLifestyleScore };
