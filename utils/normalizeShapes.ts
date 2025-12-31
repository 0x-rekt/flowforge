const createShapeId = () => `shape:${crypto.randomUUID()}`;

export function normalizeShapeIds(shapes: any[]) {
  const idMap = new Map<string, string>();

  shapes.forEach((shape) => {
    const originalId = shape.id ?? crypto.randomUUID();
    const validId = originalId.startsWith("shape:")
      ? originalId
      : createShapeId();

    idMap.set(originalId, validId);
  });

  return shapes.map((shape) => {
    const newShape = {
      ...shape,
      id: idMap.get(shape.id),
    };

    if (shape.type === "arrow" && shape.props) {
      const { start, end } = shape.props;

      if (start?.id && idMap.has(start.id)) {
        newShape.props = {
          ...newShape.props,
          start: { ...start, id: idMap.get(start.id) },
        };
      }

      if (end?.id && idMap.has(end.id)) {
        newShape.props = {
          ...newShape.props,
          end: { ...end, id: idMap.get(end.id) },
        };
      }
    }

    return newShape;
  });
}

export function finalizeShapes(aiShapes: any[]) {
  const idMap = new Map<string, string>();

  aiShapes.forEach((s) => {
    idMap.set(s.id, createShapeId());
  });

  return aiShapes
    .map((shape) => {
      const id = idMap.get(shape.id);

      if (shape.type === "geo") {
        return {
          id,
          type: "geo",
          x: shape.x,
          y: shape.y,
          props: {
            geo: shape.props.geo,
            w: shape.props.w,
            h: shape.props.h,
          },
        };
      }

      if (shape.type === "text") {
        return {
          id,
          type: "text",
          x: shape.x,
          y: shape.y,
          props: {
            text: shape.props.text,
          },
        };
      }

      if (shape.type === "arrow") {
        const start = shape.props?.start || { x: 0, y: 0 };
        const end = shape.props?.end || { x: 100, y: 50 };
        return {
          id,
          type: "arrow",
          x: shape.x || 0,
          y: shape.y || 0,
          props: {
            start: {
              ...start,
              id: start.id ? idMap.get(start.id) : undefined,
            },
            end: {
              ...end,
              id: end.id ? idMap.get(end.id) : undefined,
            },
          },
        };
      }

      return null;
    })
    .filter(Boolean);
}
