import { CanvasSize, Walls } from "./size.js";

const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언
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

// 벽 배치를 위한 world 선언
const world = engine.world;

// 왼쪽 벽생성
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

// 오른쪽 벽생성
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

// 바닥 생성
const ground = Bodies.rectangle(280, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

// 바닥 생성
const topLine = Bodies.rectangle(310, 150, 620, 2, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);
