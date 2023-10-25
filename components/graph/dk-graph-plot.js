import { Layer, Line, Text } from "react-konva";

export default function DKGraphPlot({
  lines,
  strokeColor = "#660000",
  title = "Draw Signature",
}) {
  let m_lines = [];

  lines.forEach((line) => {
    let flat_points = [];
    line.points.forEach((point) => {
      flat_points = [...flat_points, point.x, point.y];
    });
    m_lines = [...m_lines, { points: flat_points }];
  });

  return (
    <Layer>
      <Text text={title} x={5} y={5} />
      {m_lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={strokeColor}
          strokeWidth={5}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
        />
      ))}
    </Layer>
  );
}
