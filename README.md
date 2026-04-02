
# 🏨 Royal Place — Hotel Management Backend API

Welcome to the backend of **Royal Place**, a robust hotel management system built with **Express.js**, **TypeScript**, and **MongoDB**.
This API powers essential features such as room booking, user management, payments, and more — now enhanced with **Redis caching and session management** via Docker Compose.

---

## 🧩 Tech Stack

| Layer                     | Technology                                       |
| :------------------------ | :----------------------------------------------- |
| **Backend Framework**     | Express.js + TypeScript                          |
| **Database**              | MongoDB (Mongoose ORM)                           |
| **Cache / Session Store** | Redis                                            |
| **Authentication**        | JWT (Access & Refresh Tokens)                    |
| **Payment Gateway**       | SSLCOMMERZ                                       |
| **File Storage**          | Cloudinary                                       |
| **Validation**            | Zod                                              |
| **Logging**               | Winston + Morgan                                 |
| **Security**              | Helmet, CORS, Mongo Sanitize, Express Rate Limit |
| **Rate Limiting**         | express-rate-limit                               |
| **Date Utilities**        | Day.js & Date-fns                                |
| **Dev Tools**             | ts-node-dev, npm , Docker Compose                |

---

## 🚀 Features

* 🔐 **User Authentication & Role Management**
* 🏠 **Room Booking System**
* 💳 **SSLCOMMERZ Payment Integration**
* 🏖 **Hotel Amenities & Services**
* 💬 **Customer Testimonials**
* ⚡ **Redis Caching & Session Management** (New)
* 🧱 **Zod Validation for Strong Input Schema**
* 🔒 **Rate Limiting to Prevent Brute Force Attacks**
* ☁️ **Cloudinary Integration for Image Uploads**
* 🧩 **Docker-Ready Environment for Local & Production**
* 📊 **Optimized Logging with Winston & Morgan**

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Alauddin-24434/royal-place-backend.git
cd royal-place-backend
```

### 2️⃣ Install Dependencies

This project **exclusively uses npm** (recommended for speed and workspace efficiency):

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and configure it with the following variables.
Make sure to replace placeholders with your actual credentials.

```env
# ----------------------
# App / Server Settings
# ----------------------
NODE_ENV=development
PORT=5000
# Run mode (true => Docker container, false => Local development)
DOCKER_CONTAINER=false

# ----------------------
# MongoDB
# ----------------------
MONGO_URI=

# ----------------------
# Redis
# ----------------------
REDIS_URI=
# ---------------------
# Session Secret
# ---------------------

SESSION_SECRET=ebeae1d1e0fdda4d98a02afb45ae50dc216c721c9bd97a48c50a5092747fb265eba6e80a26fa1a7cac563dbb4b6e17c8a6f997efbb58c0a6871805503286f95c


# ----------------------
# JWT / Authentication
# ----------------------
JWT_ACCESS_TOKEN_SECRET=8c26f00f08699f7c5c1b007946d55106e7176efc8e6b3b9f950f9b26fb3672a6
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_SECRET=efee9e64e21450ebfa5a97d0e767ebe2ed8b4e85027ba8d
JWT_REFRESH_TOKEN_EXPIRES_IN=7d

# ----------------------
# Payment SSLCOMMERZ
# ----------------------
SSL_STORE_ID=
SSL_STORE_PASS=
SSL_IS_LIVE=true
BASE_URL=http://localhost:5000

# ----------------------
# ML / External APIs
# ----------------------

# ----------------------
# Cloudinary Storage
# ----------------------
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## ⚙️ Running the Project

### 🧑‍💻 Local Development

Ensure **MongoDB** and **Redis** are running locally before starting:

```bash
pnpm run dev
```

### 🏗️ Production Build

```bash
pnpm run build && pnpm start
```

---

## 🐳 Dockerization (Recommended)

This project supports **Docker Compose** for seamless setup and deployment — automatically managing the following services:

* `app` → Your Express + TypeScript API
* `mongo` → MongoDB database
* `redis` → Redis cache & session store

### ▶️ Start All Services

```bash
docker compose up -d
```

### 📜 View Logs

```bash
docker compose logs -f app
```

---

### 🔄 Managing Redis

| Action            | Command                        |
| :---------------- | :----------------------------- |
| **Stop Redis**    | `docker compose stop redis`    |
| **Restart Redis** | `docker compose restart redis` |

---

### 🧹 Stop and Remove All Services

```bash
docker compose down
```

---

## 🤝 Contributing

Contributions are always welcome! 🎉
Please **open an issue** or **submit a pull request** with clear details on your improvements or bug fixes.

---

## 📫 Contact

For questions, suggestions, or collaboration:
📧 **Email:** [alauddin150900@gmail.com](mailto:alauddin150900@gmail.com)


