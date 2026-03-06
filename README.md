# 💧 Water Purifier Platform

A modern full-stack platform for managing water purifier services, products, AMC plans, and customer interactions.

Built with **React + Vite + Node.js + Neon DB** for speed, scalability, and production readiness.

---

## 🚀 Live Stack

* ⚡ Frontend: React + Vite + TailwindCSS
* 🧠 Backend: Express + TypeScript
* 🗄 Database: PostgreSQL (Neon Serverless)
* 🔐 Auth: JWT-based authentication
* 📦 ORM: Drizzle ORM

---

## ✨ Features

### 🛍 Customer Side

* Browse water purifiers and spare parts
* AMC plans and pricing tables
* Add to cart functionality
* City-based service pages
* Blog and educational content
* Contact and lead generation

### 🧑‍💼 Admin / Backend

* Lead management APIs
* Order tracking
* Product management
* Technician workflows
* Structured REST API

---

## 🏗 Project Structure

```
├── client/        # React frontend (Vite)
├── server/        # Express backend
├── shared/        # Shared types & schema
├── scripts/       # Utility scripts
├── drizzle.config.ts
└── package.json
```

---

## ⚡ Getting Started

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Indian24/water-purifier-.git
cd water-purifier-
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment

Create `.env`:

```env
DATABASE_URL=your_neon_postgres_url
```

Example:

```
postgresql://user:password@ep-xxxx.neon.tech/db?sslmode=require
```

---

### 4️⃣ Run Database Sync

```bash
npx drizzle-kit push
```

---

### 5️⃣ Start Backend

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

### 6️⃣ Start Frontend

```bash
npx vite
```

Frontend:

```
http://localhost:5173
```

---

## 🌐 Deployment

### Backend

Recommended:

* Railway
* Render
* Fly.io

### Frontend

Recommended:

* Vercel
* Netlify

### Database

* Neon Serverless PostgreSQL

---

## 🔐 Environment Variables

| Variable     | Description                     |
| ------------ | ------------------------------- |
| DATABASE_URL | Neon Postgres connection string |
| JWT_SECRET   | Auth token signing secret       |
| PORT         | Backend port (default 3000)     |

---

## 📦 Tech Stack

* React 18
* Vite 7
* TailwindCSS
* Node.js 20
* Express
* Drizzle ORM
* PostgreSQL (Neon)

---

## 📈 Future Roadmap

* [ ] Admin dashboard UI
* [ ] Razorpay integration
* [ ] Technician mobile panel
* [ ] WhatsApp automation
* [ ] Multi-city scaling
* [ ] AI service recommendations

---

## 🤝 Contributing

Pull requests are welcome!

Steps:

1. Fork repo
2. Create feature branch
3. Commit changes
4. Open PR

---

## 🛡 Security

* `.env` is ignored via `.gitignore`
* Secrets are never committed
* Neon SSL enforced

---

## 📄 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

**Manish Ranjan**
Frontend Developer • Fullstack Builder • Hackathon Finalist

* GitHub: https://github.com/Indian24
* LinkedIn: *(add yours)*

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🚀 Build something awesome
