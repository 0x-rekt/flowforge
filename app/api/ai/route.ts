import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { buildPrompt } from "@/utils/prompt";

const createShapeId = () => `shape:${crypto.randomUUID()}`;

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function toRichText(text: string) {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text }],
      },
    ],
  };
}

function normalizeShapes(aiShapes: any[]) {
  const idMap = new Map<string, string>();

  aiShapes.forEach((s: any) => {
    idMap.set(s.id ?? crypto.randomUUID(), createShapeId());
  });

  return aiShapes
    .map((shape: any) => {
      const id = idMap.get(shape.id);

      if (shape.type === "geo") {
        return {
          id,
          type: "geo",
          x: shape.x ?? 0,
          y: shape.y ?? 0,
          props: {
            geo: shape.props?.geo ?? "rectangle",
            w: shape.props?.w ?? 200,
            h: shape.props?.h ?? 100,
          },
        };
      }

      if (shape.type === "text") {
        return {
          id,
          type: "text",
          x: shape.x ?? 0,
          y: shape.y ?? 0,
          props: {
            autoSize: true,
            size: "m",
            scale: 1,
            textAlign: "start",
            richText: toRichText(shape.props?.text ?? ""),
          },
        };
      }

      if (shape.type === "arrow") {
        const start = shape.props?.start || { x: 0, y: 0 };
        const end = shape.props?.end || { x: 100, y: 50 };
        return {
          id,
          type: "arrow",
          x: shape.x ?? 0,
          y: shape.y ?? 0,
          props: {
            start: start.id ? { ...start, id: idMap.get(start.id) } : start,
            end: end.id ? { ...end, id: idMap.get(end.id) } : end,
          },
        };
      }

      return null;
    })
    .filter(Boolean);
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, context, mode } = await req.json();

    if (mode === "text-to-design") {
      const systemPrompt = buildPrompt(mode, prompt, context, []);

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        config: { systemInstruction: systemPrompt, temperature: 0.2 },
        contents: [
          { role: "user", parts: [{ text: `Create a design for: ${prompt}` }] },
        ],
      });

      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        return NextResponse.json(
          { error: "Empty AI response" },
          { status: 500 }
        );
      }

      const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/);
      let jsonText = jsonMatch ? jsonMatch[1] : rawText;

      const start = jsonText.indexOf("[");
      const end = jsonText.lastIndexOf("]");
      if (start !== -1 && end !== -1 && end > start) {
        jsonText = jsonText.substring(start, end + 1);
      }

      const aiShapes = JSON.parse(jsonText);

      const safeShapes = normalizeShapes(aiShapes);

      return NextResponse.json({ shapes: safeShapes }, { status: 200 });
    }

    if (mode === "design-to-code") {
      const systemPrompt = buildPrompt(mode, prompt, context, []);
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        config: { systemInstruction: systemPrompt, temperature: 0.2 },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Convert the following design into React + Tailwind:\n\n${context}`,
              },
            ],
          },
        ],
      });

      return NextResponse.json(
        { code: result.candidates?.[0]?.content?.parts?.[0]?.text || "" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "AI failed to generate content" },
      { status: 500 }
    );
  }
};
