export enum Direction {
    Up,
    Down,
    Left,
    Right,
  }

export type Position = {
    start: number;
    end: number;
}

export enum gameObjects {
    head = 1,
    tail,
    food,
    board
}

export type Snake = {
    head: number;
    tail: number[];
    size: number;
}

export type Board = {
    size: number;
    rowLength: number;
    gameBoard: Array<gameObjects>;
}

export type gameState = {
    food: number | null;
    direction: Direction;
    gameOver: boolean;
    score: number;
}