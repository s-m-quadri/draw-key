export default class DKLine {
  constructor(points = []) {
    this.points = [];
    points.map((point) => {
      this.addPoint(point.x, point.y);
    });
  }

  addPoint(x, y) {
    // Add current point
    this.points = [
      ...this.points,
      { x: Math.round(x), y: Math.round(y), theta: 0 },
    ];

    // Update theta of previous, if possible
    if (this.points.length > 2) {
      this.points.at(-2).theta = this.getAngle(
        this.points.at(-3),
        this.points.at(-2),
        this.points.at(-1)
      );
    }
  }

  getAngle(ptA, ptB, ptC) {
    let vctP = { x: ptB.x - ptA.x, y: ptB.y - ptA.y };
    let vctQ = { x: ptC.x - ptB.x, y: ptC.y - ptB.y };
    let angleRad = Math.atan2(vctQ.y, vctQ.x) - Math.atan2(vctP.y, vctP.x);
    let angleDeg = angleRad * (180 / Math.PI);
    return Math.round(angleDeg);
  }
}
