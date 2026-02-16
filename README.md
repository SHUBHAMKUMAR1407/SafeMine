# ⛏️ SafeMine: Empowering Safety, Ensuring Productivity

![SafeMine Banner](Ui/src/assets/Web_Logo.png)

> **Digitizing the Coal Mining Industry for a Safer Tomorrow.**

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**SafeMine** is a next-generation digital platform designed to modernize coal mining operations. By replacing manual logs with real-time digital solutions, we enhance safety protocols, streamline shift operations, and ensure multilingual accessibility for every worker.

---

## 🚀 Key Features

### 🛡️ Safety & Compliance
- **Digital Shift Handover Logs**: Replaces error-prone manual logs with real-time, structured digital data.
- **DGMS-Aligned Safety Management**: Real-time safety protocol monitoring based on DGMS guidelines.
- **Risk Estimator**: A proactive tool that calculates risk levels based on live safety data and shift logs.

### 📍 Real-Time Monitoring
- **Worker Tracking Map**: Interactive dark-themed map visualizing real-time worker locations and status (Active/Idle).
- **Incident Tracking**: Instant reporting and monitoring of safety incidents to minimize response time.

### 📚 Knowledge & Training
- **Knowledge Center**: A centralized, searchable repository for safety guidelines, regulatory documents (Mines Act, 1952), and training videos.
- **Multilingual Chatbot**: An AI assistant supporting English, Hindi, Tamil, Telugu, and Marathi to guide workers on safety protocols.

### ⚙️ Operational Efficiency
- **Automated Reporting**: Generate comprehensive one-click PDF reports for shift summaries.
- **Multilingual Support**: Breaks language barriers with full UI translation in 5+ Indian languages.
- **Secure Authentication**: Role-based access control ensuring data integrity and security.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | Built with React.js using Vite for speed, styled with Tailwind CSS for a modern, responsive UI. |
| **Backend** | ![Node](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | RESTful API powered by Node.js and Express.js, handling secure authentication and data processing. |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | Scalable NoSQL database using Mongoose for schema modeling. |
| **Tools** | ![Leaflet](https://img.shields.io/badge/-Leaflet-199900?logo=leaflet&logoColor=white) ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) | React Leaflet for mapping and Cloudinary for optimized media storage. |

---

## 📂 Project Structure

A detailed overview of the project's architecture:

```
SafeMine/
│
├── Ui/                             # 🖥️ Frontend React Application
│   ├── public/                     # Static assets (Favicons, manifest, etc.)
│   ├── src/
│   │   ├── assets/                 # Images, logos, and global styles
│   │   ├── components/             # Reusable UI Components
│   │   │   ├── Dashboard.jsx       # Main Dashboard wrapper with Sidebar
│   │   │   ├── WorkerMap.jsx       # Real-time worker tracking map (Leaflet)
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   └── ...
│   │   ├── pages/                  # Application Routes/Pages
│   │   │   ├── Home.jsx            # Landing Page
│   │   │   ├── Login.jsx           # User Authentication
│   │   │   ├── Attendance.jsx      # Daily Attendance Dashboard
│   │   │   ├── History.jsx         # Safety Report Logs
│   │   │   ├── KnowledgeCenter.jsx # Resource Library with Search
│   │   │   ├── Settings.jsx        # User Profile & Security Settings
│   │   │   └── ...
│   │   ├── context/                # Global State (Auth, Theme, etc.)
│   │   ├── App.jsx                 # Root Component with Routes
│   │   └── main.jsx                # Entry Point
│   ├── .env                        # Frontend Environment Variables (API URL)
│   └── vite.config.js              # Vite Configuration
│
└── backend/                        # ⚙️ Backend Node.js API
    ├── src/
    │   ├── controllers/            # Business Logic & Request Handlers
    │   │   ├── user.controller.js  # Auth & User Management
    │   │   └── ...
    │   ├── models/                 # Mongoose Database Schemas
    │   │   ├── user.model.js       # User Schema
    │   │   └── ...
    │   ├── routes/                 # API Endpoint Definitions
    │   │   ├── user.routes.js      # User Routes
    │   │   └── ...
    │   ├── middlewares/            # Auth, Error Handling, & File Uploads
    │   ├── db/                     # Database Connection Logic
    │   ├── utils/                  # Helper Functions (Cloudinary, ApiError)
    │   └── index.js                # Server Entry Point
    ├── .env                        # Backend Environment Variables (Secrets, DB URI)
    └── package.json                # Backend Dependencies & Scripts
```

---

## ⚙️ Setup & Installation

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local instance or Atlas URI)

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and add your configuration:
    ```env
    PORT=8002
    MONGODB_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_secure_random_string
    REFRESH_TOKEN_SECRET=your_secure_random_string
    CLOUDINARY_CLOUD_NAME=...
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup
1.  Navigate to the Ui directory:
    ```bash
    cd Ui
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Ui` folder:
    ```env
    VITE_API_BASE_URL=http://localhost:8002
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

---

## 🤖 Try the Chatbot
Need help with safety regulations? **SafeMine's AI Assistant** is here to help!
[Launch Chatbot](https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=ffd18f8c-f185-4b9f-8725-ef21a13b158f)

---

## 🔮 Future Roadmap
- [ ] **IoT Sensor Integration**: Live environmental data feed.
- [ ] **Predictive Analytics**: AI-driven accident prevention models.
- [ ] **Voice Commands**: Hands-free operation for field workers.

---
*Created with ❤️ for the Safety of Every Miner.*
