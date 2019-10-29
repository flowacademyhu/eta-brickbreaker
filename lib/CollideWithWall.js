let context;
const MeetWithWall = (context) => {
  if (context.ballY > maxY) {
    context.ballY = maxY;
    context.ballYdir *= -1;
  } else {
    if (context.ballY < minY) {
      context.ballY = minY;
      context.ballYdir *= -1;
    }
  }

  if (context.ballX > maxX) {
    context.ballX = maxX;
    context.ballXdir *= -1;
  } else {
    if (context.ballX < minX) {
      context.ballX = minX;
      context.ballXdir *= -1;
    }
  }
  return context;
};

module.exports = {
  MeetWithWall: MeetWithWall
}
;
