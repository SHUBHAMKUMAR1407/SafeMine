# Safemine: "EMPOWERING SAFETY, ENSURING PRODUCTIVITY"

**Safemine** is a next-generation digital platform designed to modernize the coal mining industry by enhancing safety protocols, streamlining shift operations, and ensuring multilingual accessibility. Our platform offers a comprehensive solution for real-time logging, worker tracking, and risk management.

## 🚀 Key Features

- **Digital Shift Handover Logs**: Replaces manual logs with real-time, structured digital data.
- **DGMS-Aligned Safety Management**: Real-time safety protocol monitoring based on DGMS guidelines.
- **Worker Tracking Map**: Real-time visualization of worker locations and status on a dark-themed interactive map.
- **Knowledge Center**: A centralized repository with search functionality for safety guidelines, regulations, and research papers.
- **Risk Estimator**: A real-time tool to calculate risk based on safety data and shift logs.
- **Multilingual Support**: Available in English, Hindi, Tamil, Telugu, and Marathi.
- **Automated Reporting**: One-click PDF reports for fast, reliable shift summaries.
- **Secure Authentication**: Role-based access control with secure password management.

## 🛠️ Technology Stack

### Frontend (Ui)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Maps**: React Leaflet & Leaflet
- **Icons**: Lucide React & React Icons
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer (for avatar uploads etc.)
- **Security**: CORS, Cookie Parser

## 📂 Project Structure

```
SafeMine/
├── Ui/                 # Frontend React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components (Dashboard, WorkerMap, etc.)
│   │   ├── pages/      # Application pages (Home, Login, KnowledgeCenter, etc.)
│   │   └── ...
│   └── ...
│
└── backend/            # Backend Node.js Application
    ├── src/
    │   ├── controllers/# Request handlers
    │   ├── models/     # Database schemas
    │   ├── routes/     # API routes
    │   └── ...
    └── ...
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with your configuration (PORT, MONGODB_URI, etc.).
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the Ui directory and install dependencies:
```bash
cd Ui
npm install
```
Start the development server:
```bash
npm run dev
```

## 🤖 Chatbot
Safemine includes a **Multilingual Chatbot** that supports multiple Indic languages.
[Interact with Chatbot](https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=ffd18f8c-f185-4b9f-8725-ef21a13b158f)

## 🔮 Future Developments
- **IoT Integration**: Real-time sensor data for environmental monitoring.
- **Predictive Analytics**: AI-driven hazard prediction.
- **Voice-Based Interface**: Hands-free interaction for field workers.

---
*SafeMine - Digitizing Safety for a Secure Future.*
