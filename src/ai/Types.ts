import { Vector2D, Direction } from '../types/GameTypes';

export type GhostState = 'CHASE' | 'SCATTER' | 'FRIGHTENED';

export interface GhostConfig {
  color: string;
  scatterTarget: Vector2D;
  speed: number;
  personality: 'BLINKY' | 'PINKY' | 'INKY' | 'CLYDE';
}

export interface GhostAIState {
  currentState: GhostState;
  currentDirection: Direction;
  targetPosition: Vector2D;
  speed: number;
}
