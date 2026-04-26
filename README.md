# 📝 Mega Blog App

A production-grade full-stack blogging platform where users can sign up, write blogs with cover images, and publish them — built with React and Appwrite.

---

## 🚀 Live Demo
> Coming soon...

---

## ✨ Features

- 🔐 **Authentication** — Signup, Login, Logout with session management
- 📝 **Blog CRUD** — Create, Read, Update and Delete blog posts
- 🖼️ **Cover Image Upload** — Upload and preview images via Appwrite Storage
- 🛡️ **Protected Routes** — Only authenticated users can create/edit posts
- 🌐 **Public Feed** — All active posts visible to everyone
- ⚡ **Global State** — Redux Toolkit for seamless auth state across the app
- 🎨 **Rich Text Editor** — Write blogs with a full RTE experience

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| Backend (BaaS) | Appwrite |
| Database | Appwrite TablesDB |
| Storage | Appwrite Buckets |
| Auth | Appwrite Auth |
| Rich Text | React Hook Form + RTE |

---

## 📁 Project Structure

```
MegaBlog/
├── public/
├── src/
│   ├── appwrite/
│   │   ├── auth.js           # AuthService — login, signup, logout
│   │   └── config.js         # Service — DB & Storage operations
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── LogoutBtn.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── post-form/
│   │   │   └── PostForm.jsx  # Create & Edit post form
│   │   ├── AuthLayout.jsx    # Protected route wrapper
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── Input.jsx
│   │   ├── Logo.jsx
│   │   ├── PostCard.jsx      # Blog post preview card
│   │   ├── RTE.jsx           # Rich Text Editor
│   │   ├── Select.jsx
│   │   └── index.js          # Barrel exports
│   │
│   ├── conf/
│   │   └── Conf.js           # Env variable config
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── AllPosts.jsx
│   │   ├── AddPost.jsx
│   │   ├── EditPost.jsx
│   │   └── Post.jsx
│   │
│   ├── store/
│   │   ├── Store.js          # Redux store config
│   │   └── AuthSlice.js      # Auth reducer — login/logout state
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/mega-blog-app.git
cd mega-blog-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DB_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
```

> Get these values from your [Appwrite Console](https://cloud.appwrite.io)

### 4. Run the dev server

```bash
npm run dev
```

---

## 🏗️ Architecture Overview

```
React UI
   │
   ├── Redux Store (AuthSlice)
   │      └── Tracks logged in user globally
   │
   ├── AuthService (appwrite/auth.js)
   │      └── createAccount | login | logout | getCurrentUser
   │
   └── Service (appwrite/config.js)
          ├── createPost | updatePost | deletePost | getPost | getPosts
          └── uploadFile | deleteFile | getFilePreview
```

The app follows a **service layer pattern** — all Appwrite interactions are abstracted into service classes, keeping components clean and backend-agnostic.

---

## 🔐 Auth Flow

```
User fills Signup form
      ↓
AuthService.createAccount() → Appwrite creates user
      ↓
AuthService.login() → Appwrite creates session
      ↓
dispatch(login({ userData })) → Redux updates global state
      ↓
Protected routes unlock → User lands on home feed
```

---

## 📦 Key Dependencies

```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "appwrite": "^16",
  "@reduxjs/toolkit": "^2",
  "react-redux": "^9",
  "react-hook-form": "^7",
  "tailwindcss": "^3"
}
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Author

**Umesh Rathod**
- 2nd Year IT Student @ NIT Jalandhar
- Building in public 🚀

> *Built as a learning project to master React, Appwrite, Redux and production-grade frontend architecture.*