import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt: `You are an expert React developer. Generate a React component based on the following description. 
      
Requirements:
- Use React functional components with hooks
- Use Tailwind CSS for styling
- Make it responsive and accessible
- Include proper prop types if needed
- Export the component as "Component"
- Only return the JavaScript/JSX code, no markdown or explanations
- Use modern React patterns

User's request: ${prompt}

Generate the complete component code:`,
      temperature: 0.7,
      maxOutputTokens: 2000,
    })

    // Extract code from response (remove any markdown formatting if present)
    let code = text.trim()

    // Remove markdown code blocks if present
    if (code.startsWith("```")) {
      code = code.replace(/```(?:jsx?|tsx?|javascript|typescript)?\n?/g, "").replace(/```\s*$/g, "")
    }

    console.log("[v0] Generated code successfully for user:", userId)

    return Response.json({ code })
  } catch (error) {
    console.error("[v0] Error generating code:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    return Response.json({ error: "Failed to generate code. Please try again." }, { status: 500 })
  }
}
