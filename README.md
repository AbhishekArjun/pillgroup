# Sponsorship Web Application

A full-stack web application designed for a non-governmental organization (NGO) to manage and display children needing sponsorship. This platform connects individual givers with children in need, facilitating donations for their education and daily needs.

## Features

- **Frontend (React + Vite)**
  - Dynamic landing page with engaging UI/UX.
  - Interactive "Individual Givers" page showcasing children profiles.
  - Dedicated Admin Dashboard to manage sponsorships.
  - **Firebase Integration:** Authentication (Login/Signup) and prepared Firestore/Hosting configuration.
- **Backend (Node.js + Express + SQLite)**
  - RESTful API with structured MVC architecture (Models, Views, Controllers).
  - Secure Admin Authentication using JWT (JSON Web Tokens) and bcrypt.
  - Image file uploads using Multer.
  - Persistent storage using an embedded SQLite database.

## Technology Stack

- **Frontend:** React, Vite, React Router, Vanilla CSS, Firebase (Auth, Firestore, Hosting)
- **Backend:** Node.js, Express.js
- **Database:** SQLite & Firebase Firestore
- **Security & Uploads:** jsonwebtoken, bcrypt, multer, Firebase Auth

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhishekArjun/pillgroup.git
   cd webapp
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

### Running the Application Locally

You will need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1: Start the Backend Server**
```bash
cd backend
npm run dev
```
*(The backend runs on http://localhost:3000)*

**Terminal 2: Start the Frontend Application**
```bash
# In the root webapp directory
npm run dev
```
*(The frontend runs on http://localhost:5173 and automatically proxies API requests to the backend)*

## Default Admin Credentials

Upon the first run, the SQLite database is automatically seeded with default data and an admin account.

- **Email:** `admin@pillgroup.com`
- **Password:** `password123`

You can use these credentials to log into the Admin Dashboard (`/admin`) to add, edit, or delete child profiles and upload profile images.

## Project Structure

```
webapp/
├── src/                # React Frontend code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page layouts (Landing, Admin, Givers)
│   ├── utils/          # API utilities and token management
│   └── index.css       # Global styles
├── backend/            # Express Backend code
│   ├── config/         # Database configuration
│   ├── controllers/    # API endpoint logic
│   ├── middleware/     # JWT verification and Multer upload logic
│   ├── routes/         # Express routers
│   └── uploads/        # Locally stored profile images
└── vite.config.js      # Vite configuration and backend proxy setup
```
