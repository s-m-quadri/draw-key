"use strict";

var exploredVec = [];

function getBestMatch(vec1, vec2, target, p1 = 0, p2 = 0) {
  exploredVec = [];
  return calculateBestMatch(vec1, vec2, target, (p1 = 0), (p2 = 0));
}

function calculateBestMatch(vec1, vec2, target, p1 = 0, p2 = 0) {
  // Ignore already completed steps
  const stringified = String([vec1.length, vec2.length, p1, p2]);
  for (const sample of exploredVec) {
    if (String(sample) == stringified) return;
  }

  exploredVec.push([vec1.length, vec2.length, p1, p2]);

  // Pointers reached at the target
  if (p1 === p2 && p2 === target - 1) {
    const curCost = getCost(vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1));
    return {
      resCost: curCost,
      resMatch: [vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1)],
    };
    //   this.resCost = curCost;
    //   this.resMatch = [vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1)];
  }

  let agr_res = [];

  // Consider to take from first vector
  if (p1 + 1 < target) {
    let res = calculateBestMatch(vec1, vec2, target, p1 + 1, p2);
    if (res) agr_res.push(res);
  }

  // Consider to ignore from first vector
  if (vec1.length > target) {
    let res = calculateBestMatch(vec1.slice(1), vec2, target, p1, p2);
    if (res) agr_res.push(res);
  }

  // Consider to take from second vector
  if (p2 + 1 < target) {
    let res = calculateBestMatch(vec1, vec2, target, p1, p2 + 1);
    if (res) agr_res.push(res);
  }

  // Consider to ignore from second vector
  if (vec2.length > target) {
    let res = calculateBestMatch(vec1, vec2.slice(1), target, p1, p2);
    if (res) agr_res.push(res);
  }

  if (agr_res)
    if (agr_res.length != 0) {
      let best = agr_res[0];

      for (const i of agr_res) {
        if (i.resCost < best.resCost) best = i;
      }

      return best;
    }
}

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
    const [v1, v2] = getBestMatch(resVec, nextVec, minLn).resMatch;
    resVec = v1.map((x, k) => Math.round((x + v2[k]) / 2));
  }
  var costs = [];
  for (const i of refSigns) {
    let new_cost = getBestMatch(i, resVec, minLn);
    costs = [...costs, new_cost.resCost];
  }
  const stdDeviationCost = getStdDeviation(costs);
  const meanCost = getMean(costs);
  const minCost = meanCost - stdDeviationCost;
  const maxCost = meanCost + stdDeviationCost;

  return {
    lengthMin: minLn,
    lengthMax: maxLn,
    costMin: minCost,
    costMax: maxCost,
    vector: resVec,
  };
}

class Match {
  constructor(target) {
    this.target = target;
    // this.v1 = vec1;
    // this.v2 = vec2;
    // this.exploredVec = [];
  }

  process(vec1, vec2) {
    this.resCost = 2 ** 16;
    this.resMatch = [];
    // this.calculateBestMatch(vec1, vec2);
    console.log(this.target);
    console.log("dd", this.calculateBestMatch(vec1, vec2, this.target));
    return { resCost: this.resCost, resMatch: this.resMatch };
  }

  //   calculateBestMatch(vec1, vec2, target, p1 = 0, p2 = 0) {
  //     // Ignore already completed steps
  //     const stringified = String([vec1.length, vec2.length, p1, p2]);
  //     for (const sample of exploredVec) {
  //       if (String(sample) == stringified) return;
  //     }

  //     exploredVec.push([vec1.length, vec2.length, p1, p2]);

  //     // Pointers reached at the target
  //     if (p1 === p2 && p2 === target - 1) {
  //       const curCost = getCost(vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1));
  //       return {
  //         resCost: curCost,
  //         resMatch: [vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1)],
  //       };
  //       //   this.resCost = curCost;
  //       //   this.resMatch = [vec1.slice(0, p1 + 1), vec2.slice(0, p2 + 1)];
  //     }

  //     let agr_res = [];

  //     // Consider to take from first vector
  //     if (p1 + 1 < target) {
  //       let res = this.calculateBestMatch(vec1, vec2, target, p1 + 1, p2);
  //       if (res) agr_res.push(res);
  //     }

  //     // Consider to ignore from first vector
  //     if (vec1.length > target) {
  //       let res = this.calculateBestMatch(vec1.slice(1), vec2, target, p1, p2);
  //       if (res) agr_res.push(res);
  //     }

  //     // Consider to take from second vector
  //     if (p2 + 1 < target) {
  //       let res = this.calculateBestMatch(vec1, vec2, target, p1, p2 + 1);
  //       if (res) agr_res.push(res);
  //     }

  //     // Consider to ignore from second vector
  //     if (vec2.length > target) {
  //       let res = this.calculateBestMatch(vec1, vec2.slice(1), target, p1, p2);
  //       if (res) agr_res.push(res);
  //     }

  //     if (agr_res)
  //       if (agr_res.length != 0) {
  //         let best = agr_res[0];

  //         for (const i of agr_res) {
  //           if (i.resCost < best.resCost) best = i;
  //         }

  //         return best;
  //       }
  //   }
}

function getDetails(v1, v2, tar) {
  var obj = new Match(tar);
  console.log(
    obj.process(
      [0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0],
      [-13, -34, -19, -38, -37, 5, 37, 38, 30, 37]
    )
  );
  var sdfsdafd = new Match(3);
  console.log(
    sdfsdafd.process(
      [0, -27, -29, -26, -24, -50, -20, 64, 17, 16, 22, 30, 26, -348, 16, 0],
      [-13, -34, -19, -38, -37, 5, 37, 38, 30, 37]
    )
  );
}

function main() {
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
  console.log("got template", template);

  // Test the template on a new sign
  const testVec = [
    0, -47, -19, -39, -38, -33, 19, 26, 52, 37, 22, 17, -342, 17, 0,
  ];
  const x = getBestMatch(template.vector, testVec, template.lengthMin).resCost;

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
}

// Call the main function
main();
