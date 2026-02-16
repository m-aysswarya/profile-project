# 🚀 Profile Project – Frontend

**Gidy.ai Full-Stack Technical Challenge Submission**

## 🔗 Live Application

👉 **Live URL:**  
https://profile-project-pi.vercel.app/

👉 **Backend API:**  
https://profile-project-be.onrender.com/api

👉 **GitHub Repository:**  
https://github.com/m-aysswarya/profile-project

---

# 📌 Project Overview

This project is a high-fidelity replica of the Gidy.ai Profile Page built using React and Vite.

The application dynamically fetches profile data from a RESTful backend API and allows users to update their information through an Edit mode. The goal was to demonstrate strong frontend architecture, clean UI implementation, and thoughtful product enhancement.

---

# 🛠 Tech Stack

* React (Vite)
* JavaScript (ES6+)
* CSS / Tailwind CSS / Module CSS (update if needed)
* Fetch API / Axios
* LocalStorage (for persistent UI state)

---

# ✨ Core Features

## ✅ Profile Display

* Fetches profile data from backend API
* Displays:

  * Name
  * Bio
  * Profile Picture
  * Social Links
  * Skills
  * Experience
  * Certifications (if applicable)

## ✅ Edit Mode

* Toggle between View and Edit mode
* Update profile information
* Save changes to database
* Immediate UI update after successful save

## ✅ Backend Integration

All profile data is dynamically fetched from the backend.

Example:

```js
fetch(`${import.meta.env.VITE_BASE_URL}/api/profile`)
```

---

# 💡 Innovation: Persistent Theme Toggle (Dark / Light Mode)

## 🎯 Why I Chose This Innovation

User personalization significantly enhances user experience. A persistent theme toggle:

* Improves accessibility
* Increases usability across environments
* Enhances overall user comfort
* Demonstrates state management and browser storage handling

Instead of implementing a static dark mode, I implemented a **persistent theme system** that remembers the user's preference across sessions.

---

## ⚙️ Technical Implementation

* Theme state is managed using React state.
* The selected theme is stored in `localStorage`.
* On application load, the theme is retrieved from `localStorage`.
* CSS classes dynamically update the UI.
* The preference persists even after page refresh or browser restart.

Example logic:

```js
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  }
}, []);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

---

# 📂 Folder Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── assets/
 ├── api/ (if used)
 └── App.jsx
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/m-aysswarya/profile-project.git
cd profile-project
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5000
```

⚠️ All Vite environment variables must begin with `VITE_`.

## 4️⃣ Run Development Server

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

# 🚀 Production Build

```bash
npm run build
```

---

# 🎨 UI/UX Focus

* Responsive design (mobile-first)
* Clean spacing and layout
* Consistent typography
* Smooth theme transitions
* Attention to pixel-level detail

---

# 🔐 Security Note

* No sensitive keys are stored in frontend.
* Environment variables are handled via Vite.
* `.env` is excluded using `.gitignore`.

---

# 👩‍💻 Author

**Ayswarya M**
Full-Stack Developer
GitHub: [https://github.com/m-aysswarya](https://github.com/m-aysswarya)

---
