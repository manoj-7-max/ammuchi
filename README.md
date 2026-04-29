# 🌿 AMUCHI ORGANIC - Traditional E-commerce Platform

A modern, premium e-commerce platform for selling traditional Tamil healthy mixes and organic products.

## 🚀 Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Zustand, Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT
- **Design**: Premium D2C aesthetic, village-inspired colors (Green, Brown, Beige)

## 📁 Folder Structure
- `/frontend`: React application (Vite)
- `/backend`: Node.js API server

## 🛠️ Features
- **Customer Facing**: Home, Products, Product Details, Cart, Checkout, About, Contact
- **Admin Panel**: Dashboard, Analytics, Product Management, Order Management
- **Security**: JWT Auth for Admin, Password hashing

## ⚙️ Setup Instructions

### Backend
1. Go to `backend` directory.
2. Run `npm install`.
3. Create a `.env` file (already provided) with your `MONGO_URI`.
4. Run `npm run dev` or `node server.js`.

### Frontend
1. Go to `frontend` directory.
2. Run `npm install`.
3. Run `npm run dev`.

## 🚢 Deployment Steps

### Backend (Render / Heroku)
1. Push the `backend` folder to a GitHub repo.
2. Connect the repo to Render.com.
3. Add Environment Variables from `.env`.
4. Set Build Command: `npm install`.
5. Set Start Command: `node server.js`.

### Frontend (Vercel)
1. Push the `frontend` folder to GitHub.
2. Connect to Vercel.
3. Add `VITE_API_URL` environment variable pointing to your backend.
4. Vercel will auto-detect Vite and deploy.

## 📊 Admin Login
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`
