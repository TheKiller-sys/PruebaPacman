import { Vector2D, Pellet, Ghost } from '../types/GameTypes';

export class CollisionManager {
  private static readonly PELLET_RADIUS = 8;
  private static readonly GHOST_RADIUS = 12;

  private static calculateDistance(p1: Vector2D, p2: Vector2D): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  public static checkPelletCollision(playerPos: Vector2D, pellets: Pellet[]): Pellet | null {
    for (const pellet of pellets) {
      const dist = this.calculateDistance(playerPos, { x: pellet.x, y: pellet.y });
      if (dist < this.PELLET_RADIUS) {
        return pellet;
      }
    }
    return null;
  }

  public static checkGhostCollision(playerPos: Vector2D, ghosts: Ghost[]): Ghost | null {
    for (const ghost of ghosts) {
      const dist = this.calculateDistance(playerPos, ghost.pos);
      if (dist < this.GHOST_RADIUS) {
        return ghost;
      }
    }
    return null;
  }
}
