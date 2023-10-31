import { Layer, Line, Stage, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

import styles from "../dk-common.module.scss";
import DKLine from "../../algorithms/dk-line";
import DKSmooth from "../../algorithms/dk-smooth";
import DKGraphPlot from "./dk-graph-plot";
import DKGraphInfo from "./dk-graph-info";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";

export default function DKGraph({ handleCompletion, nextLine, title }) {
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
      let process = new DKSmooth(line.points);
      mLinesP1 = [...mLinesP1, process.smoothCurve];
      mLinesP2 = [...mLinesP2, process.smoothAngles];
      mVectors = [...mVectors, process.vector];
    });
    setlinesP1(mLinesP1);
    setlinesP2(mLinesP2);
    setVectors(mVectors);
  }

  function handleReset() {
    setLines([]);
    setlinesP1([]);
    setlinesP2([]);
    setVectors([]);
  }

  return (
    <div>
      <Typography variant="h2">Draw Signature</Typography>
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
          <DKGraphPlot lines={lines} title={title} />
        </Stage>
      </div>

      <IconButton onClick={() => handleReset()}>
        <Refresh />
      </IconButton>

      <Button
        variant="outlined"
        onClick={() => handleCompletion("Prev", lines, vectors)}
      >
        Back
      </Button>

      <Button
        variant="contained"
        onClick={() => handleCompletion("Next", lines, vectors)}
      >
        Continue
      </Button>

      <details>
        <summary>Signature Vector(s)</summary>
        <Typography variant="h2">Vectors</Typography>
        <div className={styles.details}>
          <ol>
            {vectors.map((vector, i) => (
              <li>
                <code>{`${vector}`}</code>
              </li>
            ))}
          </ol>
        </div>
      </details>

      <details>
        <summary>Processing Details</summary>
        <Typography variant="h2">Original Signature</Typography>
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
            <DKGraphPlot lines={lines} title={"Step 1/3"} />
          </Stage>
        </div>
        <DKGraphInfo lines={lines} />

        <Typography variant="h2">Curve Smoothing</Typography>
        <div className={styles.canvas}>
          <Stage
            width={globalThis.window?.innerWidth / 2}
            height={globalThis.window?.innerHeight / 2}
            className={styles.board}
          >
            <DKGraphPlot lines={linesP1} title={"Step 2/3"} />
          </Stage>
        </div>
        <DKGraphInfo lines={linesP1} />

        <Typography variant="h2">Angle Smoothing</Typography>
        <div className={styles.canvas}>
          <Stage
            width={globalThis.window?.innerWidth / 2}
            height={globalThis.window?.innerHeight / 2}
            className={styles.board}
          >
            <DKGraphPlot lines={linesP2} title={"Step 3/3"} />
          </Stage>
        </div>
        <DKGraphInfo lines={linesP2} />
      </details>
    </div>
  );
}
