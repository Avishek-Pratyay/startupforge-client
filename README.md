# 🚀 StartupForge – AI Powered Startup Collaboration Platform

<div align="center">

### 🌐 Connect • 🚀 Build • 🤝 Collaborate • 💼 Hire

An AI-powered full-stack collaboration platform where startup founders can build teams, publish opportunities, recruit collaborators, and manage startup growth from a single dashboard.

---

### 🔗 Live Demo

🌍 **Frontend:** https://startupforge-client-six.vercel.app

⚙️ **Backend API:** https://startupforge-server-a4qy.onrender.com

</div>

---

# 📌 Project Overview

StartupForge is a modern startup ecosystem platform designed to bridge the gap between startup founders and talented collaborators.

Instead of searching through multiple platforms, founders can publish startup ideas, recruit team members, manage applications, and even upgrade to premium features for unlimited hiring opportunities.

Collaborators can discover innovative startups, apply for opportunities, and manage all their applications through a personalized dashboard.

---

# 🎯 Problem Solved

StartupForge simplifies startup recruitment by providing a centralized platform where users can:

✅ Discover innovative startups

✅ Explore collaboration opportunities

✅ Apply for startup roles

✅ Create and manage startup profiles

✅ Recruit talented collaborators

✅ Track application status

✅ Upgrade to Premium for unlimited opportunity posting

---

# 👥 Target Users

- 🚀 Startup Founders
- 💻 Developers
- 🎨 UI/UX Designers
- 📈 Marketing Specialists
- 💼 Business Analysts
- 🤝 Investors
- 🎓 Students
- 🌍 Freelancers

---

# 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| 🎨 Frontend | React.js, React Router, Tailwind CSS, DaisyUI, Axios, Framer Motion |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB Atlas |
| 🔐 Authentication | Firebase Authentication, JWT, HTTP-only Cookies |
| 💳 Payment | Stripe Payment Gateway |
| ☁️ Deployment | Vercel, Render |
| 🧰 Additional Tools | Cookie Parser, CORS, Dotenv |

---

# ✨ Features

# 🔐 Authentication

- Firebase Authentication
- Email & Password Login
- Google OAuth Login
- JWT Authentication
- HTTP-only Cookie Security
- Protected Routes
- Role-based Authorization

---

# 🚀 Startup Management

- Create Startup Profiles
- Update Startup Information
- Delete Startup
- Startup Approval System
- Browse All Startups
- Startup Details Page

---

# 💼 Opportunity Management

- Post Hiring Opportunities
- Update Opportunities
- Delete Opportunities
- Search Opportunities
- Filter by Industry
- Filter by Work Type
- Pagination Support

---

# 🤝 Collaboration System

- Apply for Opportunities
- Prevent Duplicate Applications
- View Application Status
- Founder Application Management
- Accept / Reject Applicants

---

# 💳 Premium Membership

- Stripe Checkout Integration
- Premium Founder Upgrade
- Unlimited Opportunity Posting
- Secure Payment History

---

# 👨‍💼 Admin Dashboard

- Dashboard Analytics
- Revenue Statistics
- User Management
- Block / Unblock Users
- Startup Approval
- Delete Startups
- View Transactions

---

# 📊 Founder Dashboard

- Total Opportunities
- Total Applications
- Accepted Members
- Manage Opportunities
- Review Applications

---

# 👤 Collaborator Dashboard

- Browse Opportunities
- My Applications
- Track Application Status
- Profile Management

---

# 📱 Responsive Design

- 📱 Mobile Friendly
- 💻 Tablet Support
- 🖥️ Desktop Optimized
- 🎨 Modern UI
- ⚡ Smooth Animations

---

# 👥 User Roles

## 🚀 Founder

Founders can:

- Create Startup Profiles
- Post Opportunities
- Edit Opportunities
- Delete Opportunities
- View Applicants
- Accept / Reject Applicants
- Upgrade to Premium

---

## 🤝 Collaborator

Collaborators can:

- Register/Login
- Browse Startups
- Browse Opportunities
- Apply for Opportunities
- Track Applications
- Update Profile

---

