# 🎨 RAJ UI - AI-Powered Component Generator

*Powered by Google Gemini 2.5 Flash* 🤖

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rajshah9305s-projects/v0-ui-code-generation)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/gYiiHPmDD3n)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

## 🚀 Overview

An AI-powered React component generator that transforms natural language descriptions into production-ready React components with Tailwind CSS styling. Now powered by **Google Gemini 2.5 Flash** for faster, more accurate code generation!

### ✨ Features

- 🤖 **AI-Powered Generation**: Uses Google Gemini 2.5 Flash
- ⚡ **Real-time Preview**: See your components instantly
- 🎨 **Tailwind CSS**: Beautiful, responsive styling
- 📱 **Device Preview**: Test on desktop, tablet, and mobile
- 💾 **Project Management**: Save and organize your components
- 🌙 **Dark Mode**: Easy on the eyes
- 📋 **Component Templates**: Quick-start templates
- 🔄 **Live Editing**: Modify and regenerate on the fly

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0
- **AI**: Google Gemini 2.5 Flash via Vercel AI SDK
- **UI**: React 19.2.0 + Tailwind CSS 4.1.9
- **Components**: Radix UI + shadcn/ui
- **Language**: TypeScript 5
- **Package Manager**: pnpm

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd v0-ui-code-generation-main
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

The `.env.local` file is already configured with your Gemini API key:

```bash
GOOGLE_GENERATIVE_AI_API_KEY="Your_API_KEY_HERE"
```

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

1. **Enter a prompt**: Describe the component you want to create
2. **Generate**: Click the "Generate Component" button
3. **Preview**: See your component in real-time
4. **Customize**: Edit the code or regenerate with a new prompt
5. **Save**: Store your favorite components for later use

### Example Prompts

- "Create a modern pricing card with three tiers"
- "Build a contact form with validation"
- "Design a hero section with gradient background"
- "Make a product card with hover effects"

## 🤖 AI Configuration

### Current Model: Gemini 2.5 Flash

- **Context Window**: 1M tokens
- **Max Output**: 65,536 tokens
- **Temperature**: 0.7 (balanced creativity)
- **Current Limit**: 2,000 tokens

### Switch Models

Edit `app/api/generate/route.ts` to use different models:

```typescript
// Fast & Balanced (Current)
model: google("gemini-2.5-flash")

// Most Capable
model: google("gemini-2.5-pro")

// Ultra Fast
model: google("gemini-2.5-flash-lite")

// Always Latest
model: google("gemini-flash-latest")
```

See [GEMINI_SETUP.md](./GEMINI_SETUP.md) for detailed configuration options.

## 📚 Documentation

- **[GEMINI_SETUP.md](./GEMINI_SETUP.md)** - Complete Gemini AI setup guide
- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Migration details from OpenAI to Gemini

## 🌐 Deployment

### Vercel Deployment

Your project is live at:

**[https://vercel.com/rajshah9305s-projects/v0-ui-code-generation](https://vercel.com/rajshah9305s-projects/v0-ui-code-generation)**

To deploy updates:

1. Push changes to your repository
2. Vercel will automatically deploy
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` to Vercel environment variables

### Environment Variables for Production

In your Vercel project settings, add:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

## 🔧 Development

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Project Structure

```
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # Gemini AI API endpoint
│   ├── page.tsx              # Main application
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
├── lib/                      # Utility functions
├── public/                   # Static assets
└── styles/                   # Global styles
```

## 🤝 Contributing

This project is synced with [v0.app](https://v0.app). Continue building at:

**[https://v0.app/chat/gYiiHPmDD3n](https://v0.app/chat/gYiiHPmDD3n)**

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app)
- Powered by [Google Gemini](https://ai.google.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com)

---

**Made with ❤️ using Google Gemini AI**
