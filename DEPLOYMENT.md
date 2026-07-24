# Page Pulse - Deployment Guide

This guide details how to deploy **Page Pulse Backend** to **Render** and **Page Pulse Frontend** to **Vercel**.

---

## 1. Push Code to GitHub

First, create a new GitHub repository (e.g., `page-pulse`) and push your code:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/page-pulse.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Name**: `page-pulse-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
5. Click **Create Web Service**.
6. Once deployed, copy your backend URL (e.g., `https://page-pulse-backend.onrender.com`).

---

## 3. Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. Configure the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. Expand **Environment Variables** and add:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://<YOUR_RENDER_BACKEND_URL>/api/v1`
   *(Example: `https://page-pulse-backend.onrender.com/api/v1`)*
5. Click **Deploy**.

---

## Verification
1. Open your Vercel deployment URL (e.g. `https://page-pulse.vercel.app`).
2. Test analyzing any website (e.g. `https://example.com`).
3. Your Vercel frontend will now communicate directly with your Render backend!
