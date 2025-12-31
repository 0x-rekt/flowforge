export function convertAIShapes(aiShapes: any[]) {
  const result: any[] = [];

  aiShapes.forEach((shape, i) => {
    const id = shape.id ?? `shape_${i}`;

    if (shape.type === "geo" && shape.props?.text) {
      const { text, ...geoProps } = shape.props;

      result.push({
        id,
        type: "geo",
        x: shape.x,
        y: shape.y,
        props: geoProps,
      });

      result.push({
        id: `${id}_text`,
        type: "text",
        x: shape.x + 10,
        y: shape.y + 10,
        props: { text },
      });
    } else {
      result.push({ id, ...shape });
    }
  });

  return result;
}
