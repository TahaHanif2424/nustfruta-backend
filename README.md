# NustFruta Backend API

Backend API for NustFruta fresh delivery application built with Express.js and MongoDB.

## Features

- Authentication (Login/Register with JWT)
- Product Management (CRUD operations)
- Order Management (Create, View, Update, Delete)
- Order Status Tracking (pending → delivered)
- Order Statistics Dashboard
- CORS enabled for frontend integration
- MongoDB integration with Mongoose

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Environment Setup:**
```bash
# The .env file is already created with default settings
# Update MongoDB URI if needed in .env file
```

3. **Start MongoDB:**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

4. **Seed Database (Optional):**
```bash
# Create admin user (username: admin, password: admin123)
npm run seed:admin

# Add sample products
npm run seed:products
```

5. **Start the server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current admin (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)

### Orders
- `POST /api/orders` - Create order (Public)
- `GET /api/orders` - Get all orders (Protected)
- `GET /api/orders/stats` - Get order statistics (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Protected)
- `PUT /api/orders/:id` - Update order (Protected)
- `DELETE /api/orders/:id` - Delete order (Protected)

## Order Statuses

- `pending` - Order placed
- `confirmed` - Order confirmed
- `preparing` - Order being prepared
- `out_for_delivery` - Order out for delivery
- `delivered` - Order delivered
- `cancelled` - Order cancelled

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Sample Admin Creation

Make a POST request to `/api/auth/register`:
```json
{
  "username": "admin",
  "email": "admin@nustfruta.com",
  "password": "admin123"
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `NODE_ENV` - Environment (development/production)
