import { useState, useCallback, useRef, useEffect } from 'react';

export type ClipboardStatus = 'idle' | 'copied' | 'error';

export function useClipboard(timeout = 3000) {
  const [status, setStatus] = useState<ClipboardStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        setStatus('error');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
        timerRef.current = setTimeout(() => {
          setStatus('idle');
        }, timeout);
        return true;
      } catch {
        setStatus('error');
        return false;
      }
    },
    [timeout]
  );

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setStatus('idle');
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { status, copy, reset };
}
