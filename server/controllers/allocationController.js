const { Allocation, StaffLog } = require('../models/AllocationStaff');
const AllocationService = require('../services/allocationService');

const allocate = async (req, res) => {
    try {
        const { applicationId, employeeId } = req.body;
        const result = await AllocationService.smartAllocate(applicationId, employeeId);
        res.json({ message: 'Room allocated successfully', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStaffPerformance = async (req, res) => {
    try {
        const performance = await StaffLog.getPerformance(req.params.id);
        res.json(performance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentAllocation = async (req, res) => {
    try {
        const result = await Allocation.getByStudent(req.params.studentId);
        if (!result) return res.status(404).json({ error: 'No allocation found for this student' });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { allocate, getStaffPerformance, getStudentAllocation };
