import { CookieConsentPreferences } from '../types';

export const COOKIE_CONSENT_KEY = 'konohatech_cookie_consent_v1';

export const DEFAULT_PREFERENCES: CookieConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  acceptedAt: '',
  status: 'essential',
};

/**
 * Retorna as preferências de cookies salvas no localStorage ou null se não houver consentimento prévio.
 */
export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.essential === 'boolean') {
      return {
        ...DEFAULT_PREFERENCES,
        ...parsed,
        essential: true, // Sempre obrigatório por segurança e integridade
      };
    }
  } catch {
    // Falha silenciosa de JSON parse ou restrição de cookies de terceiros
  }
  return null;
}

/**
 * Salva as preferências de consentimento no localStorage.
 */
export function saveConsent(
  prefs: Partial<Pick<CookieConsentPreferences, 'analytics' | 'marketing'>>,
  status: 'all' | 'essential' | 'custom'
): CookieConsentPreferences {
  const finalPrefs: CookieConsentPreferences = {
    essential: true,
    analytics: status === 'all' ? true : status === 'essential' ? false : Boolean(prefs.analytics),
    marketing: status === 'all' ? true : status === 'essential' ? false : Boolean(prefs.marketing),
    acceptedAt: new Date().toISOString(),
    status,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalPrefs));
    } catch {
      // Ignora possíveis erros de quota
    }
  }

  return finalPrefs;
}

/**
 * Verifica se o usuário já realizou qualquer ação de consentimento.
 */
export function hasUserConsented(): boolean {
  return getStoredConsent() !== null;
}

/**
 * Remove o consentimento armazenado (útil para testes e redefinições).
 */
export function clearConsent(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    } catch {
      // noop
    }
  }
}

export const EVENT_OPEN_COOKIE_PREFERENCES = 'konohatech:open-cookie-preferences';
export const EVENT_OPEN_PRIVACY_POLICY = 'konohatech:open-privacy-policy';

export function openCookiePreferencesModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_OPEN_COOKIE_PREFERENCES));
  }
}

export function openPrivacyPolicyModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_OPEN_PRIVACY_POLICY));
  }
}
