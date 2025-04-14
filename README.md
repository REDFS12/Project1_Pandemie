# Programming-Project-Pandemie

A responsive web-based application built to monitor and visualize pandemic statistics across different regions in a country. The project includes real-time data management using Firebase and is structured to accommodate both general users and medical personnel (doctor dashboard).

![Pandemic App Logo](./images/pandemie-logo-background.jpg)

---

## 📁 Project Structure

Database_firebase/ │ ├── css/ # All custom CSS files for styling different pages ├── html/ # HTML files for pages (dashboard, login, registration, etc.) ├── images/ # Contains the logo/background images ├── javascript/ # JavaScript logic for functionality and Firebase integration ├── .firebaserc # Firebase project configuration ├── package.json # Node dependencies └── README.md # Project documentation

---

## 💡 Features

- 🔐 Authentication System
  - Register, login, and password recovery with Firebase Auth.

- 📊 Dynamic Dashboard
  - View pandemic metrics such as total cases, recoveries, and deaths.

- 🌍 Real-time Data Sync
  - Firebase Realtime Database for live updates.

---

## 📄 Pages

| File | Description |
|------|-------------|
| `dashboard.html` | Main dashboard for monitoring data |
| `doctor_dashboard.html` | Special view for medical staff |
| `login.html` | Login form for users |
| `register.html` | New user registration |
| `forgot_password.html` | Reset password functionality |

---

## 🔧 Technologies Used

- Frontend: HTML5, CSS3, JavaScript  
- Backend/Database: [Firebase](https://firebase.google.com/)  
- Authentication: Firebase Auth  
- Hosting (optional): Firebase Hosting

---

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/your-username/pandemic-monitoring-app.git
cd Database_firebase

### 2. Setup Firebase
Create a Firebase project at console.firebase.google.com.
Replace Firebase config in javascript/firebaseConfig.js with your credentials.

### 3. Serve Locally
Use any static server tool like Live Server

### 4. 🤝 Contributing

Feel free to submit a pull request. Bug reports and feature ideas are welcome!

Developed by Nabil-1030 & REDFS12
