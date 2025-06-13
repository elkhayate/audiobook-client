# Audiobook Client

A modern web application for converting text to speech and managing audiobooks. Built with Next.js, TypeScript, and NextUI.

## Features

### Authentication
- Secure user authentication with Supabase
- Email/password login
- Secure password reset flow with email verification
- Protected routes with automatic redirects
- Session management with PKCE flow
- Automatic session refresh

### User Settings
- Profile management (name, email)
- Theme customization (light/dark/system)
- Audio quality settings (standard/high/premium)
- Voice selection with preview
- Account deletion

### Library Management
- View all converted audio files
- Delete files with confirmation
- File metadata display
- Responsive grid layout
- Dark mode support

### Audio Conversion
- Text to speech conversion
- Multiple voice options
- Voice preview functionality
- Quality settings
- Progress tracking

### UI/UX Features
- Modern, responsive design
- Dark/Light mode support
- Toast notifications
- Loading states
- Error handling
- Confirmation modals
- Smooth animations
- Accessible components

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: NextUI
- **Authentication**: Supabase Auth with PKCE
- **State Management**: React Query
- **Form Handling**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Notifications**: React Toastify
- **Icons**: Lucide Icons


## Authentication Flow

### Password Reset Process
1. User requests password reset from the forgot-password page
2. System sends a secure reset link to user's email
3. User clicks the link and is taken to the reset-password page
4. User sets a new password
5. System verifies the reset token and updates the password
6. User is redirected to login to sign in with new credentials

### Session Management
- Secure PKCE (Proof Key for Code Exchange) flow
- Automatic session refresh
- Protected route handling
- Session persistence across page reloads
 
### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Supabase account
 
## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/        # Login page
│   │   ├── signup/       # Signup page
│   │   └── layout.tsx    # Auth layout
│   ├── library/          # Library page
│   ├── settings/         # Settings page
│   ├── forgot-password/  # Password reset request
│   ├── reset-password/   # Password reset form
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── layout/          # Layout components
│   ├── ui/              # UI components
│   └── providers/       # Context providers
├── lib/                 # Utility functions
│   ├── auth/           # Authentication
│   ├── query/          # React Query
│   └── supabase/       # Supabase client
└── types/              # TypeScript types
```
