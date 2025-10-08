# Deployment Guide - Vercel 🚀

## Quick Deployment to Vercel

### Prerequisites
- ✅ GitHub repository with your code
- ✅ Vercel account (free tier is fine)
- ✅ Firebase credentials ready

---

## 📋 Step-by-Step Guide

### 1. Add Environment Variables to Vercel

**IMPORTANT:** Do this BEFORE deploying!

1. Go to [vercel.com](https://vercel.com) and sign in
2. Import your GitHub repository: `Gbolly-code/Mern-job-portal`
3. **BEFORE clicking Deploy**, scroll down to **"Environment Variables"**
4. Add these 7 variables:

```
Variable Name                       | Value
-----------------------------------|----------------------------------------
VITE_FIREBASE_API_KEY              | AIzaSyDd5dxECFB_ryMgpz9oHi73__fzQ6n-W7E
VITE_FIREBASE_AUTH_DOMAIN          | jobportal-b4655.firebaseapp.com
VITE_FIREBASE_PROJECT_ID           | jobportal-b4655
VITE_FIREBASE_STORAGE_BUCKET       | jobportal-b4655.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID  | 996771434213
VITE_FIREBASE_APP_ID               | 1:996771434213:web:df6e5f9430dd86383f4e0c
VITE_FIREBASE_MEASUREMENT_ID       | G-39TB37XN8Y
```

5. For each variable, make sure to check:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Click **"Deploy"**

---

### 2. If You Already Deployed (Got an Error)

If you already tried deploying and got an error:

1. Go to your project on Vercel
2. Click **"Settings"** (top navigation)
3. Click **"Environment Variables"** (left sidebar)
4. Add all 7 variables listed above
5. Click **"Save"** for each one
6. Go to **"Deployments"** tab
7. Find the failed deployment
8. Click the **three dots (⋮)** on the right
9. Click **"Redeploy"**

---

### 3. Verify Deployment

Once deployed:

1. Click on your deployment URL (e.g., `your-project.vercel.app`)
2. The app should load without errors
3. Test the search functionality
4. Test creating/viewing jobs
5. Check browser console for any errors

---

## 🔧 Troubleshooting

### Build Fails with "Missing Firebase configuration"

**Cause:** Environment variables not set in Vercel

**Fix:**
1. Go to Settings → Environment Variables
2. Add all 7 VITE_FIREBASE_* variables
3. Redeploy

### Build Succeeds but App Shows Error

**Cause:** Variables might be missing measurementId or other optional fields

**Fix:**
1. Verify all 7 variables are present
2. Check for typos in variable names (must be exact)
3. Ensure no extra spaces in values

### 404 Errors on Refresh

**Cause:** SPA routing not configured

**Fix:**
- Already handled in `vercel.json`
- If issue persists, check that `vercel.json` is in repository root

---

## 🎨 Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS instructions
4. SSL is automatic!

---

## 🔄 Auto-Deploy

Once set up, Vercel will automatically deploy when you:
- Push to main branch
- Merge a pull request
- Update via GitHub

---

## 📊 Project Settings Checklist

After deployment, verify these settings:

### General
- ✅ Framework Preset: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

### Environment Variables
- ✅ All 7 VITE_FIREBASE_* variables present
- ✅ Applied to Production, Preview, Development
- ✅ No syntax errors or extra spaces

### Domains
- ✅ `.vercel.app` domain works
- ✅ Custom domain (if added) works
- ✅ HTTPS enabled (automatic)

---

## 🌐 Live URL

After deployment, your app will be available at:
```
https://your-project-name.vercel.app
```

Or your custom domain if configured.

---

## 📈 Portfolio Addition

### What to Include

**Project Name:** MERN Job Portal

**Description:**
> A full-stack job portal application built with React and Firebase. Features include real-time job listings, advanced search with autocomplete, interactive job cards, and comprehensive job management. Implements secure environment variable management and modern deployment practices.

**Technologies:**
- React 19
- Firebase Firestore
- Vite
- Tailwind CSS
- React Router DOM
- SweetAlert2

**Features to Highlight:**
- ✨ Real-time job search with autocomplete
- 🔍 Multi-field search (title, company, location, skills)
- 🎨 Interactive UI with hover effects
- 🔐 Secure credential management
- 📱 Fully responsive design
- 🚀 Optimized Vercel deployment

**Live Demo:** [Your Vercel URL]

**Source Code:** [GitHub Repository]

---

## 🎯 Advanced: Multiple Environments

### Development
Already configured via `.env` file

### Staging (Optional)
1. Create a `staging` branch in GitHub
2. In Vercel, go to Settings → Git
3. Add `staging` branch
4. Configure separate environment variables if needed

### Production
Main branch automatically deploys to production

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure `.env` file exists locally for development

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables added to Vercel
- [ ] Build succeeds without errors
- [ ] App loads on Vercel URL
- [ ] Search functionality works
- [ ] Job creation/editing works
- [ ] All pages accessible
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Firebase security rules configured
- [ ] Ready to add to portfolio!

---

**Your Job Portal is production-ready! 🎉**

Share your live URL and showcase your work!

