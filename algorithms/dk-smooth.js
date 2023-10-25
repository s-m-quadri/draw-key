import DKLine from "./dk-line";

export default class DKSmooth {
  constructor(points = [], pointTolerance = 5, angleTolerance = 15) {
    // Configuration
    this.points = points;
    this.pointTolerance = pointTolerance;
    this.angleTolerance = angleTolerance;

    // Automated Process
    this.smoothCurve = this.performCurveSmoothing();
    this.points = this.smoothCurve.points;
    this.smoothAngles = this.performAngleSmoothing();
    this.points = this.smoothAngles.points;
    this.enumerateVector();
  }

  performCurveSmoothing() {
    let newPoints = [];
    let sum = {};
    this.points.map((point, i) => {
      // Start from current point
      if (i === 0) {
        sum = { x: point.x, y: point.y };
        return;
      }

      // Restart when reached threshold
      // 1. Clean up previous marks
      // 2. Start from current point
      if (i % this.pointTolerance === 0) {
        newPoints = [
          ...newPoints,
          { x: sum.x / this.pointTolerance, y: sum.y / this.pointTolerance },
        ];
        sum = { x: point.x, y: point.y };
        return;
      }

      // As usual, continue adding points co-ordinates
      sum = { x: sum.x + point.x, y: sum.y + point.y };

      // Check if reached end, before threshold
      // Roughly approximate it.
      if (i === this.points.length - 1) {
        sum.x = sum.x / ((i % this.pointTolerance) + 1);
        sum.y = sum.y / ((i % this.pointTolerance) + 1);
        newPoints = [...newPoints, { x: sum.x, y: sum.y }];
      }
    });

    let rounded_points = [];
    newPoints.map((point) => {
      rounded_points = [
        ...rounded_points,
        { x: Math.round(point.x), y: Math.round(point.y) },
      ];
    });

    return new DKLine(rounded_points);
  }

  performAngleSmoothing() {
    let significant_points = [];
    this.points.map((point, i) => {
      // Ignore first, last and points with unsignificant angles
      if (
        Math.abs(point.theta) <= this.angleTolerance &&
        !(i === 0 || i === this.points.length - 1)
      ) {
        return;
      }
      // Otherwise, mark significant
      significant_points = [...significant_points, point];
    });

    return new DKLine(significant_points);
  }

  enumerateVector() {
    let vector = [];
    this.points.map((point, i) => {
      vector = [...vector, point.theta];
    });
    this.vector = vector;
  }
}
