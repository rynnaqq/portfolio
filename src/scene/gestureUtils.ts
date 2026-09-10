export interface Point {
  x: number;
  y: number;
}

export const ROTATION_STEP_RAD = (15 * Math.PI) / 180; // 15 degrees in radians
export const MAX_PITCH_RAD = (30 * Math.PI) / 180; // +/- 30 degrees in radians

/**
 * Calculates Euclidean distance between two points.
 * Returns true if pointer movement <= threshold (valid click candidate).
 * Returns false if pointer movement > threshold (counts as drag, cancels click).
 */
export function isClickCandidate(start: Point, end: Point, threshold = 8): boolean {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= threshold;
}

/**
 * Clamps pitch (vertical rotation) strictly to +/- MAX_PITCH_RAD (+/- 30°).
 */
export function clampPitch(pitch: number, maxPitch = MAX_PITCH_RAD): number {
  return Math.max(-maxPitch, Math.min(maxPitch, pitch));
}
