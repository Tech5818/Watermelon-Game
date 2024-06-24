// fruits 불러오기
import { FRUITS } from "./fruits.js";

import { CanvasSize, Walls } from "./size.js";

const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Body = Matter.Body;

/**
 * @return 엔진
 */
const engine = Engine.create();

/**
 * @return 렌더
 */
const render = Render.create({
  engine,
  element: document.querySelector("#box"),
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: CanvasSize.width,
    height: CanvasSize.height,
  },
});

/**
 * @return 월드
 */
const world = engine.world;

/**
 * @return 왼쪽 벽
 */
const leftWall = Bodies.rectangle(
  Walls.left.x,
  Walls.left.y,
  Walls.left.width,
  Walls.left.height,
  {
    isStatic: true, // 고정해주는 기능
    render: { fillStyle: "#E6B143" }, // 색상 지정
  }
);

/**
 * @return 오른쪽 벽
 */
const rightWall = Bodies.rectangle(
  Walls.right.x,
  Walls.right.y,
  Walls.right.width,
  Walls.right.height,
  {
    isStatic: true, // 고정해주는 기능
    render: { fillStyle: "#E6B143" }, // 색상 지정
  }
);

/**
 * @return 바닥
 */
const ground = Bodies.rectangle(280, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

/**
 * @return 천장
 */
const topLine = Bodies.rectangle(310, 150, 620, 2, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "#E6B143" },
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;

// 조작을 제어하는 변수
let disableAction = false;

/**
 * 과일 떨어지는 함수
 */
const addFruit = () => {
  const index = Math.floor(Math.random() * 5);

  const fruit = FRUITS[index];

  /**
   * @return circle형태로 반환되는 과일
   */
  const body = Bodies.circle(CanvasSize.width / 2, 15, fruit.radius, {
    index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png` },
    },
    restitution: 0.5,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
};

// 키보드 입력 받을때 실행할 동작

/**
 * @param {number} length 왼쪽으로 이동하는 길이
 */
const moveLeft = (length) => {
  Body.setPosition(currentBody, {
    x: currentBody.position.x - length,
    y: currentBody.position.y,
  });
};

/**
 * @param {number} length 오른쪽으로 이동하는 길이
 */
const moveRight = (length) => {
  Body.setPosition(currentBody, {
    x: currentBody.position.x + length,
    y: currentBody.position.y,
  });
};

const dropFruits = () => {
  currentBody.isSleeping = false;

  disableAction = true;

  /**
   * 과일 추가 딜레이 걸기
   */
  setTimeout(() => {
    addFruit();

    disableAction = false;
  }, 1000);
};

// 키보드 입력받기
window.onkeydown = (e) => {
  if (disableAction) return;

  switch (e.code) {
    case "KeyA":
      // 왼쪽으로 이동
      moveLeft(10);
      break;
    case "KeyD":
      // 오른쪽으로 이동
      moveRight(10);
      break;
    case "KeyS":
      dropFruits();
      break;
  }
};

addFruit();
