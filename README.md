# Local Guide Platform (Deep Discover Server)

## 🚀 Overview

**Local Guide Platform** connects travelers with passionate local experts who can offer authentic, personalized experiences. Unlike generic tour agencies, this platform empowers individuals to share their city’s hidden gems, culture, and stories. Travelers can find guides who match their interests—whether for a food crawl, a photography walk, or a historical tour—and explore a destination like a local.

This repository contains the **backend server** for the Deep Discover application, built with the MERN stack (MongoDB, Express, React, Node.js). It handles secure authentication, user role management (Tourist vs. Guide), tour listings, booking workflows, and payment processing.

## ✨ Key Features

- **User Authentication**: Secure registration and login for Tourists and Guides using JWT and Bcrypt.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Tourists, Guides, and Admins.
- **Profile Management**: Guides can showcase their expertise and rates; Tourists can manage preferences.
- **Tour Listings**: Guides can create, update, and manage tour listings with image uploads (Cloudinary).
- **Booking System**: Complete workflow for requesting, accepting/rejecting, and completing tour bookings.
- **Secure Payments**: Integration with Stripe for secure transaction processing.
- **Reviews & Ratings**: System for tourists to review guides after tours.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Authentication**: JSON Web Token (JWT)
- **File Storage**: Cloudinary (with Multer)
- **Payments**: Stripe
- **Language**: TypeScript

## ⚙️ Installation & Run Locally

Follow these steps to set up the server locally.

### 1. Clone the Repository

```bash
git clone https://github.com/md-suhag/deep-discover-server.git
cd deep-discover-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
FRONTEND_URL=http://localhost:3000
PORT=5000
DB_URL=your_mongodb_connection_string
NODE_ENV=development

BCRYPT_SALT_ROUND=10

JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES=5d
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES=30d

SUPER_ADMIN_EMAIL=your_email@example.com
SUPER_ADMIN_PASSWORD=your_secure_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_API_SECRET=your_stripe_secret_key
CONNECT_WEBHOOK_SECRET=your_connect_webhook_secret
WEBHOOK_SECRET=your_webhook_secret

APPLICATION_FEE_PERCENT=5
```

### 4. Run the Server

**Development Mode (with live reload):**

```bash
npm run dev
```

**Production Build:**

```bash
npm run build
npm start
```

## 🔌 API Endpoints

The base prefix for all API endpoints is `/api/v1`.

### 🔐 Auth

| Method | Endpoint      | Access | Description         |
| :----- | :------------ | :----- | :------------------ |
| POST   | `/auth/login` | Public | Login for all users |

### 👤 Users

| Method | Endpoint                   | Access | Description                     |
| :----- | :------------------------- | :----- | :------------------------------ |
| POST   | `/users/tourist`           | Public | Register as a Tourist           |
| POST   | `/users/guide`             | Public | Register as a Guide             |
| POST   | `/users/connected-account` | Guide  | Create Stripe connected account |

### 🗺 Listings

| Method | Endpoint        | Access | Description                     |
| :----- | :-------------- | :----- | :------------------------------ |
| GET    | `/listings`     | Public | Get all tour listings           |
| GET    | `/listings/:id` | Public | Get details of a single listing |
| POST   | `/listings`     | Guide  | Create a new tour listing       |
| PATCH  | `/listings/:id` | Guide  | Update an existing listing      |
| DELETE | `/listings/:id` | Guide  | Delete a listing                |

### 📅 Bookings

| Method | Endpoint            | Access  | Description                            |
| :----- | :------------------ | :------ | :------------------------------------- |
| POST   | `/bookings`         | Tourist | Request a new booking                  |
| PATCH  | `/bookings/:id`     | Guide   | Update booking status (confirm/reject) |
| PATCH  | `/bookings/:id/pay` | Tourist | Pay for a confirmed booking            |

### ⭐ Reviews

_(Note: Review routes are prepared but may not be fully mounted in the current version)_
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/reviews` | Tourist | Submit a review |
| GET | `/reviews/:guideId` | Public | Get reviews for a specific guide |

### 💳 Webhooks

| Method | Endpoint          | Description                             |
| :----- | :---------------- | :-------------------------------------- |
| POST   | `/stripe/webhook` | Handle Stripe webhooks (e.g., payments) |

---

**Author**: md-suhag
