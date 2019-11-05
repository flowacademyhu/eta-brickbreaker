const matrixToObj = (matrix) => {
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      if (matrix[i][j] === 'O') {
        ballObj.posX = i;
        ballObj.posY = j;
        matrix[i][j] = ballObj;
      }
      if (matrix[i][j] === 'B') {
        brickObj.posX = j;
        brickObj.posY = i;
        matrix[i][j] = brickObj;
      }
      if (matrix[i][j] === 'EBr') {
        extraBrickObj.posX = j;
        extraBrickObj.posY = i;
        matrix[i][j] = extraBrickObj;
      }
      if (matrix[i][j] === 'EBa') {
        extraBallObj.posX = j;
        extraBallObj.posY = i;
        matrix[i][j] = extraBallObj;
      }
      if (matrix[i][j] === 'L') {
        lifeBrick.posX = j;
        lifeBrick.posY = j;
        matrix[i][j] = lifeBrick;
      }
      if (matrix[i][j] === 'Cl1') {
        clubLeft1Obj.posX = j;
        clubLeft1Obj.posY = i;
        matrix[i][j] = clubLeft1Obj;
      }
      if (matrix[i][j] === 'Cl2') {
        clubLeft2Obj.posX = j;
        clubLeft2Obj.posY = i;
        matrix[i][j] = clubLeft2Obj;
      }
      if (matrix[i][j] === 'Cc') {
        clubCenterObj.posX = j;
        clubCenterObj.posY = i;
        matrix[i][j] = clubCenterObj;
      }
      if (matrix[i][j] === 'Cr2') {
        clubRight2Obj.posX = j;
        clubRight2Obj.posY = i;
        matrix[i][j] = clubRight2Obj;
      }
      if (matrix[i][j] === 'Cr1') {
        clubRight1Obj.posX = j;
        clubRight1Obj.posY = i;
        matrix[i][j] = clubRight1Obj;
      }
    }
  }
  return matrix;
};
