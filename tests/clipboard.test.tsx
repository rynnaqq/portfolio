import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { CopyEmailButton } from '../src/components/contact/CopyEmailButton';
import { portfolioContent } from '../src/content/portfolio';

describe('CopyEmailButton & Clipboard Resilience (PRD FR-06, Bagian 14)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays fallback text when email is empty', () => {
    render(<CopyEmailButton email="" />);
    expect(screen.getByText(/email belum ditambahkan/i)).toBeInTheDocument();
  });

  it('copies email successfully and shows polite aria-live feedback', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyEmailButton email="developer@example.com" />);

    const copyBtn = screen.getByRole('button', { name: /salin email/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('developer@example.com');

    // Wait for success status
    await waitFor(() => {
      expect(screen.getAllByText(portfolioContent.labels.copyEmailSuccess).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows graceful fallback feedback when clipboard is rejected', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyEmailButton email="developer@example.com" />);

    const copyBtn = screen.getByRole('button', { name: /salin email/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(screen.getByText(portfolioContent.labels.copyEmailFailed)).toBeInTheDocument();
    });
  });
});
