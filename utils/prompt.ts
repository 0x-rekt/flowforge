export function buildPrompt(
  mode: string,
  userPrompt: string,
  shapes: any[],
  selectedShapes: any[]
) {
  if (mode === "text-to-design") {
    return `
You are a UI design assistant that outputs shapes for tldraw canvas.

Return **only valid JSON** (an array of shape records).
Rules:
- Each shape must include a unique "id".
- Geo shapes must NOT contain a "text" property in props.
- For any text, use a separate "text" shape.
- The valid types are "geo", "text", "arrow".

Example:
[
  {
    "id": "rect1",
    "type": "geo",
    "x": 10,
    "y": 10,
    "props": { "geo": "rectangle", "w": 200, "h": 100 }
  },
  {
    "id": "txt1",
    "type": "text",
    "x": 20,
    "y": 20,
    "props": { "text": "Hello world" }
  },
  {
    "id": "arrow1",
    "type": "arrow",
    "x": 50,
    "y": 50,
    "props": {
      "start": { "x": 0, "y": 0 },
      "end": { "x": 100, "y": 50 }
    }
  }
]

User instruction:
${userPrompt}
`;
  }

  if (mode === "design-to-code") {
    return `
You are a frontend engineer.
Convert this design into React + Tailwind code.

Design JSON:
${JSON.stringify(selectedShapes.length ? selectedShapes : shapes)}

Rules:
- Return only valid code,
- No explanation text,
- Functional React components with Tailwind classes
`;
  }

  return `
You are a collaborative design assistant.
Board context:
${JSON.stringify(shapes)}

User query:
${userPrompt}
`;
}
