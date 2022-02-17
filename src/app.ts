export type Rover = {
  x: number;
  y: number;
  heading: string;
};

export function turnLeft(rover: Rover): Rover {
  switch (rover.heading) {
    case "N":
      return Object.assign(rover, { heading: "W" });
    case "W":
      return Object.assign(rover, { heading: "S" });
    case "S":
      return Object.assign(rover, { heading: "E" });
    case "E":
      return Object.assign(rover, { heading: "N" });
  }
}

export function turnRight(rover: Rover): Rover {
  switch (rover.heading) {
    case "N":
      return Object.assign(rover, { heading: "E" });
    case "E":
      return Object.assign(rover, { heading: "S" });
    case "S":
      return Object.assign(rover, { heading: "W" });
    case "W":
      return Object.assign(rover, { heading: "N" });
  }
}

export function move(rover: Rover): Rover {
  switch (rover.heading) {
    case "N":
      return Object.assign(rover, { y: rover.y + 1 });
    case "W":
      return Object.assign(rover, { x: rover.x - 1 });
    case "S":
      return Object.assign(rover, { y: rover.y - 1 });
    case "E":
      return Object.assign(rover, { x: rover.x + 1 });
  }
}

export function executeOperations(rover: Rover, operations: string): Rover {
  const newRover = Object.assign({}, rover);
  for (const operation of operations) {
    switch (operation) {
      case "L":
        turnLeft(newRover);
        break;
      case "R":
        turnRight(newRover);
        break;
      case "M":
        move(newRover);
        break;
    }
  }
  return newRover;
}

export function createRover(input: string): Rover {
  const [x, y, heading] = input.split(" ");
  return { x: Number(x), y: Number(y), heading };
}

export function readRover(input: string) {
  const [serialisedRover, operations] = input.split("\n");
  return executeOperations(createRover(serialisedRover), operations);
}

export function processRovers(input: string): string {
  const [map, ...inputLines] = input.split("\n");
  const { rovers } = inputLines.reduce(
    (acc, input, index) => {
      if (acc.firstLine === null) {
        acc.firstLine = input;
      } else {
        acc.rovers.push(readRover(acc.firstLine + "\n" + input));
        acc.firstLine = null;
      }
      return acc;
    },
    { rovers: [], firstLine: null }
  );

  let output = ""
  for(const rover of rovers) {
    output+= `${rover.x} ${rover.y} ${rover.heading}\n`
  }
  return output;
}
