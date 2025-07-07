# Habitly: The Habit Tracking App 📱

Habitly is a sleek and powerful habit tracking android application built with React Native and Expo. It helps users build better routines, track progress, and stay consistent — all through a beautifully designed and intuitive Android experience.


## ✨ Features

### 🔐 Authentication
- Secure user authentication with Appwrite backend
- User registration and login functionality
- Persistent session management

### 📋 Habit Management
- **Create Habits**: Add new habits with custom titles, descriptions, and frequencies
- **Multiple Frequencies**: Support for daily, weekly, and monthly habits
- **Swipe Actions**: Intuitive swipe gestures to complete or delete habits
- **Real-time Updates**: Live synchronization across devices

### 🔥 Streak Tracking
- **Current Streaks**: Track your ongoing habit streaks
- **Best Streaks**: View your personal best streak records
- **Total Completions**: See how many times you've completed each habit
- **Leaderboard**: Rank your habits by their best streaks

### 🎨 User Experience
- **Onboarding Flow**: Beautiful animated introduction for new users
- **Modern UI**: Clean, intuitive interface with Material Design
- **Responsive Design**: Optimized for both iOS and Android
- **Smooth Animations**: Lottie animations for enhanced user experience

### 📊 Progress Visualization
- **Visual Feedback**: Clear indicators for completed habits
- **Progress Tracking**: Monitor your habit completion over time
- **Achievement System**: Celebrate your consistency and progress

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Appwrite (Backend-as-a-Service)
- **Navigation**: Expo Router with file-based routing
- **UI Components**: React Native Paper
- **Animations**: Lottie React Native
- **State Management**: React Context API
- **TypeScript**: Full type safety
- **Real-time**: Appwrite Realtime subscriptions

## 🎯 Key Features Explained

### Swipe Gestures
- **Swipe Right**: Mark habit as completed
- **Swipe Left**: Delete habit
- Visual feedback with icons and colors

### Real-time Synchronization
The app uses Appwrite's real-time subscriptions to instantly sync data across devices:
- Habit creation/updates/deletion
- Completion tracking
- Streak calculations

### Streak Algorithm
The streak calculation considers:
- Consecutive days of completion
- Best streak tracking
- Total completion count
- Automatic streak reset on missed days



## 📁 Project Structure

```
habit-tracking-mobile-app/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home screen with habit list
│   │   ├── add-habit.tsx  # Add new habit screen
│   │   ├── streaks.tsx    # Streak tracking screen
│   │   └── _layout.tsx    # Tab layout configuration
│   ├── auth.tsx           # Authentication screen
│   ├── onboardingScreen.tsx # Onboarding flow
│   └── _layout.tsx        # Root layout
├── lib/                   # Utility libraries
│   ├── appwrite.ts        # Appwrite client configuration
│   ├── auth-context.tsx   # Authentication context
│   └── onboarding-context.tsx # Onboarding state management
├── types/                 # TypeScript type definitions
│   └── databases.type.ts  # Database schema types
├── assets/                # Static assets
│   ├── animations/        # Lottie animation files
│   ├── images/           # App icons and images
│   └── fonts/            # Custom fonts
└── theme.ts              # App theme configuration
```




**Built with ❤️ by Abhijeet**
