import { Injectable  } from "@angular/core";
import { Board, Direction, gameState, Snake } from "../models/snake.models";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SnakeService {
    gameState: gameState = {
        food: null,
        direction: Direction.Right,
        gameOver: false,
        score: 0
    }
    board: Board = {
        size: 120,
        rowLength: 12,
        gameBoard: new Array(120).fill(0)
    }
    snake: Snake = {
        head: 2,
        tail: [0, 1],
        size: 2
    }
    // game over state
    gameOverSubject = new Subject<void>();
    constructor() { }

    getBoard(): Array<0 | 1 | 2> {
        return this.board.gameBoard;
    }

    initialiseBoard(): void {
        this.board.gameBoard = new Array(this.board.size).fill(0);
    }

    changeDirection(direction: Direction): void {
        if (direction === Direction.Left && this.gameState.direction === Direction.Right) {
            return ;
        } else if (direction === Direction.Right && this.gameState.direction === Direction.Left) {
            return ;
        } else if (direction === Direction.Up && this.gameState.direction === Direction.Down) {
            return ;
        } else if (direction === Direction.Down && this.gameState.direction === Direction.Up) {
            return ;
        }
        this.gameState.direction = direction;
    }

    generateRandom(min = 0, max = this.board.size): number {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.snake.tail.includes(num) ? this.generateRandom(min, max) : num;
    }

    spawnFood(): void {
        if (!this.gameState.food) {
            this.gameState.food = this.generateRandom();
            this.board.gameBoard[this.gameState.food] = 2;
        }
    }

    foodEaten(): void {
        if (this.snake.head === this.gameState.food) {
            this.snake.size++;
            this.gameState.food = null;
            this.spawnFood();
        }
    }

    updatePosition(): void {
        this.snake.tail.push(this.snake.head);
        switch (this.gameState.direction) {
            case Direction.Up:
                this.snake.head = this.snake.head < this.board.rowLength ? this.board.size - (this.board.rowLength - this.snake.head) : this.snake.head - this.board.rowLength;
                break;
            case Direction.Down:
                this.snake.head = (this.snake.head + this.board.rowLength) < this.board.size ? this.snake.head + this.board.rowLength : (this.board.rowLength + this.snake.head) - this.board.size;
                break;
            case Direction.Left:
                this.snake.head = (this.snake.head % this.board.rowLength) !== 0 ? this.snake.head - 1 : this.snake.head + (this.board.rowLength - 1);
                break;
            case Direction.Right:
                this.snake.head = (this.snake.head + 1) % this.board.rowLength !== 0 ? this.snake.head + 1 : this.snake.head - (this.board.rowLength - 1);
                break;
        }
        if (this.snake.tail.length > this.snake.size) this.snake.tail.shift()
    }

    checkCollision(): boolean {
        if (this.snake.tail.includes(this.snake.head)) {
            return true;
        }
        return false;
    }

    fillBoard(): void {
        for (let i = 0; i < this.board.size; i++) {
            if (this.snake.tail.includes(i)) {
                this.board.gameBoard[i] = 1;
            } else if (i === this.gameState.food) {
                this.board.gameBoard[i] = 2;
            } else {
                this.board.gameBoard[i] = 0;
            }
        }
    }

    resetGame(): void {
        this.snake.size = 2;
        this.snake.tail = [0, 1];
        this.initialiseBoard();
        this.spawnFood();
        this.fillBoard();
        this.gameState.gameOver = false;
    }

    updateGame(): void {
        if (this.checkCollision()) {
            this.gameState.gameOver = true;
            this.gameOverSubject.next();
            this.resetGame();
        } else {
            this.spawnFood();
            this.updatePosition();
            this.fillBoard();
            this.foodEaten();
        }
    }
}