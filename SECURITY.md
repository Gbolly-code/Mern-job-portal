# Security Guide 🔒

## ⚠️ IMPORTANT: Exposed Secrets Fixed

This repository previously had Firebase API keys exposed in the source code. These have been removed and replaced with environment variables.

---

## 🔐 Current Security Setup

### Environment Variables
All sensitive Firebase credentials are now stored in a `.env` file that is **NOT** tracked by git.

### What's Protected:
- ✅ Firebase API Key
- ✅ Firebase Auth Domain
- ✅ Firebase Project ID
- ✅ Firebase Storage Bucket
- ✅ Firebase Messaging Sender ID
- ✅ Firebase App ID
- ✅ Firebase Measurement ID

---

## 🚀 Setup Instructions for Developers

### 1. Create Your `.env` File

Copy the example file:
```bash
# Windows (PowerShell)
Copy-Item env.example.txt .env

# macOS/Linux
cp env.example.txt .env
```

### 2. Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click on **Settings (⚙️)** → **Project settings**
4. Scroll down to **Your apps** section
5. Click on **SDK setup and configuration**
6. Copy all the config values

### 3. Update Your `.env` File

Open `.env` and replace the placeholder values:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Verify Setup

The app will throw an error if `.env` is missing or incomplete:
```
Missing Firebase configuration. Please create a .env file with your Firebase credentials.
```

---

## 🛡️ Security Best Practices

### DO ✅
- Keep your `.env` file locally only
- Use different Firebase projects for development and production
- Rotate your API keys if they were exposed
- Set up Firebase Security Rules
- Use Firebase App Check for additional security
- Review and limit Firebase API key restrictions in Google Cloud Console

### DON'T ❌
- Never commit `.env` to git
- Never share your `.env` file publicly
- Never hardcode credentials in source code
- Never expose credentials in error messages
- Never commit secrets to public repositories

---

## 🔄 What If My Keys Were Exposed?

If your Firebase keys were exposed in git history:

### 1. Rotate Your Firebase API Key
```bash
# Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials

# Find your Firebase API key
# Create a new one and delete the old one
```

### 2. Update Your `.env` File
Replace with the new API key.

### 3. Update Firebase Security Rules
Ensure your Firestore rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lock down all access by default
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Only allow authenticated users to read/write jobs
    match /jobs/{jobId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Authenticated write
    }
  }
}
```

### 4. Enable Firebase App Check (Recommended)
App Check helps protect your backend resources from abuse:
1. Go to Firebase Console → App Check
2. Register your app
3. Enable enforcement for Firestore

---

## 📋 Checklist for New Team Members

- [ ] Clone the repository
- [ ] Create `.env` file from `env.example.txt`
- [ ] Get Firebase credentials from team lead
- [ ] Add values to `.env`
- [ ] Verify `.env` is in `.gitignore`
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Confirm app loads without errors

---

## 🔍 Verifying Your Setup

### Check .gitignore
```bash
cat .gitignore | grep .env
```

Should show:
```
.env
.env.local
.env.production
```

### Verify .env is NOT tracked
```bash
git status
```

`.env` should **NOT** appear in the list of files.

### Test the App
```bash
npm run dev
```

If you see errors about missing Firebase config, check your `.env` file.

---

## 🆘 Troubleshooting

### Error: "Missing Firebase configuration"
- ✅ Ensure `.env` file exists in project root
- ✅ Check all variables are set (no empty values)
- ✅ Restart your dev server after creating/editing `.env`

### Error: "Firebase: Error (auth/invalid-api-key)"
- ✅ Verify API key is correct in `.env`
- ✅ Check for extra spaces or quotes
- ✅ Ensure you copied the entire key

### App works locally but fails in deployment
- ✅ Add environment variables to your hosting platform
- ✅ Vercel: Add in Project Settings → Environment Variables
- ✅ Netlify: Add in Site Settings → Environment Variables
- ✅ GitHub Pages: Use GitHub Secrets for Actions

---

## 📞 Contact

If you need Firebase credentials or have security concerns, contact the repository maintainer.

**Never share credentials via:**
- ❌ Email
- ❌ Slack/Discord messages
- ❌ Issue comments
- ❌ Pull request descriptions

**Use secure methods:**
- ✅ Encrypted password managers
- ✅ Secure team vaults (1Password, LastPass Teams)
- ✅ Direct encrypted communication

---

## 🔐 Additional Resources

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [OWASP Security Practices](https://owasp.org/www-project-top-ten/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Last Updated:** December 2024  
**Security Level:** Enhanced ✅

