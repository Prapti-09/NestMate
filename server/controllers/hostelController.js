const { Hostel, Room } = require('../models/HostelRoom');

const createHostel = async (req, res) => {
    try {
        const { name, type, total_rooms, total_capacity } = req.body;
        const id = await Hostel.create(name, type, total_rooms, total_capacity);
        res.status(201).json({ id, name, type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.getAll();
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.findByHostel(req.params.hostelId);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createHostel, getHostels, getRooms };
