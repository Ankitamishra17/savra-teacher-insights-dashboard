# Teacher Insights Dashboard

A full-stack analytics dashboard that converts teacher activity data into meaningful insights for school administrators.

## Problem Statement

School administrators need visibility into teacher productivity and engagement.

This system provides:

- Total lessons, quizzes, and assessments per teacher
- Weekly activity trends, Class-wise Breakdown (chart visualization)
- Per-teacher activity analysis
- Duplicate-safe data handling

## Architecture Overview

### Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- Recharts (Data Visualization)
- Axios

**Backend**

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

**Database**

- PostgreSQL with unique constraints

## Clone the Repository

To download this project locally, run:

```bash
git clone https://github.com/Ankitamishra17/savra-teacher-insights-dashboard.git

cd savra-teacher-insights-dashboard

**Setup Instructions Backend**
cd backend
npm install
npm run dev

**Setup Instructions Frontend**
cd frontend
npm install
npm run dev

```

🚀 Future Scalability Improvements

    Add database indexing for faster queries
    Introduce Redis caching
    Implement advanced filters 
    Add AI-generated insights
    Dockerize for production deployment
