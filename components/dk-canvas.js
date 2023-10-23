import { Layer, Line, Stage, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

import styles from "./dk-common.module.scss";
import DKPlot from "./graph/dk-plot";
import { DKLine, DKProcess } from "./dk-algorithm";
import DKInfo from "./graph/dk-info";

export default function DKCanvas({ handleCompletion, nextLine }) {
  const [lines, setLines] = useState(nextLine);
  const [linesP1, setlinesP1] = useState([]);
  const [linesP2, setlinesP2] = useState([]);
  const [vectors, setVectors] = useState([]);
  const activatePen = useRef(false);

  useEffect(() => {
    processPoint();
  }, [nextLine]);

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
    processPoint();
  };

  function processPoint() {
    let mLinesP1 = [],
      mLinesP2 = [],
      mVectors = [];
    lines.map((line, i) => {
      let process = new DKProcess(line.points);
      mLinesP1 = [...mLinesP1, process.smoothCurve];
      mLinesP2 = [...mLinesP2, process.smoothAngles];
      mVectors = [...mVectors, process.vector];
    });
    setlinesP1(mLinesP1);
    setlinesP2(mLinesP2);
    setVectors(mVectors);
  }

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
          {vectors.map((vector, i) => (
            <li>
              <code>{`${vector}`}</code>
            </li>
          ))}
        </ol>
      </div>

      <button onClick={() => handleCompletion("Prev", lines)}>Prev</button>
      <button onClick={() => handleCompletion("Next", lines)}>Next</button>
    </div>
  );
}
