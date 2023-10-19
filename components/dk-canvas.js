import { Layer, Line, Stage, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

import styles from "./dk-common.module.scss";

export default function DKCanvas() {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [strokes, setStrokes] = useState([]);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
    setStrokes([
      ...strokes,
      { vector: [[Math.round(pos.x), Math.round(pos.y)]] },
    ]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    // Get the current location of point
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // Add point to the last line (replace last with updates)
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());

    let lastStroke = strokes[strokes.length - 1];
    lastStroke.vector = [
      ...lastStroke.vector,
      [Math.round(point.x), Math.round(point.y)],
    ];
    strokes.splice(strokes.length - 1, 1, lastStroke);
    setStrokes([...strokes]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    console.log(strokes);
  };

  return (
    <div>
      <div className={styles.canvas}>
        <Stage
          width={globalThis.window?.innerWidth / 2}
          height={globalThis.window?.innerHeight / 2}
          className={styles.board}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            <Text text="Draw Signature" x={5} y={5} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#660000"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className={styles.details}>
        {strokes.map((stroke, i) => (
          <details open>
            <summary>Stroke {i + 1}</summary>
            <table border={"black"}>
              <tr>
                <td>Stroke</td>
                <td>Point</td>
                <td>X</td>
                <td>Y</td>
              </tr>
              {stroke.vector.map((point, j) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{j + 1}</td>
                  <td>{point[0]}</td>
                  <td>{point[1]}</td>
                </tr>
              ))}
            </table>
          </details>
        ))}
      </div>
    </div>
  );
}
