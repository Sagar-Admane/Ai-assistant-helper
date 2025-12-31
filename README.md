# 🤖 AI Assistant Helper
**AI-powered Email Assistant & README Generator**

Turn GitHub repositories into professional README files ✨  
and streamline inbox management using AI.

🔗 **Repository:** https://github.com/Sagar-Admane/Ai-assistant-helper

---

## 📌 Overview

**AI Assistant Helper** is a full-stack AI-powered email assistant designed to simplify inbox management.  
It securely connects to your Gmail account, fetches recent emails, and uses an AI model to:

- Generate concise summaries  
- Categorize emails (Work, Personal, Finance, etc.)
- Suggest actionable next steps like **Reply**, **Add to Calendar**, or **Ignore**

The application features a clean, interactive dashboard built with **React** and a robust backend powered by **Node.js, Express, and TypeScript**.

---

## ✨ Features

### 🔐 Authentication
- Dual authentication support:
  - Email & Password
  - Google OAuth 2.0

### 📩 Email Fetching
- Retrieves the **10 most recent Gmail emails** using the Gmail API
- Read-only access for enhanced security

### 🧠 AI-Powered Analysis
For any selected email, the AI:
- Generates a short, readable summary
- Classifies the email (Work, Personal, Finance, etc.)
- Suggests an action:
  - **Reply** (auto-generates subject & body)
  - **Add to Calendar** (extracts event details)
  - **Ignore**

### 🖥️ Interactive Dashboard
- Clean UI to browse emails
- One-click AI analysis
- Modal-based action confirmation

### 🔗 Webhook Integration
- Sends structured AI output to a webhook endpoint
- Enables automation with external tools and workflows

---

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- SASS
- Axios
- React Router
- Material-UI (Modals)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Google APIs (Gmail API, OAuth 2.0)
- OpenRouter API (AI model access)

---

## 📁 Project Structure

```plaintext
.
├── backend/
│   ├── src/
│   ├── dist/
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   └── Components/
    └── package.json
```

⚙️ Setup & Installation
Prerequisites

Node.js v18+

npm or yarn

MongoDB instance



If you want:
- badges (stars, license, tech stack)
- screenshots section
- a **README generator prompt**
- or a **short recruiter-friendly README**

Just say it 👌

