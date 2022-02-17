import {
  turnLeft,
  turnRight,
  move,
  executeOperations,
  createRover,
  readRover,
processRovers
} from "./index";

describe("turnLeft", () => {
  it.each`
    heading | result
    ${"N"}  | ${"W"}
    ${"W"}  | ${"S"}
    ${"S"}  | ${"E"}
    ${"E"}  | ${"N"}
  `("turns left from $heading to $result", ({ heading, result }) => {
    const rover = { x: 1, y: 2, heading };
    expect(turnLeft(rover)).toEqual({ x: 1, y: 2, heading: result });
  });
});

describe("turnRight", () => {
  it.each`
    heading | result
    ${"N"}  | ${"E"}
    ${"E"}  | ${"S"}
    ${"S"}  | ${"W"}
    ${"W"}  | ${"N"}
  `("turns right from $heading to $result", ({ heading, result }) => {
    const rover = { x: 1, y: 2, heading };
    expect(turnRight(rover)).toEqual({ x: 1, y: 2, heading: result });
  });
});

describe("move", () => {
  it.each`
    heading | currentPosition | resultPosition
    ${"N"}  | ${[0, 0]}       | ${[0, 1]}
    ${"E"}  | ${[0, 0]}       | ${[1, 0]}
    ${"S"}  | ${[0, 1]}       | ${[0, 0]}
    ${"W"}  | ${[1, 0]}       | ${[0, 0]}
  `(
    "moves rover from $curreentPosition to $resultPosition when heading $heading",
    ({ heading, currentPosition: [x, y], resultPosition: [rx, ry] }) => {
      const rover = { x, y, heading };
      expect(move(rover)).toEqual({ x: rx, y: ry, heading });
    }
  );
});

describe("createRover", () => {
  it("creates the rover", () => {
    expect(createRover("1 2 N")).toEqual({
      x: 1,
      y: 2,
      heading: "N",
    });
  });
});

describe("executeOperations", () => {
  it("computes the new position of the rover given the movments", () => {
    const rover = {
      x: 1,
      y: 2,
      heading: "N",
    };
    const movements = "LMLMLMLMM";
    expect(executeOperations(rover, movements)).toEqual({
      x: 1,
      y: 3,
      heading: "N",
    });
  });
});

describe("readRover", () => {
  it("reads the rover final position", () => {
    expect(
      readRover(
        `1 2 N
LMLMLMLMM`
      )
    ).toEqual({
      x: 1,
      y: 3,
      heading: "N",
    });
  });
});

describe("processRovers", () => {
  it("reads all rovers final position given the input", () => {
    expect(
      processRovers(`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`)
    ).toEqual(`1 3 N
5 1 E
`);
  });
});
