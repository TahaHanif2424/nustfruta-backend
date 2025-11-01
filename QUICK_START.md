# Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system.

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
Update the `MONGODB_URI` in `.env` file with your Atlas connection string.

### 3. Seed the Database

**Create Admin User:**
```bash
npm run seed:admin
```

This will create:
- Username: `admin`
- Password: `admin123`
- Email: `admin@nustfruta.com`

**Add Sample Products:**
```bash
npm run seed:products
```

This adds 6 sample products to the database.

### 4. Start the Server
```bash
npm run dev
```

Server will start on: `http://localhost:5000`

## Testing the API

### 1. Login as Admin

**Request:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
You'll get a JWT token. Copy this token for authenticated requests.

### 2. Get All Products

**Request:**
```bash
GET http://localhost:5000/api/products
```

### 3. Create a Product (Authenticated)

**Request:**
```bash
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Watermelon",
  "description": "Fresh and juicy watermelon",
  "price": 80,
  "unit": "kg",
  "category": "Fruits",
  "inStock": true,
  "featured": false
}
```

### 4. Create an Order (Public)

**Request:**
```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "customerName": "Ahmed Khan",
  "customerPhone": "03001234567",
  "hostelName": "H-10",
  "roomNumber": "205",
  "items": [
    {
      "product": "PRODUCT_ID_HERE",
      "quantity": 2
    }
  ],
  "paymentMethod": "cash_on_delivery"
}
```

### 5. Get All Orders (Authenticated)

**Request:**
```bash
GET http://localhost:5000/api/orders
Authorization: Bearer YOUR_TOKEN_HERE
```

### 6. Update Order Status (Authenticated)

**Request:**
```bash
PUT http://localhost:5000/api/orders/ORDER_ID/status
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "status": "confirmed"
}
```

## Available Order Statuses

1. `pending` - Order just placed
2. `confirmed` - Order confirmed by admin
3. `preparing` - Order is being prepared
4. `out_for_delivery` - Order out for delivery
5. `delivered` - Order delivered successfully
6. `cancelled` - Order cancelled

## Useful Endpoints

- Health Check: `GET http://localhost:5000/api/health`
- Order Stats: `GET http://localhost:5000/api/orders/stats` (Authenticated)
- Filter Products: `GET http://localhost:5000/api/products?featured=true&inStock=true`
- Filter Orders: `GET http://localhost:5000/api/orders?status=pending`

## Testing with Postman/Thunder Client

1. Import the API endpoints from `API_DOCUMENTATION.md`
2. Create an environment variable for the token
3. Set the base URL to `http://localhost:5000/api`

## Common Issues

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check the connection string in `.env`

**Authentication Error:**
- Make sure you're including the token in Authorization header
- Token format: `Bearer YOUR_TOKEN_HERE`

**Port Already in Use:**
- Change the PORT in `.env` file
- Or stop the process using port 5000

## Next Steps

1. Connect the frontend to these APIs
2. Test all endpoints thoroughly
3. Customize the models as per your needs
4. Add more features like image upload, notifications, etc.

For detailed API documentation, see `API_DOCUMENTATION.md`
