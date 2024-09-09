import { Component, HostListener, Inject } from '@angular/core';
import { SnakeService } from './services/snake.service';
import { CommonModule } from '@angular/common';
import { Direction } from './models/snake.models';
import { ModalService } from '../../shared/modal/services/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'snake-game',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css',
  providers: [SnakeService, { provide: Window, useValue: window }],
})
export class SnakeComponent {
  board: Array<0 | 1 | 2> = [];
  timeoutId: ReturnType<typeof setTimeout> | null = null;
  isGameOver: boolean = false;

  constructor(public snakeService: SnakeService, public modalService: ModalService, @Inject(Window) public window: Window) {
    this.board = this.snakeService.getBoard();
    this.window.requestAnimationFrame(() => {
      this.update();
    });
    this.snakeService.gameOverSubject.subscribe(() => {
      console.log('game over');
      this.pauseGame();
      this.isGameOver = true;
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.isGameOver) {
      this.snakeService.resetGame();
      this.isGameOver = false;
      this.resumeGame();
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        this.snakeService.changeDirection(Direction.Up);
        break;
      case 'ArrowDown':
        this.snakeService.changeDirection(Direction.Down);
        break;
      case 'ArrowLeft':
        this.snakeService.changeDirection(Direction.Left);
        break;
      case 'ArrowRight':
        this.snakeService.changeDirection(Direction.Right);
        break;
      // pause game when space is pressed
      case ' ':
        if (this.timeoutId) {
          this.pauseGame();
        } else {
          this.resumeGame();
        }
        break;
    }
  }

  pauseGame() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.modalService.open();
  }

  resumeGame() {
    this.modalService.close();
    this.update();
  }

  trackByIndex = (index: number): number => {
    return index;
  };

  update() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (!this.isGameOver) {
      this.snakeService.updateGame();
      this.board = this.snakeService.getBoard();
      this.timeoutId = setTimeout(() => this.window.requestAnimationFrame(this.update.bind(this)), 200);
    }
  }
}
