import { Component } from '@angular/core';
import { BoardService } from './services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  providers: [BoardService],
})
export class BoardComponent {
  board: Array<0 | 1 | 2> = [];
  constructor(public boardService: BoardService) {
    this.board = this.boardService.getBoard();
  }

  getPlayer(): 1 | 2 {
    return this.boardService.getPlayer();
  }

  resetGame() {
    this.boardService.initialiseBoard();
    this.board = this.boardService.getBoard();
  }

  playTurn(index: number) {
    this.boardService.playTurn(index);
  }
}
