// 렌더 캔버스 사이즈
export const CanvasSize = {
  width: 565, // 캔버스 넓이
  height: 850, // 캔버스 높이
};

const wallWidth = 30; // 벽의 넓이
const wallHeight = 790; // 벽의 높이

export const Walls = {
  left: {
    x: wallWidth / 2,
    y: wallHeight / 2,
    width: wallWidth,
    height: wallHeight,
  },
  right: {
    x: CanvasSize.width - wallWidth / 2, // 오른쪽 끝에 정렬(캔버스 크기 - 벽의 넓이)
    y: wallHeight / 2,
    width: wallWidth,
    height: wallHeight,
  },
};
