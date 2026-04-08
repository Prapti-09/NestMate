const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const { updateCompatibility, getCompatibility } = require('../controllers/compatibilityController');
const { createHostel, getHostels, getRooms } = require('../controllers/hostelController');
const { apply, getStudentApplications, getAllPending, deleteApplication } = require('../controllers/applicationController');
const { allocate, getStaffPerformance, getStudentAllocation, getAllAllocations } = require('../controllers/allocationController');
const { getAdminDashboard, getAdminHostels, getAdminStaff, updateStaffVerification } = require('../controllers/adminController');

// 1. User System
router.post('/register', register);
router.post('/login', login);

// 2. Compatibility System
router.put('/compatibility/update', updateCompatibility);
router.get('/compatibility/:userId', getCompatibility);

// 3. Hostel & Room System
router.post('/hostels', createHostel);
router.get('/hostels', getHostels);
router.get('/rooms/:hostelId', getRooms);

// 4. Application System
router.post('/apply', apply);
router.get('/applications/user/:id', getStudentApplications);
router.get('/applications/all', getAllPending);
router.delete('/applications/:id', deleteApplication);

// 5. Smart Allocation & Performance
router.post('/allocate', allocate);
router.get('/allocations/user/:userId', getStudentAllocation);
router.get('/allocations/history', getAllAllocations);
router.get('/staff/performance/:id', getStaffPerformance);

// 6. Admin Features
router.get('/admin/dashboard', getAdminDashboard);
router.get('/admin/hostels', getAdminHostels);
router.get('/admin/staff', getAdminStaff);
router.put('/admin/staff/:id/verify', updateStaffVerification);

module.exports = router;
