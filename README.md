# 🏫 EduCampus — College Discovery Platform

> A production-grade full-stack college discovery platform built as part of an AI Software Engineer Internship assignment.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <a href="https://college-discovery-platform-o3vy.vercel.app">🔗 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#tech-stack">🛠️ Tech Stack</a> •
  <a href="#getting-started">🚀 Getting Started</a>
</p>

---

## 🚀 Live Demo

🌐 **[https://college-discovery-platform-o3vy.vercel.app](https://college-discovery-platform-o3vy.vercel.app)**

---

## 📌 Features

- 🔍 **Real-time Search** — Search colleges by name, location, and filters instantly
- 📄 **College Detail Pages** — Fees, placement stats, ratings, and available courses
- ⚖️ **Side-by-side Comparison** — Compare multiple colleges at once
- 🔐 **Authentication** — Signup, login, JWT sessions, bcrypt password hashing
- ❤️ **Save/Favorite Colleges** — Authenticated users can save colleges
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🗄️ **39 Colleges Seeded** — IITs, NITs, AP & Telangana colleges

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | TailwindCSS, Lucide React Icons |
| Backend | Next.js API Routes, TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | NextAuth.js (JWT + bcrypt) |
| Deployment | Vercel |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + Signup routes
│   │   ├── colleges/      # College listing + detail APIs
│   │   ├── compare/       # Compare API
│   │   └── saved/         # Favorites API
│   ├── colleges/          # College listing + detail pages
│   ├── compare/           # Compare page
│   ├── login/             # Auth pages
│   └── saved/             # Saved colleges page
├── components/            # Reusable UI components
└── lib/                   # Prisma client + Auth config
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # 39 colleges seed data
```

---

## 🗄️ Database Schema

```prisma
model User {
  id        String     @id @default(cuid())
  name      String
  email     String     @unique
  password  String
  favorites Favorite[]
}

model College {
  id        String     @id @default(cuid())
  name      String
  location  String
  overview  String
  courses   String[]
  fees      Int
  placement Int
  rating    Float
  favorites Favorite[]
}

model Favorite {
  id        String  @id @default(cuid())
  userId    String
  collegeId String
  user      User    @relation(fields: [userId], references: [id])
  college   College @relation(fields: [collegeId], references: [id])
  @@unique([userId, collegeId])
}
```

---

## 🔌 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/colleges` | List colleges with search, filter, pagination |
| GET | `/api/colleges/[id]` | Get college details |
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/saved` | Save/unsave college |
| GET | `/api/saved` | Get saved colleges |
| GET | `/api/compare` | Compare colleges |

---

## ⚡ Edge Cases Handled

- Duplicate favorites blocked at database level (unique constraint)
- Unauthenticated save attempts redirect to login
- Invalid search returns clean empty state
- All API routes have try-catch with proper HTTP status codes
- Bcrypt password hashing — plain text never stored

---

## 🚀 Getting Started

```bash
# Clone repo
git clone https://github.com/laxmanalucky090-ux/college-discovery-platform.git
cd college-discovery-platform

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env
# Add DATABASE_URL, DIRECT_URL, NEXTAUTH_URL, NEXTAUTH_SECRET

# Push schema to database
npx prisma db push

# Seed database
npx prisma db seed

# Run dev server
npm run dev
```

---

## 🌍 Environment Variables

```
DATABASE_URL=postgresql://...pooler...
DIRECT_URL=postgresql://...direct...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

---

## 👩‍💻 Author

**Salapareddi Laxmana**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/salapareddi-laxmana)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/laxmanalucky090-ux)
[![Portfolio](https://img.shields.io/badge/Portfolio-00D9FF?style=flat&logoColor=white)](https://laxmanalucky090-ux.github.io/portfolio)

---

⭐ **If you found this useful, please star the repo!**
