# 🧠 MindEase – Mental Wellness Web App

MindEase is a responsive mental health tracking platform where users can manage their wellness through mood logging, appointment booking, reading mental health blogs, and community interactions. It also includes a lightweight admin dashboard to manage users, content, and platform engagement.

---

## 🎥 Project Demo

📺 [Watch Project Video](https://drive.google.com/file/d/1G-7M_CX-GJjYeqAkWw7GZ5r0vrAlTjuU/view)

---

## 🌐 Live Deployment

🔗 [Visit the Live Website](https://mindease-connect-hub.vercel.app/)

---

## ✨ Key Features

### 👤 User Authentication (Mocked)

- Sign In / Register with Email & Password
- Forgot Password (email input – mocked)
- Persistent session using `localStorage`

### 📈 Mental Health Tools

- Mood Tracking: Happy, Sad, Anxious, etc.
- Anxiety and Sleep Quality Logging
- Mood Trends: Line charts & analytics

### 📅 Appointment Booking

- Browse available therapists (from fake API)
- Select time slots and manage bookings
- View upcoming appointments

### 📰 Blog & Community

- Therapy-related blog articles via fake APIs
- Create anonymous community posts
- Like and comment on posts (mocked)

### 🛠️ Admin Dashboard

- View, block, or delete users
- Manage all appointments
- Add/edit/delete blog posts
- Moderate community posts
- View engagement and usage analytics

---

## 🛠️ Tech Stack

| Feature              | Technology Used              |
|----------------------|------------------------------|
| Frontend             | React.js (Functional + Hooks)|
| Styling              | TailwindCSS                  |
| Routing              | React Router DOM             |
| State Management     | Context API (or Redux)       |
| API Integration      | Axios + Fake APIs (JSONPlaceholder, MockAPI) |
| Authentication       | useAuth     |
| Deployment           | Vercel                       |
| Animations           | Framer Motion                |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Auth/              # SignIn, Register, ForgotPassword
│   ├── Dashboard/         # Mood charts, analytics
│   ├── Blog/              # Blog UI components
│   ├── Admin/             # Admin panel features
├── pages/
│   ├── Dashboard.jsx
│   ├── BookAppointment.jsx
│   ├── Blog.jsx
│   ├── Community.jsx
│   ├── ContactUs.jsx
│   ├── AboutUs.jsx
├── services/
│   └── api.js             # Axios setup for mock APIs
├── utils/
│   └── auth.js            # Auth helpers
├── App.jsx
├── index.js
```

---

## 📄 Documentation

📖 [View the Full Documentation (PDF)](https://drive.google.com/file/d/13bkqg1k99yEgh3i5VH8bya43gJxArUJe/view?usp=sharing)

This includes:
- Project purpose
- Target users
- All features & flow
- Wireframes and structure
- Admin functionality
- Success metrics

---

## 🎤 Presentation

🖥️ [View Project Presentation (Canva)](https://www.canva.com/design/DAGnbr1XPXY/-rzPeO792PE0uzVMig3-0Q/view)

---

## 🚀 Getting Started Locally

Follow these steps to run the project locally:

1. Clone the repo
```bash
git clone https://github.com/DamarisM87/mindease-connect-hub.git
cd mindease-connect-hub
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Visit in browser:
```
http://localhost:3000
```

---

## 📸 Screenshots (optional)

> Add `screenshots/` folder and link some preview images here for visual overview.

---

## 🔐 License

MIT License

---

> “Self-awareness is the first step to healing.”
