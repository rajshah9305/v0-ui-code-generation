# 🤖 Google Gemini AI Integration Guide

This project now uses **Google Gemini AI** for generating React components!

## 🎯 Current Configuration

- **AI Provider**: Google Gemini
- **Model**: `gemini-2.5-flash`
- **SDK**: Vercel AI SDK with `@ai-sdk/google`

## 📋 Setup Instructions

### 1. Environment Variables

The API key is already configured in `.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyDoJfTNmTCQydkjcaSGNoiZCpoKVhfwrAM
```

### 2. Start the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## 🚀 Available Gemini Models

You can switch to different Gemini models by changing the model name in `app/api/generate/route.ts`:

### Recommended Models:

| Model | Description | Context | Best For |
|-------|-------------|---------|----------|
| `gemini-2.5-flash` | ⚡ Fast & Stable | 1M tokens | **Current** - Best balance |
| `gemini-2.5-pro` | 🧠 Most Capable | 1M tokens | Complex components |
| `gemini-flash-latest` | 🔄 Always Latest | 1M tokens | Auto-updates |
| `gemini-2.5-flash-lite` | 💨 Ultra Fast | 1M tokens | Simple components |

### How to Change Models:

Edit `app/api/generate/route.ts`:

```typescript
const { text } = await generateText({
  model: google("gemini-2.5-pro"), // Change this line
  prompt: `...`,
  temperature: 0.7,
  maxTokens: 2000,
})
```

## 🔧 Advanced Configuration

### Adjust Temperature (Creativity)

```typescript
temperature: 0.7  // Default (balanced)
// 0.0 = More deterministic
// 1.0 = More creative
// 2.0 = Maximum creativity
```

### Adjust Token Limit

```typescript
maxTokens: 2000  // Default
// Increase for larger components
// Max: 65536 for gemini-2.5-flash
```

### Add Safety Settings (Optional)

```typescript
import { google } from "@ai-sdk/google"

const { text } = await generateText({
  model: google("gemini-2.5-flash", {
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  }),
  // ... rest of config
})
```

## 📊 Model Comparison

### Gemini 2.5 Flash (Current)
- ✅ Fast response times
- ✅ Cost-effective
- ✅ 1M token context window
- ✅ Stable release
- ✅ Thinking capability

### Gemini 2.5 Pro
- ✅ Superior reasoning
- ✅ Better code quality
- ✅ 1M token context window
- ⚠️ Slightly slower
- ⚠️ Higher cost

### Gemini Flash Latest
- ✅ Always up-to-date
- ✅ Latest improvements
- ⚠️ May have breaking changes

## 🔐 Security Notes

⚠️ **Important**: The `.env.local` file contains your actual API key and is already in `.gitignore`. Never commit this file to version control!

For production deployment on Vercel:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add: `GOOGLE_GENERATIVE_AI_API_KEY` with your API key

## 🐛 Troubleshooting

### Error: "API key not found"
- Check that `.env.local` exists in the root directory
- Restart the dev server after adding environment variables

### Error: "Model not found"
- Verify the model name is correct
- Check available models in `rr.md` file

### Error: "Rate limit exceeded"
- Gemini has generous free tier limits
- Consider upgrading to paid tier for production
- Implement request throttling if needed

## 📚 Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Get API Key](https://aistudio.google.com/app/apikey)
- [Pricing Information](https://ai.google.dev/pricing)

## 🎨 Features

The AI generates:
- ✅ React functional components with hooks
- ✅ Tailwind CSS styling
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Modern React patterns
- ✅ Clean, production-ready code

## 💡 Tips

1. **Be Specific**: More detailed prompts = better components
2. **Iterate**: Regenerate if the first result isn't perfect
3. **Combine**: Use templates as starting points
4. **Test**: Always preview components before using in production

---

**Migration Complete!** 🎉 Your app is now powered by Google Gemini AI.

