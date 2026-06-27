# 🗳️ Bharathi Voting App - Full Stack Project

**Live API:** https://bharathi-api.onrender.com

## 📌 Project Overview
This is a major college project - A full-stack voting application where users can vote and view live results. Backend is deployed on cloud and connected to MongoDB Atlas.

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas 
- **Deployment:** Render.com
- **Security:** JWT, Environment Variables

## 🌐 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | API Health Check |
| GET | `/api/results` | Fetch all voting results |
| POST | `/api/vote` | Submit a new vote |

## ⚙️ Key Features Implemented
1. **Cloud Deployment:** Backend successfully deployed on Render instead of localhost
2. **Database:** Connected to MongoDB Atlas Cloud Database
3. **Environment Variables:** `PORT`, `MONGODB_URI`, `JWT_SECRET` handled securely
4. **CORS Enabled:** Ready for frontend integration

## 🔧 How to Run Locally
1. Clone: `git clone https://github.com/nadupurubharathi/my-fullstack-app.git`
2. Install: `npm install`
3. Add `.env` file with `MONGODB_URI` and `JWT_SECRET`
4. Run: `node backend.js`

## 🏆 Developer
**Nadupuru Bharathi**  
B.Tech CSE - [Mee College Name]
