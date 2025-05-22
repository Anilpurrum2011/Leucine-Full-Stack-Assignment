# ✅ AI-Powered Todo App – React + Node.js + Ollama + Slack + MongoDB

This is a full-stack Todo List app that lets you manage todos and generate meaningful summaries using a **local LLM (Ollama's `gemma:2b`)**. The summary is then sent to a **Slack channel** via Incoming Webhooks.

---

## 🚀 Features

- Add, edit, delete todos
- View a list of current todos
- Generate an intelligent summary of tasks using **Ollama's Gemma LLM**
- Post the summary to **Slack**
- Show success/failure message after sending to Slack
- Deployed on **Vercel** with a **MongoDB** database

---

## ⚙️ Tech Stack

| Layer        | Stack                          |
|--------------|--------------------------------|
| Frontend     | React, Axios                   |
| Backend      | Node.js, Express               |
| LLM          | Ollama (`gemma:2b`)            |
| Database     | MongoDB (Atlas or local)       |
| Messaging    | Slack Incoming Webhooks        |
| Hosting      | Vercel (frontend/backend)      |

---

## 🌐 Project Structure

```
📦 project-root
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   └── public/
├── README.md
└── vercel.json
```

---

## 📦 Environment Variables

### ✅ `.env.example`

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/todos

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ

# Ollama
OLLAMA_API_URL=http://localhost:11434/api/generate
```

---

## 🧠 LLM Integration (Ollama – `gemma:2b`)

We use **Ollama's local LLM** to summarize todos.

### Steps to run locally:
1. [Install Ollama](https://ollama.com)
2. Pull the `gemma:2b` model:
   ```bash
   ollama pull gemma:2b
   ```
3. Ensure Ollama is running:
   ```bash
   ollama run gemma:2b
   ```
4. The backend hits `http://localhost:11434/api/generate` with a prompt like:
   ```json
   {
     "model": "gemma:2b",
     "prompt": "Summarize the following todos:\n1. Build frontend\n2. Set up MongoDB\n3. Deploy to Vercel"
   }
   ```

---

## 💬 Slack Integration

We use **Slack Incoming Webhooks** to post LLM-generated summaries.

### Steps:
1. Go to https://api.slack.com/messaging/webhooks
2. Create an app & enable webhooks
3. Add to a channel
4. Copy the Webhook URL
5. Add to your `.env`:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
   ```

---

## 🛠️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Fill in MongoDB, Slack, Ollama details
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/api/todos`     | Get all todos                    |
| POST   | `/api/todos`     | Create a new todo                |
| PUT    | `/api/todos/:id` | Edit a todo                      |
| DELETE | `/api/todos/:id` | Delete a todo                    |
| POST   | `/api/summarize` | Summarize todos & send to Slack  |

---

## 🧱 MongoDB Schema

### Todo Model (`models/Todo.js`)

```js
{
  text: String,
  completed: Boolean,
  createdAt: Date
}
```

---

## ☁️ Deployment (Vercel)

### 1. Connect your GitHub repo
- Create a Vercel account
- Import your project
- Configure environment variables in Vercel dashboard

### 2. Add a `vercel.json` for routing:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/server.js"
    }
  ]
}
```

---

## ✍️ Design Decisions

- **Ollama** for LLM to ensure low cost & local processing
- **Slack Webhooks** are fast and easy to use
- **MongoDB** for flexible document storage
- **Vercel** for fast full-stack deployment

---

## 🧪 Sample Summary Output

```
📌 *Your Todo Summary*:
- Finish React UI
- Connect to MongoDB
- Summarize with Ollama
- Push to GitHub
- Deploy on Vercel

You have 5 tasks. Keep going! 💪
```

---

## 📸 Screenshots

> Add UI screenshots here once deployed

---

## 📬 Contact

Created by **Anil**  
📧 anil@example.com | 🌐 [Your LinkedIn/GitHub URL]

---

## 🛡️ License

MIT © 2025 Anil
