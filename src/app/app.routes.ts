import { Routes } from '@angular/router';
import { SnakeComponent } from './features/snake/snake.component';
import { BoardComponent } from './features/board/board.component';
import { GameLoaderComponent } from './shared/game-loader/game-loader.component';

export const routes: Routes = [
  { path: 'snake', component: SnakeComponent }, // Snake game route
  { path: 'tictac', component: BoardComponent }, // Tic-Tac-Toe game route
  { path: 'game-loader', component: GameLoaderComponent }, // Loader page
  { path: '', redirectTo: '/game-loader', pathMatch: 'full' }, // Redirect to loader by default
];
