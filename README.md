# College Discovery & Comparison Platform

A full-stack, highly scalable academic portal built using **Next.js 15 (App Router)**, **Prisma ORM**, and **PostgreSQL**. The platform allows prospective students to search, filter, shortlist, and dynamically compare elite higher-education institutions side-by-side using real-time relational analytics.

## 🚀 Key Architectural Features

* **Dynamic Catalog Search:** Real-time search filters querying a PostgreSQL database instantly by location, stream, fees, and ranking metrics.
* **Synchronized Comparison Matrix:** A grid interface enabling cross-examination of tuition structures and placement numbers.
* **Secure Auth Gateway:** Built using NextAuth.js for session tracking, password encryption, and user-specific interactive state retention.
* **Personalized Dashboard:** Authenticated user shortlists stored seamlessly inside relational schema maps.

## 🛠️ Tech Stack & Systems Architecture

* **Framework:** Next.js 15 (React 19, TypeScript)
* **Database Layer:** PostgreSQL instance managed via Prisma ORM
* **Styling Engine:** Tailwind CSS with Lucide React Icons
* **Authentication:** NextAuth.js (Session state processing)

## 📦 Local Installation Guide

1. Clone the repository and install dependencies:
```bash
   npm install