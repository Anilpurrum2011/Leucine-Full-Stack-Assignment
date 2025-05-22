#  Todo Summary Assistant 

- This is a Todo List app that helps you keep track of your tasks. After you add or update your to-dos, the app uses a small built-in AI (called gemma:2b from Ollama) to create a short summary of your tasks. 
  Then, it automatically sends that summary to a Slack channel using a simple connection called a webhook — so your team always knows what’s going on.
---

##  Features

- Add, edit, save, delete todos
- View a list of current todos
- Generate an intelligent summary of tasks using **Ollama's Gemma LLM**
- Post the summary to **Slack**
- Show success/failure message after sending to Slack
- Deployed on **Vercel** with a **MongoDB** database

---

##  Screenshots

![image](https://github.com/user-attachments/assets/64d3b980-df05-4107-bd4e-bcf9f1aeb1b2)
![image](https://github.com/user-attachments/assets/c57a682b-b15d-4624-bd63-4f2a73e13c1f)
![image](https://github.com/user-attachments/assets/d04dc338-8152-448d-b2c1-5e57970bf2b6)
![image](https://github.com/user-attachments/assets/2530447d-b742-43d9-89a5-90ca5663ad43)
![image](https://github.com/user-attachments/assets/19555b7a-ecd9-40a7-8daf-031a213ce8b5)

---

##  Tech Stack

| Layer        | Stack                          |
|--------------|--------------------------------|
| Frontend     | React, Axios                   |
| Backend      | Node.js, Express               |
| LLM          | Ollama (`gemma:2b`)            |
| Database     | MongoDB (Atlas)       |
| Messaging    | Slack Incoming Webhooks        |
| Hosting      | Vercel (frontend/backend)      |

---

##  Project Structure

```
 project-root
├── client/
│   ├── src/
│   └── public/
├── server/
│   ├── routes/
│   ├── models/
│   ├── .env
│   └── index.js
├── README.md
└── vercel.json
```

---

##  Environment Variables

###  `.env`

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leucinefullstack

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ

# Ollama
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=gemma:2b
```

---

##  LLM Integration (Ollama – `gemma:2b`)

We use **Ollama's local LLM** to summarize todos.

### Steps to run locally:

1. Install Ollama: https://ollama.com
   
2. Pull the `gemma:2b` model:
   ```bash
   ollama pull gemma:2b
   ```
3. Ensure Ollama is running:
   ```bash
   ollama run gemma:2b
   ```
---

##  Slack Integration

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

##  Setup Instructions

###  Frontend Setup

```bash
cd frontend
npm install
npm start
```

###  Backend Setup

```bash
cd backend
npm install
node index.js
```

---

##  API Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/api/todos`     | Get all todos                    |
| POST   | `/api/todos`     | Create a new todo                |
| PUT    | `/api/todos/:id` | Edit a todo                      |
| DELETE | `/api/todos/:id` | Delete a todo                    |
| POST   | `/api/summarize` | Summarize todos & send to Slack  |

---

##  MongoDB Schema

### Todo Model (`models/Todo.js`)

```js
{
  text: String,
  completed: Boolean,
  createdAt: Date
}
```

---

##  Deployment (Vercel)

### 1. Connect your GitHub repo
- Create a Vercel account
- Import your project
- Configure environment variables in Vercel dashboard

### 2. Add a `vercel.json` for routing:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}

```

---

##  Design Decisions

- **Ollama** for LLM to ensure low cost & local processing
- **Slack Webhooks** are fast and easy to use
- **MongoDB** for flexible document storage
- **Vercel** for fast full-stack deployment

---


---

##  Contact

anilpurrum@gmail.com 
https://github.com/Anilpurrum2011/

---

##  License

MIT © 2025 Anil
