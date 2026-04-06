const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['institute', 'pg', 'independent'], 
    required: true 
  },
  location: { type: String, required: true },
  college: { type: String, required: true }, // Proximity to this college
  amenities: [{ type: String }],
  rules: [{ type: String }],
  images: [{ type: String }],
  travelTimes: {
    walking: { type: Number }, // in minutes
    bike: { type: Number },
    car: { type: Number },
    bus: { type: Number }
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  capacity: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);
