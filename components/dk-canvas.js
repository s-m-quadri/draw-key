import { Layer, Line, Stage, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

import styles from "./dk-common.module.scss";
import DKPlot from "./graph/dk-plot";
import { DKLine, DKProcess } from "./dk-algorithm";
import DKInfo from "./graph/dk-info";

export default function DKCanvas() {
  const [lines, setLines] = useState([]);
  const [linesP1, setlinesP1] = useState([]);
  const [linesP2, setlinesP2] = useState([]);
  const [dkVectors, setDkVectors] = useState([]);
  const activatePen = useRef(false);

  const handleMouseDown = (e) => {
    // Activate Pen
    activatePen.current = true;

    // Get co-ordinates
    const pos = e.target.getStage().getPointerPosition();

    // Start to capture new line
    let newLine = new DKLine();
    newLine.addPoint(pos.x, pos.y);
    setLines([...lines, newLine]);
  };

  const handleMouseMove = (e) => {
    // Skip, if pen is not activated
    if (!activatePen.current) {
      return;
    }

    // Otherwise,
    // Get co-ordinates
    const pos = e.target.getStage().getPointerPosition();

    // Add point to the last line
    lines.at(-1).addPoint(pos.x, pos.y);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    activatePen.current = false;
    let process = new DKProcess(lines.at(-1).points);
    setlinesP1([...linesP1, process.smoothCurve]);
    setlinesP2([...linesP2, process.smoothAngles]);
    setDkVectors([...dkVectors, process.vector]);
  };

  return (
    <div>
      <h2>Draw Signature</h2>
      <div className={styles.canvas}>
        <Stage
          width={globalThis.window?.innerWidth / 2}
          height={globalThis.window?.innerHeight / 2}
          className={styles.board}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <DKPlot lines={lines} />
        </Stage>
      </div>
      <DKInfo lines={lines} />

      <h2>Curve Smoothing</h2>
      <div className={styles.canvas}>
        <Stage
          width={globalThis.window?.innerWidth / 2}
          height={globalThis.window?.innerHeight / 2}
          className={styles.board}
        >
          <DKPlot lines={linesP1} />
        </Stage>
      </div>
      <DKInfo lines={linesP1} />

      <h2>Angle Smoothing</h2>
      <div className={styles.canvas}>
        <Stage
          width={globalThis.window?.innerWidth / 2}
          height={globalThis.window?.innerHeight / 2}
          className={styles.board}
        >
          <DKPlot lines={linesP2} />
        </Stage>
      </div>
      <DKInfo lines={linesP2} />

      <h2>Vectors</h2>
      <div className={styles.details}>
        <ol>
          {dkVectors.map((vector, i) => (
            <li>
              <code>{`${vector}`}</code>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
