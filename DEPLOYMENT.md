# Deployment Guide for Well & Wilde

## Quick Deployment to Vercel

### Step 1: Upload to GitHub
1. Create a new repository on GitHub
2. Upload all project files (the entire folder structure)
3. Make sure to include the `vercel.json` configuration file

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration
5. Add these environment variables in Vercel dashboard:

```
SMTP_HOST=mail.smtp2go.com
SMTP_PORT=2525
SMTP_USER=avril1
SMTP_PASS=ireland*2022
```

### Step 3: Configure Email (Important!)
After deployment, test the email subscription by visiting your live site and subscribing with a test email. Check if:
- Emails are being collected (you can check via API endpoint `/api/subscribers`)
- Notification emails are sent to hello@wellandwilde.ie
- Welcome emails are sent to new subscribers

If emails aren't working, adjust the SMTP_PORT to 80 in Vercel environment variables.

## What's Included

✅ **Frontend**: Premium black & white design with authentic brand images
✅ **Backend**: Email subscription API with validation
✅ **Email System**: SMTP2GO integration for notifications
✅ **Database**: In-memory storage (ready for PostgreSQL upgrade)
✅ **Responsive Design**: Works on all devices

## API Endpoints

- `POST /api/subscribe` - Subscribe to newsletter
- `GET /api/subscribers` - View all subscribers (admin)
- `GET /api/health` - Health check

## Domain Setup

Once deployed, you can:
1. Use the provided `.vercel.app` domain
2. Add a custom domain through Vercel dashboard
3. Configure DNS to point to your Vercel deployment

Your Well & Wilde landing page will be live and collecting emails immediately after deployment!