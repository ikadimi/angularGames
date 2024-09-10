import { Component, HostListener, Inject } from '@angular/core';
import { SnakeService } from './services/snake.service';
import { CommonModule } from '@angular/common';
import { Direction, gameObjects } from './models/snake.models';
import { ModalService } from '../../shared/modal/services/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { debounce } from '../../shared/helpers';

@Component({
  selector: 'snake-game',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css',
  providers: [SnakeService, { provide: Window, useValue: window }],
})
export class SnakeComponent {
  board: Array<gameObjects> = [];
  isGameOver: boolean = false;
  isGamePaused: boolean = false;
  debouncedRequestAnimationFrame: Function = () => {};

  constructor(public snakeService: SnakeService, public modalService: ModalService, @Inject(Window) public window: Window) {
    this.debouncedRequestAnimationFrame = debounce(this.window.requestAnimationFrame.bind(this.window), 200);
    this.board = this.snakeService.getBoard();
    this.window.requestAnimationFrame(() => {
      this.update();
    });
    this.snakeService.gameOverSubject.subscribe(() => {
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
        this.snakeService.throttledChangeDirection(Direction.Up);
        break;
      case 'ArrowDown':
        this.snakeService.throttledChangeDirection(Direction.Down);
        break;
      case 'ArrowLeft':
        this.snakeService.throttledChangeDirection(Direction.Left);
        break;
      case 'ArrowRight':
        this.snakeService.throttledChangeDirection(Direction.Right);
        break;
      // pause game when space is pressed
      case ' ':
        if (this.isGamePaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
        break;
    }
  }

  pauseGame() {
    this.isGamePaused = true;
    this.modalService.open();
  }

  resumeGame() {
    this.isGamePaused = false;
    this.modalService.close();
    this.update();
  }

  trackByIndex = (index: number): number => {
    return index;
  };

  update() {
    if (!this.isGameOver && !this.isGamePaused) {
      this.snakeService.updateGame();
      this.board = this.snakeService.getBoard();
      this.debouncedRequestAnimationFrame(this.update.bind(this));
    }
  }
}
