import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import GlowBackground from '../components/GlowBackground';

describe('GlowBackground Component', () => {
  it('renders atmospheric glow background without video element', () => {
    const { container } = render(<GlowBackground />);
    const video = container.querySelector('video');
    expect(video).toBeNull();
    expect(container.firstChild).toBeInTheDocument();
  });
});
