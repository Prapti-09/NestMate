# NestMate - Student Accommodation & Lifestyle Platform

NestMate is a modern, scalable full-stack web application designed to simplify student living. It features a dual UI system: a professional, minimal interface for institute admins and a vibrant, Airbnb-inspired experience for students searching for PGs, hostels, and rooms.

## Key Features

- **Dual UI System**:
  - **Institute Section**: Formal design (Navy/Grey) for hostel management, roommate allocation, and application tracking.
  - **Student Section**: Vibrant design with gradients for finding and booking stays near college.
- **Privacy-First Compatibility**: A lifestyle questionnaire helps matching roommates without sharing personal data publicly.
- **Travel Proximity**: Integrated travel time analysis (Walk, Bike, Bus, Car) to college for every listing.
- **Smart Filters**: Budget-based search, split-cost calculator, and amenity filtering.
- **Service Ecosystem**: Integration with local tiffin and cleaning providers.

## Tech Stack

- **Frontend**: React (Vite), Framer Motion, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT-based login (Planned)

## Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally or a remote MongoDB Atlas URI

### 2. Installation

1. **Clone the repository** (if applicable) or enter the project directory.

2. **Setup Backend**:
   ```bash
   cd server
   npm install
   # Configure .env with your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### 3. Usage
- Open `http://localhost:5173` for the Student Portal.
- Navigate to `/institute` on the same URL for the Institute Admin Dashboard.
- Complete the lifestyle questionnaire via the "Compatibility Profile" in the dashboard.

---
Built with ❤️ for students..
