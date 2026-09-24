import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CircularCommandMenu, CommandItem } from '../components/ui/circular-command-menu';

describe('CircularCommandMenu Component', () => {
  const mockOnClick = vi.fn();
  const testItems: CommandItem[] = [
    { id: 'item1', label: 'Problema', icon: <span>Icon1</span>, onClick: mockOnClick },
    { id: 'item2', label: 'Solução', icon: <span>Icon2</span>, shortcut: '2' },
  ];

  it('renders closed initially and opens on click', () => {
    render(<CircularCommandMenu items={testItems} />);

    // Initially menu items should not be visible
    expect(screen.queryByText('Problema')).not.toBeInTheDocument();

    // Click trigger button
    const triggerBtn = screen.getByRole('button');
    fireEvent.click(triggerBtn);

    // Now items should be rendered
    expect(screen.getByText('Problema')).toBeInTheDocument();
    expect(screen.getByText('Solução')).toBeInTheDocument();
  });

  it('executes item onClick when clicked', () => {
    render(<CircularCommandMenu items={testItems} />);

    const triggerBtn = screen.getByRole('button');
    fireEvent.click(triggerBtn);

    const itemBtn = screen.getByRole('menuitem', { name: 'Problema' });
    fireEvent.click(itemBtn);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key', async () => {
    render(<CircularCommandMenu items={testItems} />);

    const triggerBtn = screen.getByRole('button');
    fireEvent.click(triggerBtn);
    expect(screen.getByText('Problema')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Problema')).not.toBeInTheDocument();
    });
  });
});