## 👨‍💼 Admin

Admins can:

- View Dashboard Analytics
- Approve Startups
- Manage Users
- Block/Unblock Users
- View Revenue
- Monitor Transactions

---

# 🗄️ Database Structure

### Collections

- 👤 users
- 🚀 startups
- 💼 opportunities
- 📄 applications
- 💳 payments

---

# 🔌 API Endpoints

## 🔐 Authentication

```
POST /jwt
POST /logout
GET  /protected
```

---

## 👤 Users

```
GET    /users
POST   /users
PATCH  /users/:email
PATCH  /users/profile/:email
```

---

## 🚀 Startups

```
GET    /startups
GET    /startups/:id
POST   /startups
PATCH  /startups/:id
DELETE /startups/:id
```

---

## 💼 Opportunities

```
GET    /opportunities
GET    /opportunities/:id
POST   /opportunities
PATCH  /opportunities/:id
DELETE /opportunities/:id
```

---

## 🤝 Applications

```
POST  /applications
GET   /applications
GET   /my-applications/:email
GET   /founder-applications/:email
PATCH /applications/accept/:id
PATCH /applications/reject/:id
```

---

## 💳 Payments

```
POST /create-checkout-session
POST /payments
GET  /transactions
```

---

## 👨‍💼 Admin

```
GET    /admin-overview
GET    /admin/users
GET    /admin/startups
PATCH  /admin/users/block/:id
PATCH  /admin/users/unblock/:id
PATCH  /admin/startups/approve/:id
DELETE /admin/startups/:id
```

---

# ⚙️ Installation & Setup

## 📥 Clone Repository

### Client

```bash
git clone https://github.com/Avishek-Pratyay/startupforge-client.git
```

### Server

```bash
git clone https://github.com/Avishek-Pratyay/startupforge-server.git
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file.

## Frontend

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Backend

```env
PORT=
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
STRIPE_SECRET_KEY=
```

---

# 🧪 Demo Credentials

## 👤 Admin

```
Email: aadmin@gmail.com
Password: 123456
```


---

# ✅ Manual Test Cases

## 🔐 Authentication

- Register User
- Login
- Google Login
- Logout
- Protected Routes

---

## 🚀 Startup Management

- Create Startup
- Edit Startup
- Delete Startup
- View Startup

---

## 💼 Opportunities

- Create Opportunity
- Edit Opportunity
- Delete Opportunity
- Search Opportunity
- Filter Opportunities

---

## 🤝 Applications

- Apply
- Prevent Duplicate Application
- Accept Applicant
- Reject Applicant
- Track Status

---

## 💳 Premium

- Stripe Checkout
- Successful Payment
- Premium Upgrade
- Unlimited Posting

---

## 👨‍💼 Admin

- Approve Startup
- Block User
- Unblock User
- View Revenue
- View Transactions

---

# ⚠️ Known Limitations

- 📧 No Email Notification System
- 🔔 No Real-time Notifications
- 💬 No Chat System
- ⭐ No Startup Reviews
- 📅 No Interview Scheduling

---

# 🚀 Future Improvements

- 🤖 AI Startup Recommendation
- 💬 Real-time Messaging
- 🔔 Push Notifications
- 📅 Interview Scheduling
- ⭐ Startup Rating System
- 📈 Analytics Dashboard
- 📄 Resume Parsing
- 🎥 Video Interview Support
- 🌙 Dark / Light Theme
- 🔄 Real-time Updates using Socket.io

---

# 📁 Repositories

## 💻 Client

https://github.com/Avishek-Pratyay/startupforge-client

---

## ⚙️ Server

https://github.com/Avishek-Pratyay/startupforge-server

---

# 👨‍💻 Author

## **Avishek Chanda Pratyay**

🌐 Portfolio  
https://avishekp.netlify.app/

💼 LinkedIn  
http://www.linkedin.com/in/avishek-chanda

🐙 GitHub  
https://github.com/Avishek-Pratyay

---
<div align="center">

### ⭐ If you like this project, don't forget to Star the repository!

Made with ❤️ using React, Express, MongoDB & Firebase

</div>
