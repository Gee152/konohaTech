import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import GlowBackground from '../components/GlowBackground';

describe('GlowBackground Component', () => {
  it('renders video element by default', () => {
    const { container } = render(<GlowBackground />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('omits video element when showVideo={false}', () => {
    const { container } = render(<GlowBackground showVideo={false} />);
    const video = container.querySelector('video');
    expect(video).toBeNull();
  });
});
