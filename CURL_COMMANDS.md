# cURL Commands for NustFruta API

## 1. Login to Get Token

First, login to get your authentication token:

```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

**Copy the token from the response!**

---

## 2. Add Products with Images

Replace `YOUR_TOKEN_HERE` with the token you got from login.

### Add Apple
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Fresh Apples\",\"description\":\"Crisp and sweet, perfect for snacking\",\"price\":150,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":true}"
```

### Add Bananas
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Fresh Bananas\",\"description\":\"Energy-packed and delicious yellow bananas\",\"price\":120,\"unit\":\"dozen\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":true}"
```

### Add Oranges
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Fresh Oranges\",\"description\":\"Juicy and vitamin C rich citrus fruits\",\"price\":180,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":true}"
```

### Add Strawberries
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Fresh Strawberries\",\"description\":\"Sweet and juicy red berries\",\"price\":300,\"unit\":\"box\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":true}"
```

### Add Mangoes
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Pakistani Mangoes\",\"description\":\"Sweet and juicy Chaunsa mangoes from Pakistan\",\"price\":200,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

### Add Grapes
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Seedless Grapes\",\"description\":\"Fresh green seedless grapes\",\"price\":250,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1599819177626-b0ba80c58295?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

### Add Watermelon
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Watermelon\",\"description\":\"Fresh and juicy red watermelon\",\"price\":80,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1587049352846-4a222e784335?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

### Add Pineapple
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Fresh Pineapple\",\"description\":\"Sweet tropical pineapple\",\"price\":150,\"unit\":\"piece\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

### Add Pomegranate
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Pomegranate\",\"description\":\"Fresh red pomegranate with sweet seeds\",\"price\":220,\"unit\":\"kg\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

### Add Kiwi
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Kiwi Fruit\",\"description\":\"Fresh green kiwi, rich in nutrients\",\"price\":280,\"unit\":\"box\",\"category\":\"Fruits\",\"image\":\"https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=400&fit=crop\",\"inStock\":true,\"featured\":false}"
```

---

## 3. View All Products

```bash
curl http://localhost:5000/api/products
```

---

## 4. View Featured Products Only

```bash
curl "http://localhost:5000/api/products?featured=true"
```

---

## 5. Update Product Price

Replace `PRODUCT_ID` with actual product ID:

```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"price\":160}"
```

---

## 6. Mark Product Out of Stock

```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"inStock\":false}"
```

---

## 7. Create Test Order (No Auth Required)

```bash
curl -X POST http://localhost:5000/api/orders ^
  -H "Content-Type: application/json" ^
  -d "{\"customerName\":\"Ahmed Khan\",\"customerPhone\":\"03001234567\",\"hostelName\":\"H-10\",\"roomNumber\":\"205\",\"items\":[{\"product\":\"PRODUCT_ID_HERE\",\"quantity\":2}],\"paymentMethod\":\"cash_on_delivery\",\"notes\":\"Please deliver before 8 PM\"}"
```

---

## 8. View All Orders (Admin)

```bash
curl http://localhost:5000/api/orders ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 9. Update Order Status (Admin)

```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID/status ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"status\":\"confirmed\"}"
```

Valid statuses: `pending`, `confirmed`, `preparing`, `out_for_delivery`, `delivered`, `cancelled`

---

## 10. Get Order Statistics (Admin)

```bash
curl http://localhost:5000/api/orders/stats ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Notes:

- **Windows Users:** The `^` character is used for line continuation in Windows Command Prompt
- **Mac/Linux Users:** Replace `^` with `\` for line continuation
- **PowerShell Users:** Replace `^` with `` ` `` (backtick)
- Always replace `YOUR_TOKEN_HERE` with your actual JWT token
- Replace `PRODUCT_ID` and `ORDER_ID` with actual IDs from your database
