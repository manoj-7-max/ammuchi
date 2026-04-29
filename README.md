# AMUCHI ORGANIC E-commerce Platform

Modern full-stack e-commerce website for a traditional Tamil organic food brand selling health mixes, millets, traditional rice, and pulses.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Zustand, Framer Motion, Lucide icons
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT admin authentication with bcrypt password hashing

## Folder Structure

```text
ammuchi/
  frontend/
    src/components/        # Customer layout
    src/pages/             # Home, products, cart, checkout, contact, about
    src/pages/Admin/       # Login and admin dashboard
    src/data/products.js   # Frontend fallback product data
    src/lib/api.js         # API client with offline fallback
    src/store/cartStore.js # Persisted cart and wishlist
  backend/
    data/seedProducts.js   # MongoDB starter products
    middleware/auth.js     # JWT middleware
    models/                # Product, Order, User schemas
    routes/                # Auth, product, order, admin APIs
    server.js              # Express app and seed setup
```

## Features

- Home page with Tamil hero tagline: `அமுச்சி கருப்பு உளுந்து கஞ்சி மிக்ஸ்`
- Product listing with search, category filter, price filter, wishlist, and cart
- Product details gallery with Tamil and English descriptions, benefits, and ingredients
- Cart with quantity updates, total calculation, and WhatsApp order button
- Checkout form with COD and UPI options
- Contact page with phone numbers and FSSAI number
- About page focused on traditional food revival and homemade quality
- Admin login with JWT
- Admin dashboard analytics, product CRUD, order status updates, and customer list

## MongoDB Schemas

- `Product`: name, Tamil name, descriptions, price, weight, category, ingredients, benefits, images, stock, featured flag
- `Order`: customer name, phone, address, products, total amount, payment method, order status
- `User`: username, hashed password, admin flag

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/amuchi
JWT_SECRET=change_this_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

The backend auto-creates the default admin and starter products when MongoDB is connected.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Admin URL: `/admin`

Default login:

- Username: `admin`
- Password: `admin123`

## Deployment

### Backend on Render

1. Push this repository to GitHub.
2. Create a new Render Web Service from the repo.
3. Set root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.

### Frontend on Vercel

1. Import the repo in Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL` with your Render backend API URL, for example `https://your-api.onrender.com/api`.
