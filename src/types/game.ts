export interface Vector2D {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Pellet {
  x: number;
  y: number;
  type: 'NORMAL' | 'POWER';
}

export interface Ghost {
  id: string;
  pos: Vector2D;
  color: string;
  isFrightened: boolean;
  direction: Direction;
}

export interface GameState {
  playerPos: Vector2D;
  playerDirection: Direction;
  playerMouthOpen: boolean;
  ghosts: Ghost[];
  pellets: Pellet[];
  map: number[][];
}
