import { useRef, useCallback } from 'react';
import { isClickCandidate, clampPitch, Point } from './gestureUtils';

interface UseSculptureGestureOptions {
  onRotate?: () => void;
  reducedMotion?: boolean;
}

export function useSculptureGesture(options: UseSculptureGestureOptions = {}) {
  const rotationRef = useRef<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0 });
  const startPointRef = useRef<Point | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startPointRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!startPointRef.current) return;

    const currentPoint: Point = { x: e.clientX, y: e.clientY };
    const dx = currentPoint.x - startPointRef.current.x;
    const dy = currentPoint.y - startPointRef.current.y;

    if (!isClickCandidate(startPointRef.current, currentPoint, 8)) {
      isDraggingRef.current = true;

      // Sensitivity factor
      const sensitivity = 0.008;
      rotationRef.current.yaw += dx * sensitivity;
      rotationRef.current.pitch = clampPitch(rotationRef.current.pitch + dy * sensitivity);

      startPointRef.current = currentPoint;
      options.onRotate?.();
    }
  }, [options]);

  const handlePointerUp = useCallback((): boolean => {
    const wasClick = !isDraggingRef.current;
    startPointRef.current = null;
    isDraggingRef.current = false;
    return wasClick;
  }, []);

  const handlePointerCancel = useCallback(() => {
    startPointRef.current = null;
    isDraggingRef.current = false;
  }, []);

  const resetRotation = useCallback(() => {
    rotationRef.current.yaw = 0;
    rotationRef.current.pitch = 0;
    options.onRotate?.();
  }, [options]);

  const stepRotate = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const step = (15 * Math.PI) / 180;
    if (direction === 'left') rotationRef.current.yaw -= step;
    if (direction === 'right') rotationRef.current.yaw += step;
    if (direction === 'up') rotationRef.current.pitch = clampPitch(rotationRef.current.pitch - step);
    if (direction === 'down') rotationRef.current.pitch = clampPitch(rotationRef.current.pitch + step);
    options.onRotate?.();
  }, [options]);

  return {
    rotationRef,
    isDraggingRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    resetRotation,
    stepRotate,
  };
}
