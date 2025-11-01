# NustFruta API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

---

## Auth Endpoints

### 1. Register Admin
**POST** `/auth/register`

Create a new admin account.

**Request Body:**
```json
{
  "username": "admin",
  "email": "admin@nustfruta.com",
  "password": "admin123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "6547a1b2c3d4e5f6a7b8c9d0",
    "username": "admin",
    "email": "admin@nustfruta.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login
**POST** `/auth/login`

Login with admin credentials.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "6547a1b2c3d4e5f6a7b8c9d0",
    "username": "admin",
    "email": "admin@nustfruta.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Current Admin
**GET** `/auth/me` 🔒

Get currently logged in admin details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "6547a1b2c3d4e5f6a7b8c9d0",
    "username": "admin",
    "email": "admin@nustfruta.com",
    "role": "admin"
  }
}
```

---

## Product Endpoints

### 1. Get All Products
**GET** `/products`

Get all products with optional filters.

**Query Parameters:**
- `featured` - Filter by featured status (true/false)
- `category` - Filter by category
- `inStock` - Filter by stock status (true/false)

**Example:** `/products?featured=true&inStock=true`

**Response (200):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "6547a1b2c3d4e5f6a7b8c9d0",
      "name": "Fresh Apples",
      "description": "Crisp and sweet, perfect for snacking",
      "price": 150,
      "unit": "kg",
      "category": "Fruits",
      "image": "https://...",
      "inStock": true,
      "featured": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Product
**GET** `/products/:id`

Get a single product by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d0",
    "name": "Fresh Apples",
    "description": "Crisp and sweet, perfect for snacking",
    "price": 150,
    "unit": "kg",
    "category": "Fruits",
    "image": "https://...",
    "inStock": true,
    "featured": true
  }
}
```

---

### 3. Create Product
**POST** `/products` 🔒

Create a new product (Admin only).

**Request Body:**
```json
{
  "name": "Fresh Apples",
  "description": "Crisp and sweet, perfect for snacking",
  "price": 150,
  "unit": "kg",
  "category": "Fruits",
  "image": "https://...",
  "inStock": true,
  "featured": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d0",
    "name": "Fresh Apples",
    ...
  }
}
```

---

### 4. Update Product
**PUT** `/products/:id` 🔒

Update a product (Admin only).

**Request Body:**
```json
{
  "price": 160,
  "inStock": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d0",
    "name": "Fresh Apples",
    "price": 160,
    "inStock": false,
    ...
  }
}
```

---

### 5. Delete Product
**DELETE** `/products/:id` 🔒

Delete a product (Admin only).

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Order Endpoints

### 1. Create Order
**POST** `/orders`

Create a new order (Public).

**Request Body:**
```json
{
  "customerName": "Ahmed Khan",
  "customerPhone": "03001234567",
  "customerEmail": "ahmed@example.com",
  "hostelName": "H-10",
  "roomNumber": "205",
  "items": [
    {
      "product": "6547a1b2c3d4e5f6a7b8c9d0",
      "quantity": 2
    },
    {
      "product": "6547a1b2c3d4e5f6a7b8c9d1",
      "quantity": 1
    }
  ],
  "paymentMethod": "cash_on_delivery",
  "notes": "Please deliver before 8 PM"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d5",
    "orderNumber": "NF1705315800000123",
    "customerName": "Ahmed Khan",
    "customerPhone": "03001234567",
    "hostelName": "H-10",
    "roomNumber": "205",
    "items": [...],
    "totalAmount": 420,
    "status": "pending",
    "paymentMethod": "cash_on_delivery",
    "notes": "Please deliver before 8 PM",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get All Orders
**GET** `/orders` 🔒

Get all orders (Admin only).

**Query Parameters:**
- `status` - Filter by order status

**Example:** `/orders?status=pending`

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "6547a1b2c3d4e5f6a7b8c9d5",
      "orderNumber": "NF1705315800000123",
      "customerName": "Ahmed Khan",
      "status": "pending",
      "totalAmount": 420,
      "items": [
        {
          "product": {
            "_id": "6547a1b2c3d4e5f6a7b8c9d0",
            "name": "Fresh Apples",
            "image": "https://..."
          },
          "name": "Fresh Apples",
          "price": 150,
          "quantity": 2
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Single Order
**GET** `/orders/:id` 🔒

Get a single order by ID (Admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d5",
    "orderNumber": "NF1705315800000123",
    "customerName": "Ahmed Khan",
    "customerPhone": "03001234567",
    "hostelName": "H-10",
    "roomNumber": "205",
    "items": [...],
    "totalAmount": 420,
    "status": "pending",
    ...
  }
}
```

---

### 4. Update Order Status
**PUT** `/orders/:id/status` 🔒

Update order status (Admin only).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Statuses:**
- `pending`
- `confirmed`
- `preparing`
- `out_for_delivery`
- `delivered`
- `cancelled`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d5",
    "status": "confirmed",
    ...
  }
}
```

---

### 5. Update Order
**PUT** `/orders/:id` 🔒

Update order details (Admin only).

**Request Body:**
```json
{
  "roomNumber": "210",
  "notes": "Updated delivery instructions"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "6547a1b2c3d4e5f6a7b8c9d5",
    "roomNumber": "210",
    "notes": "Updated delivery instructions",
    ...
  }
}
```

---

### 6. Delete Order
**DELETE** `/orders/:id` 🔒

Delete an order (Admin only).

**Response (200):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

### 7. Get Order Statistics
**GET** `/orders/stats` 🔒

Get order statistics (Admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "pendingOrders": 12,
    "confirmedOrders": 8,
    "deliveredOrders": 125,
    "totalRevenue": 52500
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No authentication token, access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details (in development mode)"
}
```

---

## Notes

- 🔒 indicates protected routes that require authentication
- All timestamps are in ISO 8601 format
- All prices are in PKR (Pakistani Rupees)
- Order numbers are automatically generated
- Product units: kg, dozen, box, piece
