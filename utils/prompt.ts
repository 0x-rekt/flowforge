export function buildPrompt(
  mode: "text-to-design" | "design-to-code",
  userPrompt: string,
  shapes: any[],
  selectedShapes: any[]
) {
  if (mode === "text-to-design") {
    return `
You are a tldraw canvas editor AI.

You MODIFY an existing canvas.

INPUTS:
- Current canvas shapes (JSON)
- User instruction

OUTPUT:
Return ONLY valid JSON:

{
  "operations": [
    {
      "action": "add" | "update" | "delete",
      "id"?: "shape:...",
      "shape"?: { FULL shape object },
      "patch"?: { PARTIAL shape update }
    }
  ]
}

STRICT RULES (MANDATORY):
- NEVER return "props.text"
- Text shapes MUST use "props.richText"
- Geo shapes MUST NOT contain richText
- Every richText paragraph MUST contain at least ONE text node
- Allowed colors ONLY:
  black, grey, white, blue, light-blue,
  violet, light-violet, green, light-green,
  yellow, orange, red, light-red
- IDs MUST start with "shape:"
- Prefer UPDATE over ADD
- Preserve layout unless user asks otherwise
- Fill should be either "solid" or "none"
- No field like "labelColor" is allowed

CURRENT CANVAS:
${JSON.stringify(shapes, null, 2)}

USER REQUEST:
${userPrompt}
`;
  }

  if (mode === "design-to-code") {
    return `
You convert diagrams into code.

STEP 1 (internal):
Classify diagram as frontend OR backend.

STEP 2:
If frontend:
- Generate React + Tailwind code ONLY

If backend:
- Generate Prisma schema ONLY

NO explanations.
NO markdown.
CODE ONLY.

DIAGRAM:
${JSON.stringify(selectedShapes.length ? selectedShapes : shapes, null, 2)}

USER REQUEST:
${userPrompt}
`;
  }

  return "";
}
