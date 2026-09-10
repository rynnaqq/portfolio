import { describe, it, expect } from 'vitest';
import { isClickCandidate, clampPitch, ROTATION_STEP_RAD, MAX_PITCH_RAD } from '../src/scene/gestureUtils';

describe('Sculpture Gesture & Pointer Contract (PRD FR-08, FR-09)', () => {
  it('distinguishes click candidate vs drag using 8px threshold', () => {
    // 0px movement: definitely a click
    expect(isClickCandidate({ x: 100, y: 100 }, { x: 100, y: 100 }, 8)).toBe(true);

    // 5px movement: within 8px threshold -> valid click
    expect(isClickCandidate({ x: 100, y: 100 }, { x: 103, y: 104 }, 8)).toBe(true);

    // Exactly 8px movement: boundary is valid click
    expect(isClickCandidate({ x: 100, y: 100 }, { x: 108, y: 100 }, 8)).toBe(true);

    // 9px movement (> 8px): cancelled click, counts as drag
    expect(isClickCandidate({ x: 100, y: 100 }, { x: 109, y: 100 }, 8)).toBe(false);

    // Diagonal movement exceeding 8px (e.g., dx=6, dy=6, dist ≈ 8.48px)
    expect(isClickCandidate({ x: 100, y: 100 }, { x: 106, y: 106 }, 8)).toBe(false);
  });

  it('strictly clamps pitch to +/- 30 degrees (approx +/- 0.5236 radians)', () => {
    const minPitch = -MAX_PITCH_RAD;
    const maxPitch = MAX_PITCH_RAD;

    // Pitch within range
    expect(clampPitch(0)).toBe(0);
    expect(clampPitch(0.3)).toBeCloseTo(0.3);
    expect(clampPitch(-0.3)).toBeCloseTo(-0.3);

    // Pitch exceeding 30 degrees clamped
    expect(clampPitch(1.2)).toBeCloseTo(maxPitch);
    expect(clampPitch(-1.2)).toBeCloseTo(minPitch);
  });

  it('verifies 15 degree rotation step matches expected radians', () => {
    const expected15DegRad = (15 * Math.PI) / 180;
    expect(ROTATION_STEP_RAD).toBeCloseTo(expected15DegRad);
  });
});
