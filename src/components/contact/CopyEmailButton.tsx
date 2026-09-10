import React from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { portfolioContent } from '../../content/portfolio';

interface CopyEmailButtonProps {
  email: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({ email }) => {
  const { status, copy } = useClipboard(3000);
  const { labels } = portfolioContent;

  if (!email || email.trim() === '') {
    return (
      <span className="text-sm font-body text-text-muted italic select-none">
        Email belum ditambahkan.
      </span>
    );
  }

  const handleCopy = () => {
    copy(email);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={status === 'copied' ? 'Email disalin' : 'Salin email'}
        className="min-h-[44px] px-4 py-2 bg-butter text-text border-2 border-text rounded-md font-display font-bold hover:bg-butter/80 focus:outline-none focus:ring-2 focus:ring-cobalt active:scale-95 flex items-center gap-2 transition-all"
      >
        {status === 'copied' ? (
          <>
            <Check className="w-4 h-4 text-cobalt" />
            <span>{labels.copyEmailSuccess}</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Salin email</span>
          </>
        )}
      </button>

      {/* Accessible Polite Live Region */}
      <div aria-live="polite" className="text-xs font-body">
        {status === 'copied' && (
          <span className="text-cobalt font-bold sr-only">
            {labels.copyEmailSuccess}
          </span>
        )}
        {status === 'error' && (
          <span className="text-tomato flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{labels.copyEmailFailed}</span>
          </span>
        )}
      </div>
    </div>
  );
};
