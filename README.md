# 🎨 FlowForge

**FlowForge** is an AI-powered, real-time collaborative whiteboard platform that transforms ideas into diagrams and diagrams into production-ready code. Built for modern teams who want to accelerate from concept to implementation.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748)](https://www.prisma.io/)
[![tldraw](https://img.shields.io/badge/tldraw-4.2.1-FF6347)](https://tldraw.dev/)

---

## ✨ Features

### 🤖 AI-Powered Diagramming

- **Text-to-Diagram**: Convert natural language descriptions into complex system architectures instantly using Google's Gemini AI
- **Diagram-to-Code**: Generate production-ready React or Node.js boilerplate from your visual diagrams
- **Contextual AI Assistant**: In-canvas AI chat that understands your diagram context and assists with design decisions

### 👥 Real-Time Collaboration

- **Multi-User Editing**: Built on tldraw's powerful CRDT-based synchronization for seamless team collaboration
- **Live Cursors**: See team members' cursors and selections in real-time
- **Member Management**: Invite team members to boards via email with role-based access

### 🎯 Professional Canvas

- **Infinite Canvas**: Unlimited space for your ideas with smooth pan and zoom
- **Rich Shape Library**: Geo shapes, text boxes, arrows, sticky notes, and more
- **Smart Shapes**: Auto-routing connectors and alignment guides
- **Export Options**: Save your work and export diagrams

### 🔐 Secure Authentication

- **OAuth Integration**: Sign in with Google or GitHub
- **Session Management**: Secure session handling with Better Auth
- **User Profiles**: Personalized avatars and user information

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (recommended package manager)
- **PostgreSQL** database
- **Google Cloud** account (for OAuth and Gemini AI)
- **GitHub** OAuth app (optional, for GitHub sign-in)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/0x-rekt/flowforge.git
   cd flowforge
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/flowforge"

   # Better Auth
   BETTER_AUTH_URL="http://localhost:3000"
   BETTER_AUTH_SECRET="your-super-secret-key-min-32-chars"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # GitHub OAuth (optional)
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"

   # Google Gemini AI
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Set up the database**

   ```bash
   pnpm prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **tldraw** - Infinite canvas and drawing primitives
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **Better Auth** - Modern authentication solution

### AI & Real-Time

- **Google Gemini 2.5 Flash** - AI model for text-to-diagram and diagram-to-code
- **@tldraw/sync** - CRDT-based real-time synchronization
- **Axios** - HTTP client

### Developer Experience

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **PostCSS** - CSS transformations

---

## 📁 Project Structure

```
flowforge/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   └── sign-in/         # Sign-in page
│   ├── api/                 # API routes
│   │   ├── ai/             # AI endpoints (text-to-diagram, diagram-to-code)
│   │   ├── auth/           # Better Auth API
│   │   └── whiteboard/     # Whiteboard CRUD operations
│   ├── board/[id]/         # Individual board view
│   ├── dashboard/          # User dashboard
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/              # React components
│   ├── ui/                 # Reusable UI components (Radix)
│   ├── AIChatPanel.tsx     # AI assistant panel
│   ├── BoardCanvas.tsx     # Main canvas component
│   ├── BoardCard.tsx       # Dashboard board card
│   └── ...                 # Other components
├── lib/                     # Utility libraries
│   ├── auth.ts             # Better Auth configuration
│   ├── prisma.ts           # Prisma client instance
│   └── utils.ts            # Utility functions
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Database migrations
├── utils/                   # Helper utilities
│   └── prompt.ts           # AI prompt builders
└── public/                  # Static assets
```

---

## 🎯 Core Functionality

### Creating a Whiteboard

1. Sign in with Google or GitHub
2. Navigate to your dashboard
3. Click "Create New Board"
4. Start drawing or use AI commands

### Using AI Features

**Text-to-Diagram:**

1. Click the AI chat icon in the canvas
2. Describe your diagram (e.g., "Create a microservices architecture with API gateway, 3 services, and a database")
3. Watch as AI generates the diagram

**Diagram-to-Code:**

1. Draw or select your diagram components
2. Open AI chat and request code generation
3. Get production-ready React or Node.js boilerplate

### Collaborating with Team

1. Open a whiteboard
2. Click the "Add Member" button (user icon)
3. Enter team member's email
4. They'll receive access to the board

---

## 🗄️ Database Schema

### Core Models

- **User**: User accounts with OAuth profiles
- **Session**: Active user sessions
- **Account**: OAuth provider accounts
- **WhiteBoard**: Canvas boards with JSON content
- **WhiteBoardMember**: Board sharing and permissions

See [prisma/schema.prisma](prisma/schema.prisma) for the complete schema.

---

## 🔧 Configuration

### Prisma Configuration

The project uses a custom Prisma client output directory:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}
```

After schema changes, run:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name your_migration_name
```

### Environment Setup

**Google OAuth Setup:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**Gemini AI Setup:**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key for Gemini
3. Add to `.env` as `GEMINI_API_KEY`

---

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma migrate dev        # Run migrations in development
pnpm prisma generate           # Generate Prisma Client
pnpm prisma studio            # Open Prisma Studio GUI
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Database Hosting

Recommended PostgreSQL hosting providers:

- **Vercel Postgres** - Integrated with Vercel
- **Neon** - Serverless Postgres
- **Supabase** - Open-source Firebase alternative
- **Railway** - Simple infrastructure

---

## 🛠️ Development Tips

### Running Migrations

```bash
# Create a new migration
pnpm prisma migrate dev --name add_new_feature

# Reset database (⚠️ deletes all data)
pnpm prisma migrate reset

# Deploy migrations to production
pnpm prisma migrate deploy
```

### Debugging

- **Prisma Studio**: Visual database browser

  ```bash
  pnpm prisma studio
  ```

- **Next.js Dev Tools**: Built-in React DevTools support

### Code Quality

The project uses ESLint for code quality:

```bash
pnpm lint              # Run ESLint
```

---

## 🎨 Customization

### Styling

The project uses Tailwind CSS v4 with custom configuration. Modify styles in:

- `app/globals.css` - Global styles and CSS variables
- `components/ui/` - Component-specific styles

### AI Prompts

Customize AI behavior by editing prompt templates in:

- `utils/prompt.ts` - Text-to-diagram and diagram-to-code prompts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **tldraw** - For the incredible infinite canvas library
- **Better Auth** - For the modern authentication solution
- **Vercel** - For Next.js and hosting platform
- **Google** - For Gemini AI API
- **Prisma** - For the amazing ORM

---

Built with ❤️ using Next.js, AI, and the power of collaboration.
