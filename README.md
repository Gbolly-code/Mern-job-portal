# Job Portal - MERN Stack with Firebase

A modern job portal application built with React, Vite, and Firebase Firestore for backend services.

## Features

- 🔍 Job search and filtering
- 📝 Post new job listings
- ✏️ Edit and delete your job postings
- 💰 Salary estimation page
- 📱 Responsive design with Tailwind CSS
- 🔥 Firebase Firestore for real-time data
- 🎨 Modern UI with smooth animations

## Tech Stack

- **Frontend:** React 19, React Router DOM 7
- **Styling:** Tailwind CSS
- **Backend:** Firebase Firestore
- **Form Handling:** React Hook Form
- **Build Tool:** Vite 7
- **Icons:** React Icons
- **Alerts:** SweetAlert2

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MERN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Get your Firebase configuration from Project Settings

4. **Configure Environment Variables**
   - Rename `env.example.txt` to `.env`
   - Update the file with your actual Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
MERN/
├── src/
│   ├── components/      # Reusable components
│   ├── Pages/          # Page components
│   ├── services/       # Firebase services
│   ├── sidebar/        # Sidebar filter components
│   ├── Router/         # Route configuration
│   └── firebase-config.js
├── public/             # Static assets
├── .env               # Environment variables (not in git)
├── env.example.txt    # Environment template
└── README.md
```

## Features Overview

### For Job Seekers
- Browse all available jobs
- Filter jobs by location, salary, experience level, and employment type
- View detailed job descriptions
- Search jobs by title

### For Employers
- Post new job listings
- Edit existing job posts
- Delete job listings
- View all posted jobs
- Salary estimation tool

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

The application uses environment variables for Firebase configuration. Never commit your `.env` file to version control.

## Security Notes

- Firebase API keys are safe to expose in client-side code but enable Firebase Security Rules
- Configure Firestore Security Rules to protect your data
- The `.env` file is ignored by git by default

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, email your-email@example.com or open an issue in the repository.
