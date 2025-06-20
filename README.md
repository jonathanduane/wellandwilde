# Well & Wilde - Coming Soon Landing Page

A premium wellness company landing page built with React, TypeScript, and Express.js.

## Features

- Black and white premium design aesthetic
- Email newsletter subscription system
- Authentic brand photography integration
- Responsive design optimized for all devices
- Backend API for email collection and storage

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (production-ready for PostgreSQL)
- **Email**: SMTP integration ready
- **Build**: Vite for frontend, esbuild for backend

## Deployment to Vercel

1. Push this code to a GitHub repository
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect the configuration and deploy

## Environment Variables

For production deployment, set these environment variables in Vercel:

```
NODE_ENV=production
SMTP_HOST=mail.smtp2go.com
SMTP_PORT=80
SMTP_USER=avril1
SMTP_PASS=ireland*2022
```

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `/client` - React frontend application
- `/server` - Express.js backend API
- `/shared` - Shared TypeScript schemas
- `/attached_assets` - Brand images and assets

The application serves both frontend and backend from a single Express server, making it perfect for Vercel deployment.