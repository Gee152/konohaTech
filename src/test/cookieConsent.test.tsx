import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  getStoredConsent,
  saveConsent,
  hasUserConsented,
  clearConsent,
  COOKIE_CONSENT_KEY,
} from '../utils/cookieConsent';
import CookieBanner from '../components/CookieBanner';
import CookiePreferencesModal from '../components/CookiePreferencesModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

describe('cookieConsent utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no consent has been given', () => {
    expect(getStoredConsent()).toBeNull();
    expect(hasUserConsented()).toBe(false);
  });

  it('saves consent with status "all"', () => {
    const consent = saveConsent({}, 'all');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.marketing).toBe(true);
    expect(consent.status).toBe('all');
    expect(hasUserConsented()).toBe(true);

    const stored = getStoredConsent();
    expect(stored?.status).toBe('all');
    expect(stored?.essential).toBe(true);
  });

  it('saves consent with status "essential"', () => {
    const consent = saveConsent({}, 'essential');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(false);
    expect(consent.marketing).toBe(false);
    expect(consent.status).toBe('essential');

    const stored = getStoredConsent();
    expect(stored?.status).toBe('essential');
    expect(stored?.analytics).toBe(false);
  });

  it('saves custom preferences properly', () => {
    const consent = saveConsent({ analytics: true, marketing: false }, 'custom');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.marketing).toBe(false);
    expect(consent.status).toBe('custom');
  });

  it('clears stored consent', () => {
    saveConsent({}, 'all');
    expect(hasUserConsented()).toBe(true);
    clearConsent();
    expect(hasUserConsented()).toBe(false);
    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBeNull();
  });
});

describe('CookieBanner Component', () => {
  it('renders nothing when isVisible is false', () => {
    render(
      <CookieBanner
        isVisible={false}
        onAcceptAll={vi.fn()}
        onAcceptEssential={vi.fn()}
        onOpenPreferences={vi.fn()}
        onOpenPrivacyPolicy={vi.fn()}
      />
    );

    expect(screen.queryByText(/Privacidade e Cookies/i)).toBeNull();
  });

  it('renders banner with actions when isVisible is true', () => {
    const handleAcceptAll = vi.fn();
    const handleAcceptEssential = vi.fn();
    const handleOpenPrefs = vi.fn();
    const handleOpenPrivacy = vi.fn();

    render(
      <CookieBanner
        isVisible={true}
        onAcceptAll={handleAcceptAll}
        onAcceptEssential={handleAcceptEssential}
        onOpenPreferences={handleOpenPrefs}
        onOpenPrivacyPolicy={handleOpenPrivacy}
      />
    );

    expect(screen.getByRole('region', { name: /Aviso de Privacidade e Cookies LGPD/i })).toBeInTheDocument();
    expect(screen.getByText(/Lei Federal nº 13.709\/2018/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Aceitar Todos/i }));
    expect(handleAcceptAll).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Apenas Essenciais/i }));
    expect(handleAcceptEssential).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Personalizar preferências/i }));
    expect(handleOpenPrefs).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Ler Política LGPD/i }));
    expect(handleOpenPrivacy).toHaveBeenCalledTimes(1);
  });
});

describe('CookiePreferencesModal Component', () => {
  it('renders modal with granular categories when open', () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <CookiePreferencesModal
        isOpen={true}
        onClose={handleClose}
        onSave={handleSave}
      />
    );

    expect(screen.getByRole('dialog', { name: /Preferências de Cookies/i })).toBeInTheDocument();
    expect(screen.getByText(/Cookies Estritamente Necessários/i)).toBeInTheDocument();
    expect(screen.getByText(/Sempre Ativos/i)).toBeInTheDocument();

    // Rejeitar opcionais
    fireEvent.click(screen.getByRole('button', { name: /Rejeitar Opcionais/i }));
    expect(handleSave).toHaveBeenCalledWith({ analytics: false, marketing: false }, 'essential');
    expect(handleClose).toHaveBeenCalled();
  });

  it('allows accepting all from within preferences modal', () => {
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <CookiePreferencesModal
        isOpen={true}
        onClose={handleClose}
        onSave={handleSave}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Aceitar Todos/i }));
    expect(handleSave).toHaveBeenCalledWith({ analytics: true, marketing: true }, 'all');
    expect(handleClose).toHaveBeenCalled();
  });
});

describe('PrivacyPolicyModal Component', () => {
  it('renders complete LGPD legal information when open', () => {
    const handleClose = vi.fn();

    render(
      <PrivacyPolicyModal
        isOpen={true}
        onClose={handleClose}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade e LGPD/i)).toBeInTheDocument();
    expect(screen.getByText(/45.109.825\/0001-92/i)).toBeInTheDocument();
    expect(screen.getByText(/Seus Direitos \(Art. 18 da LGPD\)/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Entendido/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
