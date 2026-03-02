<h1 align="center">✨ Hotel Booking System Project FullStack✨</h1>

![Demo App](/frontend/public/adminDisplay.png)
![Demo App](/frontend/public/customerDisplay.png)


---

## 🌐 Demo

### 💻 Admin Panel (Web)
🔗 https://youtu.be/aMDqzay4nzA?si=OpjAQ7Bt90ee9_-i

### 📱 Customer App (Mobile)
🔗 https://youtu.be/RgYBNLScMOU?si=-P_N2ey7dQc_iCQv

---

## 📌 Overview

This project is a full-stack hotel booking platform designed to manage room listings, image uploads, and reservation workflows.

The system consists of:

- 📱 **Flutter Mobile Application (Customer Side)**
- 💻 **React Web Admin Panel**
- 🌐 **RESTful API Backend (Node.js + Express + Prisma)**
- 🗄 **PostgreSQL Relational Database**

This project demonstrates full-stack architecture design, relational database modeling, booking conflict validation logic, JWT authentication, and file upload handling.

---

---

## 🚀 Features

### 👤 Customer (Flutter Mobile App)

- Browse available rooms
- View room images
- Check room availability by date
- Make reservations
- Prevent overlapping booking conflicts

---

### 🛠 Admin (React Web Panel)

- JWT-based authentication
- Create / Update / Delete rooms
- Upload and manage room images
- View reservation records
- Monitor payment status
- Soft delete rooms (status-based)

---

---

## 🗄 Database Design

Main Entities:

- User
- Room
- RoomImage
- RoomRent
- RoomRentDetail

Database managed using Prisma ORM with PostgreSQL.

---

## 🛠 Tech Stack

### 💻 Web Admin
- React (Vite)
- Tailwind CSS
- Axios
- SweetAlert2

### 📱 Mobile
- Flutter
- HTTP
- GetX

### 🌐 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Express File Upload

---

## 🧑‍💻 How to Run Web Admin

1. Clone this repository  
   ```bash
    git clone https://github.com/Phsithzz/HotelBooking-App.git
    cd HotelBooking-App

2. Frontend Setup
    ```bash
    cd frontend
    npm install
    npm run dev

3. Backend Setup
    ```bash
    cd backend
    node --watch server.js

## 🧑‍💻 How to Run Mobile Flutter

   ```bash
    cd my_hotel_room_app
    flutter pub get
    flutter run


   
