# LifeAPI ❤️

<p align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100" />
  <br>
  <strong>Connecting Lifesavers. One Donation at a Time.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

LifeAPI is a full-stack web application designed to bridge the gap between blood donors, organizations (hospitals, blood banks, NGOs), and life-saving donation events. Our platform empowers users to find nearby blood donation drives, connect with registered organizations, and contribute to a cause that truly matters.

🌐 **Live Website:** **[https://lifeapi.vercel.app/](https://lifeapi.vercel.app/)**

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Author](#-author)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

-   🔐 **Secure User Authentication:** Robust login and signup functionality using JWT for secure sessions and bcrypt for password hashing.
-   🏥 **Find Organizations:** A comprehensive directory allowing users to search for registered hospitals, NGOs, and blood banks in their vicinity.
-   📅 **Blood Donation Events:** Browse, search, and register for upcoming blood donation events and drives.
-   📝 **Organization Portal:** A dedicated dashboard for organizations to register, manage their profile, create and update events, and connect with potential donors.
-   ☁️ **Cloud Image Uploads:** Seamless integration with Cloudinary for handling profile pictures and event posters.
-   📍 **Location-Based Services:** Intelligently helps users discover the nearest donation centers and events, making it easier than ever to donate.
-   📱 **Responsive Design:** Fully responsive interface built with TailwindCSS, ensuring a great user experience on any device.

---

## 🚀 Tech Stack

Here's a list of the major technologies used to build LifeAPI:

| Category          | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Frontend** | React (Vite), TailwindCSS, Axios                                                    |
| **Backend** | Node.js, Express.js                                                                 |
| **Database** | MongoDB                                                                             |
| **Authentication**| JSON Web Tokens (JWT), Bcrypt                                                       |
| **Cloud Services**| Cloudinary (for image storage)                                                      |
| **Deployment** | **Backend:** [Render](https://render.com/), **Frontend:** [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

The repository is organized into two main folders for a clean separation of concerns.
```
LifeAPI-website/
│
├── backend/      # Express.js API Server
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js   # Entry point
│
└── frontend/      # React (Vite) Client Application
├── public/
└── src/
├── assets/
├── components/
├── pages/
├── App.jsx
└── main.jsx  # Entry point
```

---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn)
- A [MongoDB](https://www.mongodb.com/) account (for the connection string)
- A [Cloudinary](https://cloudinary.com/) account (for API keys)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Pankajse/LifeAPI-website.git](https://github.com/Pankajse/LifeAPI-website.git)
    cd LifeAPI-website
    ```

2.  **Backend Setup**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section below)
    touch .env

    # Start the backend server
    npm start
    ```
    The backend will be running on `http://localhost:5000`.

3.  **Frontend Setup**
    ```bash
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section below)
    touch .env

    # Start the frontend development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---

## 🔑 Environment Variables

You will need to create a `.env` file in both the `backend` and `frontend` directories.

#### Backend (`/backend/.env`)

```.env
LOCATIONIQ_API_KEY=your_locationIQ_api_key
DB_URL=your_mongoDB_url
JWT_SECRET=Your_jwt_secret
```
Frontend (/frontend/.env)
Code snippet
```.env
VITE_BASE_URL=http://localhost:3000
```
📌 Deployment
The application is deployed with a decoupled architecture:

Backend API: Hosted on Render.

Frontend Client: Hosted on Vercel.

👨‍💻 Author
Pankaj Singh

GitHub: [@Pankajse](https://github.com/Pankajse/)

LinkedIn: [@Pankaj](https://www.linkedin.com/in/pankaj-singh-tech/)
Let's Connect! ---
