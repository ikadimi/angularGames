import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  board: Array<0 | 1 | 2> = [];
  player: 1 | 2 = 1;
  gameOver: boolean = false;

  constructor() {
    this.initialiseBoard()
  }

  initialiseBoard(): void {
    this.board = new Array(9).fill(0);
    this.gameOver = false;
    this.player = 1;
  }

  getPlayer(): 1 | 2 {
    return this.player;
  }

  getBoard(): Array<0 | 1 | 2> {
    return this.board;
  }

  playTurn(index: number) {
    if (this.board[index] === 0) {
      this.board[index] = this.player;
    }

    const winner = this.checkWin();
    if (winner) {
        this.gameOver = true;
        return winner;
    }
    this.player = this.player === 1 ? 2 : 1;

    return null;
  }

  checkWin(): 1 | 2 | null {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a];
      }
    }

    return null;
  }
}