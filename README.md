# 🗓️ Appointment Manager with Authentication

A full-stack Node.js application that allows users to register, log in, and book appointments securely. Built with Express, MongoDB, Passport.js, and EJS templating.

## ✨ Features

* ✅ User registration and login
* 🔐 Authentication with Passport.js
* 🗕️ Create and manage appointments
* 🔁 Flash messages for user feedback
* 🧠 Server-side input validation
* 🗒 Session support and user-specific bookings
* 🎨 Clean UI with EJS templating and Bootstrap
* 📂 Modular routes and error handling
* 💾 MongoDB Atlas integration

---

## 📸 Screenshots

> Add screenshots of:
>
> * Home page
> * Booking form
> * Login/register
> * Dashboard (optional)

---

## 🧑‍💻 Tech Stack

| Tech            | Description                   |
| --------------- | ----------------------------- |
| Node.js         | JavaScript runtime            |
| Express         | Backend framework             |
| MongoDB         | NoSQL database (via Mongoose) |
| EJS             | Server-side templates         |
| Passport.js     | User authentication           |
| connect-flash   | Flash message support         |
| express-session | Session management            |
| method-override | For supporting PUT/DELETE     |

---

## ⚙️ Installation

### 🧪 1. Clone the repo

```bash
git clone https://github.com/DevOlabode/appointment-manager-with-auth.git
cd appointment-manager-with-auth
```

### 🛠 2. Install dependencies

```bash
npm install
```

### 🔑 3. Set up environment variables

Create a `.env` file:

```
MONGO_URI=your-mongodb-atlas-url
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

> You can also copy from `.env.example` if it exists.

---

### ▶️ 4. Run the app locally

```bash
npm start
```

Go to: `http://localhost:3000`

---

## 📁 Folder Structure

```
appointment-manager-with-auth/
├── models/             # Mongoose models
├── routes/             # Express route files
├── public/             # Static assets (CSS, JS)
├── views/              # EJS templates
├── utils/              # Custom error classes
├── app.js / index.js   # Main server file
├── .env                # Local env vars (not committed)
```

---

## ❗ Known Issues

* No calendar UI yet (coming soon!)
* Admin role not implemented (TBD)

---

## ✍️ Author

**Samuel Olabode**
🔗 [GitHub](https://github.com/DevOlabode)

---

## 📜 License

This project is licensed under the MIT License.
