export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Vector2D {
  x: number;
  y: number;
}

export interface GameMap {
  data: number[][];
  rows: number;
  cols: number;
}

export type ItemType = 'PELLET' | 'POWER_PELLET' | 'GHOST';
export type GhostState = 'NORMAL' | 'FRIGHTENED';

export interface Pellet {
  x: number;
  y: number;
  type: 'NORMAL' | 'POWER';
}

export interface Ghost {
  id: string;
  pos: Vector2D;
  state: GhostState;
  color: string;
  direction: Direction;
  respawn(): void;
}

export interface GameState {
  playerPos: Vector2D;
  ghosts: Ghost[];
  pellets: Pellet[];
  isGameOver: boolean;
}
