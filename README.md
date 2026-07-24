# ⚡ Page Pulse - Modern Site Audit & SEO Analytics

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5.1-000000?logo=fastify&logoColor=white)](https://fastify.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Page Pulse** is a modern, full-stack web application designed to audit websites for SEO performance, content metrics, accessibility indicators, and response speed. Built with a sleek glassmorphism design system and dynamic micro-animations.

---

## ✨ Features

- 🎯 **Dynamic SEO Score (0-100)**: Evaluates page titles, meta descriptions, H1 headers, image alt text, word count, canonical tags, and Open Graph tags with color-coded score indicators (🟢 80–100, 🟡 60–79, 🔴 <60).
- 🚨 **Grouped Recommendations**: Automatically categorizes findings into **Critical Fixes**, **Warnings**, and **Passed Checks** for actionable prioritization.
- ⚡ **Response Time Badges**: Evaluates server latency into **Fast (<500ms)**, **Moderate (500–1500ms)**, or **Slow (>1500ms)** performance tiers.
- 📊 **Rich Metrics Extraction**:
  - Total Images & Missing Alt Text count
  - Total Links, Internal Links, and External Links
  - Canonical Tag & Open Graph Tag detection
  - Robots Meta Tag inspection
- 📥 **Export Report Data**: One-click **Copy Report** and **Download JSON** formatted output.
- 🖼 **Google Favicon Integration**: Automatically displays domain favicons next to audited site headers.
- 🎨 **Glassmorphism Design System**: Vanilla CSS with fluid gradients, responsive grid layouts, and automatic Dark/Light mode support.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Animations**: Framer Motion
- **Styling**: Modern Vanilla CSS (Glassmorphism & CSS Variables)
- **Deployment**: Vercel

### Backend
- **Framework**: Fastify 5
- **HTML Parsing**: Cheerio
- **HTTP Engine**: Native Node.js Fetch API with AbortController timeouts
- **Deployment**: Render

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moizDhila52/Page-plus.git
   cd Page-plus
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *The Fastify backend will run at `http://localhost:5000`.*

3. **Setup Frontend**:
   In a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The React frontend will run at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
Page-plus/
├── backend/
│   ├── src/
│   │   ├── config/        # Environment configurations
│   │   ├── controllers/   # Route controllers
│   │   ├── plugins/       # Fastify plugins (CORS)
│   │   ├── routes/        # API endpoints (/api/v1/audit)
│   │   ├── schemas/       # JSON schema validation
│   │   ├── services/      # Cheerio scraping & metric logic
│   │   └── server.js      # App entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # UrlForm, AuditCard
│   │   ├── services/      # API fetch client
│   │   ├── App.jsx        # Main React container
│   │   └── index.css      # Custom Glassmorphism design system
│   └── package.json
│
├── render.yaml            # Render infrastructure blueprint
└── README.md
```

---

## 🌐 Deployment Configuration

- **Backend (Render)**: Set Root Directory to `backend`, Build Command to `npm install`, Start Command to `npm start`, and Environment Variable `PORT=5000`.
- **Frontend (Vercel)**: Set Root Directory to `frontend` and Environment Variable `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api/v1`.

---

## 📄 License

This project is licensed under the MIT License.
