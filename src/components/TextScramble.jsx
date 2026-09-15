import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________101010';

export default function TextScramble({
  text,
  className = '',
  scrambleOnMount = true,
  scrambleOnHover = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  const startScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (letter === ' ' || letter === '\n') return letter;
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 28);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
    return () => clearInterval(intervalRef.current);
  }, [text, scrambleOnMount]);

  return (
    <span
      onMouseEnter={() => {
        if (scrambleOnHover) startScramble();
      }}
      className={`inline-block select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
