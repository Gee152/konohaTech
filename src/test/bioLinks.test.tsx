import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BioLinks from '../components/BioLinks';
import { isBioLinksRoute, navigateToBioLinks, navigateToLanding } from '../utils/routeUtils';
import { profileConfig, bioLinksData } from '../data';

describe('bioLinks data in data.ts', () => {
  it('has a valid profile configuration with essential brand info', () => {
    expect(profileConfig.name).toBe('KonohaTech');
    expect(profileConfig.handle).toBe('@konoha.tech');
    expect(profileConfig.whatsappNumber).toBe('558187772234');
    expect(profileConfig.urgencyBanner.enabled).toBe(true);
    expect(profileConfig.avatarSrc).toBeTruthy();
  });

  it('contains correctly formatted bio links with unique IDs', () => {
    expect(bioLinksData.length).toBeGreaterThan(0);
    const ids = bioLinksData.map((link) => link.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has a highlighted primary link for whatsapp', () => {
    const primaryLink = bioLinksData.find((link) => link.highlight);
    expect(primaryLink).toBeDefined();
    expect(primaryLink?.type).toBe('whatsapp');
    expect(primaryLink?.whatsappMessage).toBeTruthy();
  });

  it('has portfolio-cases configured as modal type', () => {
    const portfolioLink = bioLinksData.find((link) => link.id === 'portfolio-cases');
    expect(portfolioLink).toBeDefined();
    expect(portfolioLink?.type).toBe('modal');
  });
});

describe('routeUtils', () => {
  beforeEach(() => {
    window.history.pushState(null, '', '/');
  });

  it('detects landing route when on root URL', () => {
    window.history.pushState(null, '', '/');
    expect(isBioLinksRoute()).toBe(false);
  });

  it('detects biolinks route when ?page=links is in query string', () => {
    window.history.pushState(null, '', '/?page=links');
    expect(isBioLinksRoute()).toBe(true);
  });

  it('detects biolinks route when pathname ends with /links', () => {
    window.history.pushState(null, '', '/links');
    expect(isBioLinksRoute()).toBe(true);
  });

  it('navigateToBioLinks updates URL to ?page=links', () => {
    navigateToBioLinks();
    expect(window.location.search).toContain('page=links');
  });

  it('navigateToLanding resets URL to base path', () => {
    window.history.pushState(null, '', '/?page=links');
    navigateToLanding();
    expect(window.location.search).not.toContain('page=links');
  });
});

describe('PortfolioModal Component', () => {
  it('does not render when isOpen is false', async () => {
    const { default: PortfolioModal } = await import('../components/PortfolioModal');
    render(<PortfolioModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Nossos Clientes')).not.toBeInTheDocument();
  });

  it('renders project details and Analisar Agora button when isOpen is true', async () => {
    const { default: PortfolioModal } = await import('../components/PortfolioModal');
    render(<PortfolioModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Nossos Clientes')).toBeInTheDocument();
    expect(screen.getByText('Psicologo Heron Silveira')).toBeInTheDocument();
    expect(screen.getByText('Analisar Agora')).toBeInTheDocument();
  });
});
