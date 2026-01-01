import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { buildPrompt } from "@/utils/prompt";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, context, mode } = await req.json();

    const systemPrompt = buildPrompt(mode, prompt, context ?? [], []);

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      config: { systemInstruction: systemPrompt, temperature: 0.2 },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    // extract JSON safely
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonText = jsonMatch ? jsonMatch[1] : rawText;

    const parsed = JSON.parse(jsonText);

    if (mode === "text-to-design") {
      if (!Array.isArray(parsed.operations)) {
        return NextResponse.json(
          { error: "Invalid operations format" },
          { status: 400 }
        );
      }

      return NextResponse.json({ operations: parsed.operations });
    }

    return NextResponse.json({ code: parsed || "" });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
};
