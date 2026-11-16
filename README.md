# 🌍 Virtual Tourism Explorer

An interactive multimedia-based tourism website that allows users to explore destinations, view tour details, book trips, and experience destinations through audio, video, and animations.

## ✨ Features

- **User Authentication:** User registration and login.
- **Explore Tours:** Browse available travel destinations.
- **Search Tours:** Search destinations based on user requirements.
- **Tour Details:** View destination information, prices, distance, and group capacity.
- **Online Booking:** Book tours and check available seats.
- **Booking Capacity Management:** Prevent bookings when tour capacity is full.
- **Travel Reviews:** Users can submit reviews after completing their trips.
- **Multimedia Experience:** Destination-based audio and video.
- **Animations:** Interactive visual effects and transitions.
- **Category-Based Destinations:** Explore beach, mountain, island, and nature destinations.

## 🛠️ Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Multimedia
- Audio (MP3)
- Video (MP4)
- CSS Animations

## 📁 Project Structure

```text
Virtual-Tourism-Explorer/
│
├── backend/
│   ├── Controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── multimedia/
│   │       ├── audio/
│   │       └── videos/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── shared/
│   │   ├── hooks/
│   │   └── styles/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/KMSinchana28/Virtual-Tourism-Explorer.git
cd Virtual-Tourism-Explorer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

Start the backend:

```bash
npm run start-dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The application will run at:

`http://localhost:3000`

The backend runs at:

`http://localhost:8000`

## 🗄️ Database

MongoDB is used to store:
- User information
- Tour details
- Booking information
- Travel reviews

## 🎯 Project Objective

The main objective of Virtual Tourism Explorer is to enhance the traditional travel-planning experience by combining tourism information with multimedia elements. It provides users with an interactive platform to explore destinations before planning their trips.

