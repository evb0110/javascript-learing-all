const fs = require('fs');

const lines = fs.readFileSync('input_large.txt', 'utf8').split(/\n/);
const lineToNumbers = line => line.split(/\s+/).map(str => Number(str));
const scores = lineToNumbers(lines[1]);
const alice = lineToNumbers(lines[3]);

function climbingLeaderboard(scores, alice) {
  const scoresUnique = [...new Set(scores)];
  const aliceReversed = alice.reverse();
  const placesReversed = [];
  aliceReversed.forEach((el) => {
    const currentPlace = placesReversed[placesReversed.length - 1] || 1;
    let foundFlag = false;
    for (let i = currentPlace - 1; i < scoresUnique.length; i++) {
      if (el >= scoresUnique[i]) {
        placesReversed.push(i + 1);
        foundFlag = true;
        break;
      }
    }
    if (!foundFlag) {
      placesReversed.push(scoresUnique.length + 1);
    }
  });
  return placesReversed.reverse();
}



console.log(climbingLeaderboard(scores, alice));