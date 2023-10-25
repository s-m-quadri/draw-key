function getCost(vec1, vec2) {
  // Check if the vectors are of equal length and non-empty.
  if (vec1.length !== vec2.length || vec1.length === 0) {
    throw new Error("Invalid length of vector to calculate cost.");
  }

  // Calculate the cost by summing the absolute differences between each element of the vectors.
  let cost = 0;
  for (let i = 0; i < vec1.length; i++) {
    cost += Math.abs(vec1[i] - vec2[i]);
  }

  // Round the cost and return it.
  return Math.round(cost);
}

function getMean(dataPoints) {
  // Check if the data points array is empty.
  if (dataPoints.length === 0) {
    throw new Error("Invalid data points array to calculate mean.");
  }

  // Calculate the mean by summing the data points and dividing by the number of data points.
  let mean = 0;
  for (const dataPoint of dataPoints) {
    mean += dataPoint;
  }
  mean /= dataPoints.length;

  // Round the mean and return it.
  return Math.round(mean);
}

function getVariance(dataPoints) {
  // Calculate the mean of the data points.
  const mean = getMean(dataPoints);

  // Calculate the variance by summing the squared differences between each data point and the mean.
  let variance = 0;
  for (const dataPoint of dataPoints) {
    variance += (dataPoint - mean) ** 2;
  }

  // Round the variance and return it.
  return Math.round(variance / dataPoints.length);
}

function getStdDeviation(dataPoints) {
  // Get the variance of the data points.
  const variance = getVariance(dataPoints);

  // Calculate the standard deviation by taking the square root of the variance.
  const stdDeviation = Math.sqrt(variance);

  // Round the standard deviation and return it.
  return Math.round(stdDeviation);
}

exploredVec = [];
class Match {
  constructor(vec1, vec2, target) {
    this.target = target;
    this.resCost = 2 ** 16;
    this.resMatch = [vec1.slice(), vec2.slice()];
    // this.exploredVec = [];
    this.calculateBestMatch(vec1, vec2);
  }

  calculateBestMatch(vec1, vec2, p1 = 0, p2 = 0) {
    // Not to ignore already completed steps

    const stringified = String([vec1.length, vec2.length, p1, p2]);
    for (const sample of exploredVec) {
      if (String(sample) == stringified) return;
    }

    exploredVec.push([vec1.length, vec2.length, p1, p2]);

    // Pointers reached at the target
    if (p1 === p2 && p2 === this.target - 1) {
      const curCost = getCost(vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1));
      if (curCost < this.resCost) {
        this.resCost = curCost;
        this.resMatch = [vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1)];
      }
    }

    // Consider to take from first vector
    if (p1 + 1 < this.target) {
      this.calculateBestMatch(vec1, vec2, p1 + 1, p2);
    }

    // Consider to ignore from first vector
    if (vec1.length > this.target) {
      this.calculateBestMatch(vec1.slice(1), vec2, p1, p2);
    }

    // Consider to take from second vector
    if (p2 + 1 < this.target) {
      this.calculateBestMatch(vec1, vec2, p1, p2 + 1);
    }

    // Consider to ignore from second vector
    if (vec2.length > this.target) {
      this.calculateBestMatch(vec1, vec2.slice(1), p1, p2);
    }
  }
}

function getTemplate(refSigns) {
  // Length tolerance calculation
  const lnRefSigns = refSigns.map((sign) => sign.length);
  const mean = getMean(lnRefSigns);
  const stdDeviation = getStdDeviation(lnRefSigns);

  const minLn = Math.min(...lnRefSigns) - stdDeviation;
  const maxLn = Math.max(...lnRefSigns) + stdDeviation;

  var resVec = refSigns[0];
  for (let i = 1; i < refSigns.length; i++) {
    const nextVec = refSigns[i];
    const [v1, v2] = new Match(resVec, nextVec, minLn).resMatch;
    resVec = v1.map((x, k) => Math.round((x + v2[k]) / 2));
  }
  //   console.log(resVec, refSigns);
  var costs = [];
  for (const i of refSigns) {
    // console.log("\tLoop: ", i, resVec, minLn);
    new_cost = new Match(i, resVec, minLn);
    // console.log("cost: ", new_cost);
    costs = [...costs, new_cost.resCost];
    console.log(
      new Match(
        [0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0],
        [-13, -34, -19, -38, -37, 5, 37, 38, 30, 37],
        10
      ).resCost
    );
  }
  console.log("fdfs", costs);
  const stdDeviationCost = getStdDeviation(costs);
  const meanCost = getMean(costs);
  const minCost = meanCost - stdDeviationCost;
  const maxCost = meanCost + stdDeviationCost;
  //   console.log(refSigns[0], resVec, minLn);

  return {
    lengthMin: minLn,
    lengthMax: maxLn,
    costMin: minCost,
    costMax: maxCost,
    vector: resVec,
  };
}

async function main() {
  //   console.log(
  //     new Match([1, 9, 99, 9, 88, 88], [88, 88, 88, 1, 1, 888, 88, 88], 2)
  //   );
  console.log(
    new Match(
      [0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0],
      [-13, -34, -19, -38, -37, 5, 37, 38, 30, 37],
      10
    ).resCost
  );
  //   console.log(
  //     new Match(
  //       [0, -42, -19, -26, -47, -32, 43, 40, 36, 45, -339, 0],
  //       [0, -42, -19, -26, -47, -32, 43, 40, 36, 45, 339, 1],
  //       12
  //     ).resCost
  //   );

  //   return;
  // Registration
  // Sign: 1: #1 0,-27,-29,-26,-24,-50,-20,64,17,16,22,30,26,-348,16,0
  // Sign: 2: #1 0,354,-16,-26,-27,-16,-50,-35,18,43,55,26,27,-343,41,0
  // Sign: 3: #1 0,-42,-19,-26,-47,-32,43,40,36,45,-339,0
  const sn = [];
  sn.push([
    0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0,
  ]);
  sn.push([
    0, 354, -16, -26, -27, -16, -50, -35, 18, 43, 55, 26, 27, -343, 41, 0,
  ]);
  sn.push([0, -42, -19, -26, -47, -32, 43, 40, 36, 45, -339, 0]);

  // Get the template for the given reference signs
  const template = getTemplate(sn);
  console.log(template);

  // Test the template on a new sign
  const testVec = [
    0, -47, -19, -39, -38, -33, 19, 26, 52, 37, 22, 17, -342, 17, 0,
  ];
  const x = new Match(template.vector, testVec, template.lengthMin).resCost;

  // Check if the test sign is valid
  if (template.lengthMin <= testVec.length <= template.lengthMax) {
    if (template.costMin <= x <= template.costMax) {
      console.log("Valid Signature!");
    } else {
      console.log("Invalid cost!");
    }
  } else {
    console.log("Invalid length!");
  }

  console.log(
    new Match(
      [0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0],
      [-13, -34, -19, -38, -37, 5, 37, 38, 30, 37],
      10
    ).resCost
  );
}

// Call the main function
main();
