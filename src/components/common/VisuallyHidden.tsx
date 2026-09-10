import React from 'react';

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};
