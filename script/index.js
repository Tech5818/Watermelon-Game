// fruits 불러오기
import { FRUITS } from "./fruits.js";

import { CanvasSize, Walls } from "./size.js";

const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;

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

addFruit();
