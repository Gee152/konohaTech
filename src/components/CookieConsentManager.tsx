import React, { useState, useEffect, useCallback } from 'react';
import CookieBanner from './CookieBanner';
import CookiePreferencesModal from './CookiePreferencesModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import {
  getStoredConsent,
  saveConsent,
  EVENT_OPEN_COOKIE_PREFERENCES,
  EVENT_OPEN_PRIVACY_POLICY,
} from '../utils/cookieConsent';
import { CookieConsentPreferences } from '../types';

export default function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsentPreferences | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    setConsent(existing);

    // Se o usuário ainda não tiver consentido, exibe o banner com um leve atraso
    // para não disputar recursos com a renderização inicial do Hero
    if (!existing) {
      const timer = setTimeout(() => {
        setIsBannerVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listeners para abertura sob demanda (por exemplo, via rodapé ou links no texto)
  useEffect(() => {
    const handleOpenPreferences = () => setIsPreferencesOpen(true);
    const handleOpenPrivacy = () => setIsPrivacyPolicyOpen(true);

    window.addEventListener(EVENT_OPEN_COOKIE_PREFERENCES, handleOpenPreferences);
    window.addEventListener(EVENT_OPEN_PRIVACY_POLICY, handleOpenPrivacy);

    return () => {
      window.removeEventListener(EVENT_OPEN_COOKIE_PREFERENCES, handleOpenPreferences);
      window.removeEventListener(EVENT_OPEN_PRIVACY_POLICY, handleOpenPrivacy);
    };
  }, []);

  const handleAcceptAll = useCallback(() => {
    const updated = saveConsent({ analytics: true, marketing: true }, 'all');
    setConsent(updated);
    setIsBannerVisible(false);
  }, []);

  const handleAcceptEssential = useCallback(() => {
    const updated = saveConsent({ analytics: false, marketing: false }, 'essential');
    setConsent(updated);
    setIsBannerVisible(false);
  }, []);

  const handleSaveCustom = useCallback(
    (
      prefs: Partial<Pick<CookieConsentPreferences, 'analytics' | 'marketing'>>,
      status: 'all' | 'essential' | 'custom'
    ) => {
      const updated = saveConsent(prefs, status);
      setConsent(updated);
      setIsBannerVisible(false);
      setIsPreferencesOpen(false);
    },
    []
  );

  return (
    <>
      <CookieBanner
        isVisible={isBannerVisible}
        onAcceptAll={handleAcceptAll}
        onAcceptEssential={handleAcceptEssential}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
      />

      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onSave={handleSaveCustom}
        currentPreferences={consent}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </>
  );
}
