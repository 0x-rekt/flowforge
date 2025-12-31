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
You are an expert system that converts visual diagrams into code.

Your job has TWO STEPS.

────────────────────────
STEP 1 — CLASSIFY THE DIAGRAM
────────────────────────

Analyze the diagram and decide ONE of the following intents:

- "frontend" → UI layout, wireframe, component skeleton
- "backend" → database schema, entities, relations
- "unknown" → cannot determine clearly

Classification rules:
- Presence of "(PK)", "(FK)", arrows between tables → backend
- Presence of buttons, cards, navbars, inputs → frontend
- If both appear, choose the dominant one

DO NOT output the classification yet.
Use it internally.

────────────────────────
STEP 2 — GENERATE CODE
────────────────────────

If intent = "backend":
- Infer database entities
- Detect primary & foreign keys
- Generate Prisma schema (preferred)
- NO frontend code
- NO JSX
- NO SVG
- Output CODE ONLY

If intent = "frontend":
- Interpret diagram as UI skeleton
- Generate React + Tailwind code
- Functional components
- NO backend logic
- Output CODE ONLY

If intent = "unknown":
- Generate NOTHING
- Return an empty string

User instruction:
"${userPrompt}"

Diagram JSON:
${JSON.stringify(selectedShapes.length ? selectedShapes : shapes, null, 2)}
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
