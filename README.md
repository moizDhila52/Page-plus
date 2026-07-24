# ⚡ Page Pulse - Modern Site Audit & SEO Analytics

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5.1-000000?logo=fastify&logoColor=white)](https://fastify.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Tests](https://img.shields.io/badge/Tests-4%20Passing-brightgreen.svg)](tests)
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

- **Frontend**: React 19, Vite 8, Framer Motion, Vanilla Glassmorphic CSS
- **Backend**: Fastify 5, Cheerio, Node.js Native Fetch API
- **Testing**: Node.js Native Test Runner (`node:test`, `node:assert`)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/moizDhila52/Page-plus.git
cd Page-plus

# Install backend
cd backend
npm install

# Install frontend (in a new terminal tab)
cd ../frontend
npm install
```

### 2. Running Locally
- **Backend Server** (runs at `http://localhost:5000`):
  ```bash
  cd backend
  npm run dev
  ```
- **Frontend App** (runs at `http://localhost:5173`):
  ```bash
  cd frontend
  npm run dev
  ```

### 3. Running Automated Tests
To run unit and integration tests for the parsing engine and URL validation:
```bash
cd backend
npm test
```

---

## 📑 API Contract

### `POST /api/v1/audit`

Analyzes a target URL and returns raw SEO metrics, score elements, and timestamps.

#### Request Body
```json
{
  "url": "https://example.com"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "status": 200,
    "responseTime": "245 ms",
    "title": "Example Domain",
    "metaDescription": "Example domain for illustrative examples in documents",
    "h1Count": 1,
    "totalImages": 0,
    "imagesWithoutAlt": 0,
    "totalLinks": 1,
    "internalLinks": 0,
    "externalLinks": 1,
    "hasCanonical": false,
    "canonicalHref": "",
    "robotsMeta": "",
    "hasOgTags": false,
    "wordCount": 38,
    "analyzedAt": "2026-07-25T01:20:00.000Z"
  }
}
```

#### Error Response (400 / 408 / 422 / 500)
```json
{
  "success": false,
  "message": "This website blocks automated requests. Try another website."
}
```

---

## 💡 3 Key Design Decisions & Rationale

### 1. Fastify Framework Over Express
* **Reasoning**: Fastify offers significantly higher HTTP throughput, built-in JSON Schema validation via Fast-json-stringify, and zero-overhead async plugin architecture (`@fastify/cors`). Using Fastify schema validation ensures strict response serialization and prevents sensitive or unvalidated data leakage.

### 2. Custom Vanilla CSS Glassmorphism Over Tailwind CSS
* **Reasoning**: To create a bespoke, high-end SaaS feel with dynamic backdrop blur filters, custom gradients, and CSS variables for theme mode adaptation without introducing utility class bloat or build step overhead.

### 3. Grouped Severity Recommendations (Critical vs. Warning vs. Passed)
* **Reasoning**: Flat lists of audit data create cognitive overload. Grouping results into 🚨 **Critical Fixes** (Title/H1 missing), 🟡 **Warnings** (Meta description, Alt text, Canonical tags), and 🟢 **Passed Checks** gives website owners immediate actionable ROI to prioritize high-impact SEO issues first.

---

## 📹 Loom Demo & Future Roadmap

### Demo Video Overview
Record a 2-minute Loom video demonstrating:
1. **Interactive Demo**: Inputting a website URL, viewing the multi-step loading animation (*Checking response... -> Parsing HTML... -> Generating report...*), score color coding, response time badges, domain favicon, and JSON export.
2. **Graceful Error Handling**: Demonstrating bot-blocked or invalid URL feedback card.
3. **Code Walkthrough**: Showing `audit.service.js` parsing logic and `audit.test.js`.

### 🔮 What I Would Change With Another Day
If granted an extra day of development, I would implement:
1. **Lighthouse Core Web Vitals Integration**: Integrate Google PageSpeed Insights API to pull real LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), and INP metrics alongside HTML analysis.
2. **Audit History & Database Persistence**: Connect PostgreSQL / Prisma ORM to save historical audits, enabling side-by-side time-series comparisons for domain tracking over time.
3. **Automated Headless Screenshot Generation**: Use Puppeteer / Playwright to capture dynamic desktop and mobile viewport screenshots of audited sites.

---

## 📄 License
This project is licensed under the MIT License.
